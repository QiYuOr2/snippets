<script setup lang="ts">
const user = useUserStore();
const name = $ref(user.savedName);

const router = useRouter();
const go = () => {
  if (name) router.push(`/hi/${encodeURIComponent(name)}`);
};
</script>

<template>
  <div class="flex">
    <RouterLink to="/h5">h5</RouterLink>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
