<template>
  <div
    :class="` ${isOpen ? 'opacity-100' : 'opacity-0'} `"
    class="w-full h-full opacity-0 custom-transition hover:opacity-100 absolute z-10 top-0 left-0"
  >
    <button
      @click="isOpen = true"
      class="absolute flex flex-row gap-1 z-10 items-center font-medium bottom-1 right-1 text-[13px] leading-[13px] rounded-md p-1 text-white bg-black/30 hover:bg-black/50 active:bg-black/80"
    >
      <Icon name="material-symbols:edit-outline" size="20" />Редактировать
      обложку
    </button>
    <div
      ref="target"
      v-if="isOpen"
      class="absolute -bottom-28 right-5 flex flex-col w-36 dark:bg-[#1f1f1f] bg-white shadow-xl border dark:border-[#2f2f2f] text-black border-[#dddddd] rounded-xl p-2 dark:text-[#c9cccf]"
    >
      <button
        class="flex flex-row gap-2 items-center dark:hover:bg-[#313131] hover:bg-[#f2f2f2] text-[15px] font-medium cursor-pointer p-2 rounded-lg custom-transition"
      >
        <Icon
          name="ph:push-pin"
          size="20"
          class="text-black dark:text-[#c9cccf]"
        />
        Изменить
      </button>
      <button
        class="flex flex-row gap-2 items-center dark:hover:bg-[#313131] hover:bg-[#f2f2f2] text-[15px] font-medium cursor-pointer p-2 rounded-lg custom-transition"
      >
        <Icon
          name="material-symbols:edit-outline-rounded"
          size="20"
          class="text-black dark:text-[#c9cccf]"
        />
        Удалить
      </button>
    </div>
  </div>
</template>

<script setup>
let isOpen = ref(false);
const target = ref(null);

onClickOutside(target, () => {
  isOpen.value = false;
});
</script>
