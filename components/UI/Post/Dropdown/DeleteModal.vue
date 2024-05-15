<template>
  <div
    class="fixed flex flex-col top-1/2 left-1/2 rounded-xl dark:bg-[#232324] bg-white w-1/4 h-52 -translate-y-1/2 -translate-x-1/2 z-40"
  >
    <div
      class="w-full flex flex-row items-center justify-between border-b p-4 dark:border-[#353436]"
    >
      <h1 class="text-[20px] font-medium text-black dark:text-[#c9cccf]">
        Удалить
      </h1>
      <button
        class="rounded-full dark:hover:bg-[#2c2c2c] hover:bg-[#f0f0f0] p-1"
      >
        <Icon
          size="25"
          class="dark:text-[#969c9d] text-[#595959]"
          name="heroicons:x-mark-16-solid"
        />
      </button>
    </div>
    <div class="flex flex-col w-full h-full gap-10 p-4">
      <div>
        <h1 class="font-medium text-[17px] text-black dark:text-[#c9cccf]">
          Вы уверены?
        </h1>
      </div>
      <div class="flex flex-row justify-end gap-7">
        <button
          class="py-2 px-3 rounded-xl text-white dark:text-[#c9cccf] dark:bg-[#2c2c2c] border dark:border-[#303030] dark:hover:border-[#373737] dark:active:border-[#424242]"
        >
          Отменить
        </button>
        <button
          class="py-2 px-3 rounded-xl dark:text-white dark:bg-[#418af4] dark:hover:bg-[#598fde] dark:active:bg-[#3367b5]"
          @click="emit('deletePost')"
        >
          Подтвердить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["deletePost"]);
const props = defineProps({
  /* post: {
    type: Object,
    required: true,
  }, */
  isLoading: {
    type: Boolean,
    required: true,
  },
  isDeleting: {
    type: Boolean,
    required: true,
  },
});
</script>
