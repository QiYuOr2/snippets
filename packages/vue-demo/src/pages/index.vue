<script setup lang="ts">
const counts = reactive({
  h5: Object.keys(import.meta.glob("./h5/*.md")).length,
  pc: Object.keys(import.meta.glob("./pc/*.md")).length,
  composables: Object.keys(import.meta.glob("./composables/*.md")).length,
  shared: Object.keys(import.meta.glob("./shared/*.md")).length,
});
</script>

<template>
  <h1 class="text-2xl pb-4 font-bold">代码片段效果展示</h1>
  <p class="flex pb-4">
    <span>仓库：</span>
    <a
      class="text-green-600"
      href="//github.com/QiYuOr2/snippets"
      target="_blank"
    >
      https://github.com/QiYuOr2/snippets
    </a>
  </p>
  <div class="text-left">
    <p class="pb-4">点击查看不同类型的代码片段</p>
    <div class="flex gap-4 flex-wrap">
      <RouterLink class="button" to="/h5">H5组件 ({{ counts.h5 }})</RouterLink>
      <RouterLink class="button" to="/pc">PC组件 ({{ counts.pc }})</RouterLink>
      <RouterLink class="button" to="/composables">
        Composable函数 ({{ counts.composables }})
      </RouterLink>
      <RouterLink class="button" to="/shared">通用函数 ({{ counts.shared }})</RouterLink>
      <RouterLink class="button flex items-center gap-2" to="/node">
        <span>Node端函数</span>
        <span class="tag">TODO</span>
      </RouterLink>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
