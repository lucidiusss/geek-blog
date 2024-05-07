<template>
  <NuxtLayout :name="$route.path !== '/auth' ? 'main' : 'auth'">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup></script>
