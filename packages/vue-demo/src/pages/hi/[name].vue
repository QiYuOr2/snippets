<script setup lang="ts">
const props = defineProps<{ name: string }>();
const router = useRouter();
const user = useUserStore();

watchEffect(() => {
  user.setNewName(props.name);
});
</script>

<template>
  <div>1</div>
</template>
