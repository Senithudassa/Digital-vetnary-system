import { Injectable, NestMiddleware, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AiQuotaMiddleware implements NestMiddleware {
  // In-memory dictionary keyed by user UID as requested in the report
  private readonly usageMap = new Map<string, { count: number; windowStart: number }>();
  private readonly windowMs = 60000; // 1 minute fixed-window

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing token');
    }

    const token = authHeader.split(' ')[1];
    let decoded: any;
    
    try {
      // Decode the JWT payload (the second part of the token)
      const payloadBase64Url = token.split('.')[1];
      if (!payloadBase64Url) {
        throw new Error('Invalid JWT format');
      }
      
      const payloadBase64 = payloadBase64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(payloadBase64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      decoded = JSON.parse(jsonPayload);
    } catch (err) {
      throw new UnauthorizedException('Invalid token payload');
    }

    if (!decoded || (!decoded.sub && !decoded.id)) {
      throw new UnauthorizedException('Missing UID in token');
    }

    const uid = decoded.sub || decoded.id;
    // Default to 5 requests per minute if env variable is not set
    const limit = parseInt(process.env.AI_RATE_LIMIT_PER_MIN || '5', 10);
    const now = Date.now();

    const userQuota = this.usageMap.get(uid);

    if (!userQuota || now - userQuota.windowStart > this.windowMs) {
      // Start a new window
      this.usageMap.set(uid, { count: 1, windowStart: now });
    } else {
      // Existing window
      if (userQuota.count >= limit) {
        throw new HttpException('AI Quota Exceeded. Please wait and try again.', HttpStatus.TOO_MANY_REQUESTS);
      }
      userQuota.count++;
      this.usageMap.set(uid, userQuota);
    }

    next();
  }
}
