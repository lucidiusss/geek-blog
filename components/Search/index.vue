<template>
  <div class="flex items-center mx-auto w-full">
    <div class="px-2 relative flex flex-row w-full h-full items-center gap-2">
      <input
        ref="target"
        type="text"
        v-model="text"
        placeholder="Поиск"
        class="w-full relative leading-4 custom-transition rounded-xl outline outline-transparent bg-[#c2e7ff] hover:bg-white focus:bg-white hover:outline-[#d2e8f7] focus:outline-[#d2e8f7] hover:border-[#99d6ff] focus:border-[#99d6ff] dark:bg-[#393d40] dark:focus:outline-[#37393c] dark:focus:bg-[#1e1d1e] dark:active:outline-[#37393c] dark:active:bg-[#1e1d1e] dark:hover:outline-[#37393c] dark:hover:bg-[#1e1d1e] outline-none placeholder:text-[17px] placeholder:text-[#595959] dark:placeholder-[#969c9d] py-3 px-10 h-full dark:text-[#c9cccf] text-black"
      >
      <Icon
        class="absolute left-5  text-[#595959] dark:text-[#969c9d]"
        name="ph:magnifying-glass-bold"
        size="20"
      />
      <Icon
      v-if="isSearching"
        class="text-[#595959] hover:text-black dark:text-[#969c9d] dark:hover:text-[#c9cccf] custom-transition absolute right-3 cursor-pointer "
        size="20"
        name="heroicons:x-mark-16-solid"
      />
    </input>
    </div>
  </div>
</template>

<script setup>
let isSearching = ref(false);
let text = ref("");
const target = ref(null);
useFocus(target);
</script>
