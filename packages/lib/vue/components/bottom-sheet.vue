<script lang="ts" setup>
import { computed, ref } from "vue";

import bemCreator from "@lib/shared/bem";
import useToggle from "@lib/vue/composables/useToggle";
import useTouchMove from "@lib/vue/composables/useTouchMove";

/**
 * 关闭时展示active bar的高度
 */
const ActiveBarHeight = 26;
const bem = bemCreator("bottom-sheet");

const props = withDefaults(
  defineProps<{
    visible: boolean;
    height?: number;
    disableOverlayClick?: boolean;
    showActiveBar?: boolean;
  }>(),
  {
    disableOverlayClick: false,
    height: 500,
    showActiveBar: false,
  }
);

const emits = defineEmits<{
  (event: "update:visible", value: boolean): void;
}>();

const selfVisible = computed({
  get() {
    return props.visible;
  },
  set(val) {
    emits("update:visible", val);
  },
});
const toggleSelfVisible = (value?: boolean) => {
  selfVisible.value = value === undefined ? !selfVisible.value : value;
};

const overlayClickHandler = () => {
  if (props.disableOverlayClick) {
    return;
  }
  toggleSelfVisible(false);
};

/**
 * 基准速度
 */
const BasicV = 0.5;
const [isTouching, toggleIsTouching] = useToggle(false);
const willToPosition = ref("");
const { distanceY, deltaTime, touchStart, touchMove, touchEnd } = useTouchMove({
  preventDefault: true,
  onTouchStart() {
    toggleIsTouching(true);
    willToPosition.value = "";
  },
  onTouchEnd() {
    toggleIsTouching(false);

    const v = Math.abs(distanceY.value) / deltaTime.value;

    if (
      distanceY.value > props.height / 2 ||
      (selfVisible.value && distanceY.value > 0 && v > BasicV)
    ) {
      // 向下滑动 => 距离超过高度一般 or 方向正确 速度大于基准值
      toggleSelfVisible(false);
    } else if (distanceY.value < 0 && !selfVisible.value) {
      // 向上滑动，仅关闭时触发
      toggleSelfVisible();
      willToPosition.value = "0px";
    }
  },
});

/**
 * 触发模式动画计算
 */
const triggerAnimeStyle = computed(() => {
  const commonStyle = {
    height: `${props.height}px`,
  };

  const computeBottom = () => {
    if (selfVisible.value) {
      return isTouching.value
        ? `${-1 * distanceY.value}px`
        : willToPosition.value;
    } else {
      return isTouching.value && Math.abs(distanceY.value) > ActiveBarHeight
        ? `${-1 * distanceY.value - props.height}px`
        : `${
            -1 * (props.height - (props.showActiveBar ? ActiveBarHeight : 0))
          }px`;
    }
  };

  return {
    ...commonStyle,
    bottom: computeBottom(),
  };
});
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="selfVisible"
        class="overlay"
        @click="overlayClickHandler"
        @touchstart.stop="$event.preventDefault()"
      ></div>
    </Transition>
    <div
      :class="bem('', { active: selfVisible, touching: isTouching })"
      :style="triggerAnimeStyle"
    >
      <div
        :class="bem('header')"
        @touchstart.stop="touchStart"
        @touchmove.stop="touchMove"
        @touchend.stop="touchEnd"
        @mousedown.stop="touchStart"
        @mousemove.stop="touchMove"
        @mouseup.stop="touchEnd"
        @click.stop="toggleSelfVisible()"
      >
        <div class="active-bar"></div>
      </div>
      <div :class="bem('content')">
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<style lang="less">
:root {
  --zindex-overlay: 2000;
  --zindex-bottom-sheet: 2001;

  --color-active-bar: #e2e2e2;
}
</style>

<style lang="less" scoped>
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: var(--zindex-overlay);
}

.bottom-sheet {
  position: fixed;
  left: 0;
  right: 0;
  z-index: var(--zindex-bottom-sheet);

  background: #fff;

  transition: bottom 0.3s;

  &--active {
    bottom: 0;
    transition: bottom 0.3s;
  }

  &--touching {
    transition: bottom 0s;
  }

  &__header {
    padding: 10px;
    border-radius: 100px 100px 0 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.06);
    text-align: center;
    z-index: 1998;
    .active-bar {
      width: 120px;
      height: 6px;
      margin: 0 auto;
      border-radius: 100px;
      background: var(--color-active-bar);
    }
  }

  &__content {
    z-index: 1999;
    background: #fff;
  }
}
</style>
