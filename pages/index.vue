<template>
  <button
    @click="postModal.isModalOpen = true"
    class="fixed xs:block md:hidden rounded-full p-3 dark:bg-[#2c2c2c] border-[#e4e4e4] shadow bg-white z-10 bottom-20 right-5"
  >
    <Icon
      class="xl:w-6 xl:h-6 md:h-4 md:w-4 xs:w-6 xs:h-6 text-[#418af4]"
      name="material-symbols:edit-outline-rounded"
    />
  </button>
</template>

<script setup>
const postModal = usePostModal();

useHead({
  title: "Главная",
});
</script>
