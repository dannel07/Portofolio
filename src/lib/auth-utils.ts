/**
 * Utility for @paralleldrive/cuid2
 * Since Cloudflare doesn't support it by default, we'll use a simpler ID generator
 */

export function createId(): string {
  // Simple CUID-like ID generator compatible with Cloudflare Workers
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 15);
  const randomStr2 = Math.random().toString(36).substring(2, 15);
  return `c${timestamp}${randomStr}${randomStr2}`;
}
