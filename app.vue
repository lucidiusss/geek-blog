<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const userStore = useUserStore();
const user = useSupabaseUser();

/* onMounted(() => {
  nextTick(async () => {
    if (user.value) {
      await userStore.getUserByUuid(user.value.id);
    }
  });
}); */
</script>
