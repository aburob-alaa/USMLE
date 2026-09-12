import crypto from 'crypto';

export function generateToken() {
  return crypto.randomBytes(24).toString('base64url');
}

export function validateToken(token) {
  if (!token || typeof token !== 'string') return false;
  if (token.length < 30 || token.length > 40) return false;
  return /^[A-Za-z0-9_-]+$/.test(token);
}
