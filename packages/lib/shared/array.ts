import { isNumberArray } from './typeof';

/**
 * Array工具库
 * @param value 源数组
 */
export function ArrayUtils<T>(value: Array<T>) {
  const random = () => {
    const source = value.slice(0);
    return source[Math.floor(Math.random() * source.length)];
  };

  const average = () => {
    const source = value.slice(0);
    if (!isNumberArray(source)) {
      throw new TypeError('请传入数字数组');
    }
    return (source as number[]).reduce((a, b) => a + b) / source.length;
  };

  return { random, average };
}
