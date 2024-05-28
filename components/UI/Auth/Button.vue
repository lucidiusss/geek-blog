<template>
  <div
    class="w-2/4 cursor-pointer relative font-medium custom-transition rounded-xl flex items-center p-3 dark:text-[#c9cccf] bg-[#f0f0f0] hover:bg-[#e6e6e6] active:bg-[#dbdbdb] text-[17px] dark:bg-[#333333] dark:hover:bg-[#2c2c2c]"
  >
    <ClientOnly>
      <Icon :name="props.icon" class="mr-1 absolute left-3" size="20" />
    </ClientOnly>
    <p class="select-none mx-auto">{{ props.text }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});
</script>
