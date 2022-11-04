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
  return typeof value === "string";
}
