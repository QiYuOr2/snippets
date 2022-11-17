import { isPromise } from 'util/types';

/**
 * 管道操作
 * @example
 *
 *    const asyncDouble = (value) => new Promise((resolve) => {
 *      setTimeout(() => {
 *        resolve(value * 2)
 *      })
 *    });
 *
 *    const compute = pipe(
 *      Math.abs,
 *      asyncDouble
 *    )
 *
 *    await compute(-1) // 2
 *
 */
export function pipe<V, T>(...fns: Array<(arg: any) => any>) {
  return (value: V) => fns.reduce(
    async (acc, fn) => isPromise(acc) ? fn(await acc) : fn(acc),
    value as Promise<V>
  ) as unknown as T;
}

/**
 * 同步管道操作
 * @example
 *
 *    const double = (value) => value * 2
 *
 *    const compute = pipe(
 *      Math.abs,
 *      double
 *    )
 *
 *    compute(-1) // 2
 *
 */
export function pipeSync<V, T>(...fns: Array<(arg: any) => any>) {
  return (value: V) => fns.reduce(
    (acc, fn) => fn(acc),
    value
  ) as unknown as T;
}
