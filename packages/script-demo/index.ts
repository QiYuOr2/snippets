import { ArrayUtils } from '@lib/shared/array';
import { pipe } from '@lib/shared/pipe';

const asyncDouble = (value: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(value * 2);
    });
  });

const compute = pipe(
  Math.abs,
  asyncDouble
);

(async () => {
  console.log(await compute(-1));

  console.log(ArrayUtils([2, 'a', { c: 1 }]).random());
})();
