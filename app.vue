<template>
  <NuxtLayout>
    <NuxtPage :keepalive="true" />
  </NuxtLayout>
</template>

<script setup>
const userStore = useUserStore();
const client = useSupabaseClient();
const user = useSupabaseUser();
</script>
