export const DECIMAL_MULTIPLIER = 10000;

export function pad(n) {
  return n * DECIMAL_MULTIPLIER;
}

export function unpad(n) {
  return Math.floor(n / DECIMAL_MULTIPLIER);
}
