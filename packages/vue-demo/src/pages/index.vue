<script setup lang="ts">
const user = useUserStore();
const name = $ref(user.savedName);

const router = useRouter();
const go = () => {
  if (name) router.push(`/hi/${encodeURIComponent(name)}`);
};
</script>

<template>
  <h1 class="text-2xl pb-4 font-bold">代码片段效果展示</h1>
  <p class="flex pb-4">
    <span>仓库：</span>
    <a class="text-green-600" href="//github.com/QiYuOr2/snippets" target="_blank">
      https://github.com/QiYuOr2/snippets
    </a>
  </p>
  <div class="text-left">
    <p class="pb-4">点击查看不同类型的代码片段</p>
    <div class="flex gap-4">
      <RouterLink class="button" to="/h5">H5组件</RouterLink>
      <RouterLink class="button" to="/pc">PC组件</RouterLink>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
