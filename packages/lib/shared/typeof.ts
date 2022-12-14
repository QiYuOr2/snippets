export function typeIs<T>(value: unknown): T {
  return value as T;
}

/**
 * 判断是否为 undefined 或 null
 */
export function isUndef(value: unknown): value is undefined | null {
  return value === undefined || value === null;
}

/**
 * 判断是否为 string
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export function isNumberArray(value: unknown[]): value is number[] {
  return value.every(item => typeof item === 'number');
}
