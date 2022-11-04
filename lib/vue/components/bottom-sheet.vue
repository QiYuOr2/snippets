<script lang="ts" setup>
import { computed } from "@vue/reactivity";

import bemCreator from "~shared/bem";

const bem = bemCreator("bottom-sheet");

const props = defineProps<{
  visible: boolean;
}>();

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
</script>

<template>
  <Teleport to="body">
    <Transition name="slide">
      <div v-if="selfVisible" :class="bem()">
        <div :class="bem('header')"></div>
        <div :class="bem('content')">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="less" scoped>
.slide-enter-active,
.slide-leave-active {
}

.slide-enter-form,
.slide-leave-to {
}
</style>
