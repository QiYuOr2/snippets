<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: "snippets@柒宇",
  meta: [
    { name: "description", content: "snippets vue demo" },
    {
      name: "theme-color",
      // content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
      content: "#ffffff",
    },
  ],
  link: [
    {
      rel: "icon",
      type: "image/svg+xml",
      // href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
      href: "/favicon.svg",
    },
  ],
});
</script>

<template>
  <RouterView />
</template>
