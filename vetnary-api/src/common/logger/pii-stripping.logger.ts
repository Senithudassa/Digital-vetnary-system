import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class PiiStrippingLogger extends ConsoleLogger {
  private stripPii(message: any): any {
    if (typeof message !== 'string') {
      try {
        message = JSON.stringify(message);
      } catch {
        return message;
      }
    }

    // Mask emails
    let stripped = message.replace(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
      '[REDACTED_EMAIL]',
    );

    // Mask phone numbers (basic regex for common formats)
    stripped = stripped.replace(
      /(\+\d{1,3}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/g,
      '[REDACTED_PHONE]',
    );
    
    // Mask National IDs (NIC in Sri Lanka is usually 9 digits + V/X or 12 digits)
    stripped = stripped.replace(
      /\b\d{9}[VXvx]\b|\b\d{12}\b/g,
      '[REDACTED_NIC]'
    );

    return stripped;
  }

  log(message: any, context?: string) {
    super.log(this.stripPii(message), context);
  }

  error(message: any, stack?: string, context?: string) {
    super.error(this.stripPii(message), this.stripPii(stack), context);
  }

  warn(message: any, context?: string) {
    super.warn(this.stripPii(message), context);
  }

  debug(message: any, context?: string) {
    super.debug(this.stripPii(message), context);
  }

  verbose(message: any, context?: string) {
    super.verbose(this.stripPii(message), context);
  }
}
