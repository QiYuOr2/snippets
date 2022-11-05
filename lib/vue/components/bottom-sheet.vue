<script lang="ts" setup>
import { computed } from "vue";

import bemCreator from "~shared/bem";
import useTouchMove from "~vue/composables/useTouchMove";

const bem = bemCreator("bottom-sheet");

const props = withDefaults(
  defineProps<{
    visible: boolean;
    disableOverlayClick?: boolean;
  }>(),
  {
    disableOverlayClick: false,
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

const overlayClickHandler = () => {
  if (props.disableOverlayClick) {
    return;
  }
  selfVisible.value = false;
};

const { distanceY, touchStart, touchMove, touchEnd } = useTouchMove();
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="selfVisible" class="overlay" @click="overlayClickHandler"></div>
    </Transition>
    <div :class="bem('', { active: selfVisible })" :style="selfVisible ? { bottom: `-${distanceY}px` } : {}">
      <div :class="bem('header')" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
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

  --height-bottom-sheet: 500px;

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
  bottom: calc(-1 * var(--height-bottom-sheet));
  left: 0;
  right: 0;
  z-index: var(--zindex-bottom-sheet);

  height: var(--height-bottom-sheet);
  background: #fff;

  transition: bottom 0.3s;

  &--active {
    bottom: 0;
    transition: bottom 0.3s;
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
