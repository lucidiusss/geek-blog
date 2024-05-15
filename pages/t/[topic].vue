<template>
  <div>{{ topic }}</div>
</template>

<script setup>
const { topic } = useRoute().params;
</script>
