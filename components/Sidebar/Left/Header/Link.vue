<template>
  <li
    class="dark:hover:bg-[#232324] flex flex-row p-3 rounded-xl custom-transition gap-2"
  >
    <Icon :name="props.icon" size="24" />
    <p class="topic">{{ props.name }}</p>
  </li>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.topic {
  @apply dark:text-[#c9cccf] text-black !important;
}
</style>
