<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UNotifications />
</template>

<script setup>
onMounted(async () => {
  await preloadComponents(["Icon", "IconifyIcon"]);
});
</script>
