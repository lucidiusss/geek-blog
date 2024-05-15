<template>
  <div class="text-[#595959] dark:text-[#c9cccf] mt-5 p-2">
    <input
      class="bg-transparent outline-none w-full"
      type="text"
      v-model="postModal.title"
      placeholder="Заголовок"
    />

    <textarea
      class="bg-transparent outline-none w-full"
      type="text"
      v-model="postModal.text"
      placeholder="Текст"
    />
  </div>
</template>

<script setup>
const postModal = usePostModal();
</script>
