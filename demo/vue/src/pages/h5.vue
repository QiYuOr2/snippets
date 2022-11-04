<script lang="ts" setup>
import BottomSheet from "~vue/components/bottom-sheet.vue";
import useToggle from "~vue/composables/useToggle";

const [bottomSheetVisible, toggleBottomSheetVisible] = useToggle(false);
</script>

<template>
  <div>H5相关Demo</div>
  <BottomSheet v-model:visible="bottomSheetVisible"></BottomSheet>
</template>
