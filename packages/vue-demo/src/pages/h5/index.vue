<script setup lang="ts">
import BottomSheet from "@lib/vue/components/bottom-sheet.vue";
import useToggle from "@lib/vue/composables/useToggle";

const [visible, toggle] = useToggle(false);
</script>

<template>
  <div>
    <div @click="toggle()">bottom sheet</div>
  </div>
  <BottomSheet v-model:visible="visible" show-active-bar>123</BottomSheet>
</template>
