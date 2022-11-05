import { computed, ref, watchEffect } from "vue-demi";

interface UseTouchMoveOptions {
  onTouchStart?: (event: TouchEvent) => void;
  onTouchMove?: (event: TouchEvent) => void;
  onTouchEnd?: (event: TouchEvent) => void;
  preventDefault?: boolean;
}

interface TouchHandlerHooks {
  beforeTriggerEventHandler?: (event: TouchEvent) => void;
  afterTriggerEventHandler?: (event: TouchEvent) => void;
}

export default function useTouchMove(options?: UseTouchMoveOptions) {
  const oldX = ref(0);
  const oldY = ref(0);
  const x = ref(0);
  const y = ref(0);

  watchEffect(() => {
    console.log(oldX.value, oldY.value, x.value, y.value);
  });

  // touchMove移动距离
  const distanceX = computed(() => x.value - oldX.value);
  const distanceY = computed(() => y.value - oldY.value);

  const handler = (eventHandler: (event: TouchEvent) => void, hooks?: TouchHandlerHooks) => {
    return (event: TouchEvent) => {
      hooks?.beforeTriggerEventHandler?.(event);
      options?.preventDefault && event.preventDefault();

      eventHandler(event);
      const touchPoint = event.touches[0];
      x.value = touchPoint?.pageX ?? 0;
      y.value = touchPoint?.pageY ?? 0;
      hooks?.afterTriggerEventHandler?.(event);
    };
  };

  const touchStart = handler(
    (event: TouchEvent) => {
      console.log("touchStart", distanceY.value);

      // 清空x, y
      oldX.value = 0;
      oldY.value = 0;
      x.value = 0;
      y.value = 0;

      options?.onTouchStart?.(event);
    },
    {
      afterTriggerEventHandler() {
        // 缓存首次点击位置
        oldX.value = x.value;
        oldY.value = y.value;
      },
    }
  );
  const touchMove = handler((event: TouchEvent) => {
    // console.log("touchMove", event);
    options?.onTouchMove?.(event);
  });
  const touchEnd = handler((event: TouchEvent) => {
    console.log("touchEnd", distanceY.value);
    options?.onTouchEnd?.(event);
  });

  return {
    x,
    y,
    distanceX,
    distanceY,
    oldX,
    oldY,

    touchStart,
    touchMove,
    touchEnd,
  };
}
