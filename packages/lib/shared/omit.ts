export function omit<T, K extends keyof T>(target: T, ...keys: K[]) {
  function action(obj: Omit<T, K>, key: K): Omit<T, K> {
    // eslint-disable-next-line no-unused-vars
    const { [key]: _, ...rest } = obj;

    if (keys.length === 0) {
      return rest as T;
    }

    return action(rest as T, keys.pop()!);
  };
  return action(target, keys.pop()!);
};
