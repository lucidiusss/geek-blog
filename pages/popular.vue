<template>
  <div class="w-full h-full flex flex-col gap-6">
    <button
      @click="postModal.isModalOpen = true"
      class="fixed xs:block md:hidden rounded-full p-3 dark:bg-[#2c2c2c] border-[#e4e4e4] shadow bg-white z-10 bottom-20 right-5"
    >
      <Icon
        class="xl:w-6 xl:h-6 md:h-4 md:w-4 xs:w-6 xs:h-6 text-[#418af4]"
        name="material-symbols:edit-outline-rounded"
      />
    </button>
    <div
      class="w-full min-h-[350px] dark:bg-[#232324] flex flex-col gap-10 items-center justify-center bg-[#ffffff] rounded-xl p-4"
    >
      <div>
        <Icon name="twemoji:pensive-face" size="100" />
      </div>
      <div>
        <h1 class="text-black dark:text-[#c9cccf] font-medium text-[25px]">
          Здесь пока ничего нет.
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup>
const postModal = usePostModal();

useHead({
  title: "GB - игры, кино, сериалы, разработка, сообщество",
});
</script>
