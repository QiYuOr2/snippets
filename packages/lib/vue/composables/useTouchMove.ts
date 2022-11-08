import { computed, ref, watchEffect } from "vue";

type TouchEventHandler = (event: TouchEvent) => void;
type MouseEventHandler = (event: MouseEvent) => void;
type EventHandler = TouchEventHandler & MouseEventHandler;

interface UseTouchMoveOptions {
  onTouchStart?: EventHandler;
  onTouchMove?: EventHandler;
  onTouchEnd?: EventHandler;
  preventDefault?: boolean;
  supportMouseClick?: boolean;
}

interface TouchHandlerHooks {
  beforeTriggerEventHandler?: (event: TouchEvent | MouseEvent) => void;
  afterTriggerEventHandler?: (event: TouchEvent | MouseEvent) => void;
}

export function isTouchEvent(
  event: TouchEvent | MouseEvent
): event is TouchEvent {
  return (<TouchEvent>event).touches !== undefined;
}

export default function useTouchMove(options?: UseTouchMoveOptions) {
  const getPoint = (event: TouchEvent | MouseEvent) => {
    if (options?.supportMouseClick === false) {
      return (<TouchEvent>event).touches[0];
    }
    return isTouchEvent(event) ? event.touches[0] : event;
  };

  const isStartClick = ref(false);

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

  const handler = (eventHandler: EventHandler, hooks?: TouchHandlerHooks) => {
    return (event: TouchEvent | MouseEvent) => {
      hooks?.beforeTriggerEventHandler?.(event);

      options?.preventDefault && event.preventDefault();

      isTouchEvent(event) ? eventHandler(event) : eventHandler(event);

      hooks?.afterTriggerEventHandler?.(event);
    };
  };

  const touchStart = handler(
    (event: TouchEvent | MouseEvent) => {
      // 清空x, y
      oldX.value = 0;
      oldY.value = 0;
      x.value = 0;
      y.value = 0;

      isTouchEvent(event)
        ? options?.onTouchStart?.(event)
        : options?.onTouchStart?.(event);
    },
    {
      beforeTriggerEventHandler(event) {
        if (!isTouchEvent(event)) {
          isStartClick.value = true;
        }
      },
      afterTriggerEventHandler(event) {
        const point = getPoint(event);

        // 记录点下的时间
        startTime.value = Date.now();
        endTime.value = 0;

        // 记录首次点击位置
        x.value = point?.pageX ?? 0;
        y.value = point?.pageY ?? 0;

        // 缓存首次点击位置
        oldX.value = x.value;
        oldY.value = y.value;
      },
    }
  );
  const touchMove = handler(
    (event: TouchEvent | MouseEvent) => {
      isTouchEvent(event)
        ? options?.onTouchMove?.(event)
        : options?.onTouchMove?.(event);
    },
    {
      afterTriggerEventHandler(event) {
        if (!isTouchEvent(event) && !isStartClick.value) {
          return;
        }
        const point = getPoint(event);

        // 记录每次滑动的位置
        x.value = point?.pageX ?? 0;
        y.value = point?.pageY ?? 0;
      },
    }
  );
  const touchEnd = handler(
    (event: TouchEvent | MouseEvent) => {
      isTouchEvent(event)
        ? options?.onTouchEnd?.(event)
        : options?.onTouchEnd?.(event);
    },
    {
      beforeTriggerEventHandler() {
        isStartClick.value = false;
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
