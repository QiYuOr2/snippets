<script lang="ts" setup>
import { computed, ref } from 'vue';

import bemCreator from '~shared/bem';
import useToggle from '~vue/composables/useToggle';
import useTouchMove from '~vue/composables/useTouchMove';

const bem = bemCreator('bottom-sheet');

const props = withDefaults(
  defineProps<{
    visible: boolean;
    height?: number;
    disableOverlayClick?: boolean;
  }>(),
  {
    disableOverlayClick: false,
    height: 500,
  }
);

const emits = defineEmits<{
  (event: 'update:visible', value: boolean): void;
}>();

const selfVisible = computed({
  get() {
    return props.visible;
  },
  set(val) {
    emits('update:visible', val);
  },
});

const overlayClickHandler = () => {
  if (props.disableOverlayClick) {
    return;
  }
  selfVisible.value = false;
};

const [isTouching, toggleIsTouching] = useToggle(false);
const willToPosition = ref('');
const { distanceY, touchStart, touchMove, touchEnd } = useTouchMove({
  onTouchStart() {
    toggleIsTouching(true);
    willToPosition.value = '';
  },
  onTouchEnd() {
    toggleIsTouching(false);
    willToPosition.value = '0px';
    if (distanceY.value > props.height / 2) {
      selfVisible.value = false;
    }
  },
});
const animeStyle = computed(() => {
  const commonStyle = {
    height: `${props.height}px`,
  };
  return selfVisible.value
    ? {
        ...commonStyle,
        bottom: willToPosition.value === '' ? `-${distanceY.value}px` : willToPosition.value,
      }
    : {
        ...commonStyle,
        bottom: `-${props.height}px`,
      };
});
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="selfVisible" class="overlay" @click="overlayClickHandler"></div>
    </Transition>
    <div :class="bem('', { active: selfVisible, touching: isTouching })" :style="animeStyle">
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
