# Project Changelog

This document tracks all significant modifications and feature additions made during development to ensure traceability and align the codebase with the project report.

## [2026-05-15] - Security & Privacy Enhancements
- **Added:** `PiiStrippingLogger` implemented in NestJS to automatically mask emails, phone numbers, and National IDs (NIC) in stdout/logs to satisfy non-functional privacy requirements.
- **Added:** `AiQuotaMiddleware` implemented to enforce fixed-window rate limiting on AI endpoints (`/api/v1/ai/*`) based on user UID and configurable via `AI_RATE_LIMIT_PER_MIN`.
- **Modified:** Registered `PiiStrippingLogger` in `main.ts` and `AiQuotaMiddleware` in `app.module.ts`.
