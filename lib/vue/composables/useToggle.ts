import { isUndef } from "~shared/typeof";
import { Ref, ref } from "vue";

/**
 * boolean switcher
 * @param initialValue 初始值
 * @param changeCallback 监听回调
 */
export default function useToggle(initialValue: boolean, changeCallback?: (newValue: boolean) => void) {
  const state = ref(initialValue);

  /**
   * @param value 为空时会根据上一次状态值自动切换
   */
  const toggle = (value?: boolean) => {
    state.value = isUndef(value) ? !state.value : value;
    !isUndef(changeCallback) && changeCallback?.(state.value);
  };

  return [state, toggle] as [Ref<boolean>, typeof toggle];
}
