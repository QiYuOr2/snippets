/**
 * Array工具库
 * @param value 源数组
 */
export function ArrayUtils<T>(value: Array<T>) {
  const random = () => {
    const source = value.slice(0);
    return source[Math.floor(Math.random() * source.length)];
  };

  return { random };
}

ArrayUtils([1, 2, 3, 4]).random();
