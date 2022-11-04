/**
 * BEM规范类名生成
 * @param {string} block
 * @example
 * ```
 * const cardClass = bemCreator("card");
 * cardClass(null, { round: true }); // card card--round
 * cardClass("img", { round: true }); // card__img card__img--round
 * cardClass("img", { round: true, large: true }); // card__img card__img--round card__img--large
 * ```
 */
export default function bemCreator(block: string) {
  return (element?: string, modifier?: Record<string, boolean>) => {
    const namespace = element ? `${block}__${element}` : block;
    const states = Object.keys(modifier || {}).reduce<string[]>((classNames, currentKey) => {
      const currentState = !!modifier?.[currentKey] ? `${namespace}--${currentKey}` : "";
      return currentState ? [...classNames, currentState] : classNames;
    }, []);
    return [namespace, ...states].join(" ");
  };
}
