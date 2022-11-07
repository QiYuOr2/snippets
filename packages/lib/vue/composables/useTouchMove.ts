import { computed, ref, watchEffect } from "vue";

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

  // touchMove移动距离
  const distanceX = computed(() => x.value - oldX.value);
  const distanceY = computed(() => y.value - oldY.value);

  watchEffect(() => {
    console.log(oldY.value, y.value, distanceY.value);
  });

  const startTime = ref(0);
  const endTime = ref(0);
  const deltaTime = computed(() => {
    if (endTime.value === 0 || startTime.value === 0) {
      return 0;
    }
    return endTime.value - startTime.value;
  });

  const handler = (
    eventHandler: (event: TouchEvent) => void,
    hooks?: TouchHandlerHooks
  ) => {
    return (event: TouchEvent) => {
      hooks?.beforeTriggerEventHandler?.(event);

      options?.preventDefault && event.preventDefault();
      eventHandler(event);

      hooks?.afterTriggerEventHandler?.(event);
    };
  };

  const touchStart = handler(
    (event: TouchEvent) => {
      // 清空x, y
      oldX.value = 0;
      oldY.value = 0;
      x.value = 0;
      y.value = 0;

      options?.onTouchStart?.(event);
    },
    {
      afterTriggerEventHandler(event) {
        // 记录点下的时间
        startTime.value = Date.now();
        endTime.value = 0;

        // 记录首次点击位置
        const touchPoint = event.touches[0];
        x.value = touchPoint?.pageX ?? 0;
        y.value = touchPoint?.pageY ?? 0;

        // 缓存首次点击位置
        oldX.value = x.value;
        oldY.value = y.value;
      },
    }
  );
  const touchMove = handler(
    (event: TouchEvent) => {
      options?.onTouchMove?.(event);
    },
    {
      afterTriggerEventHandler(event) {
        // 记录每次滑动的位置
        const touchPoint = event.touches[0];
        x.value = touchPoint?.pageX ?? 0;
        y.value = touchPoint?.pageY ?? 0;
      },
    }
  );
  const touchEnd = handler(
    (event: TouchEvent) => {
      options?.onTouchEnd?.(event);
    },
    {
      beforeTriggerEventHandler() {
        // 结束时间
        endTime.value = Date.now();
      },
    }
  );

  return {
    oldX,
    oldY,
    x,
    y,
    distanceX,
    distanceY,

    startTime,
    endTime,
    deltaTime,

    touchStart,
    touchMove,
    touchEnd,
  };
}
