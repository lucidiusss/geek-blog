<template>
  <div
    class="w-full h-[500px] relative dark:bg-[#232324] bg-[#ffffff] rounded-xl p-4"
  >
    {{ username }}
  </div>
</template>

<script setup>
const { username } = useRoute().params;
</script>
