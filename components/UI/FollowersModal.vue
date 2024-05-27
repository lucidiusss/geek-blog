<template>
  <div
    class="flex flex-col absolute top-10 right-0 dark:bg-[#1f1f1f] bg-white shadow-xl border dark:border-[#2f2f2f] text-black border-[#dddddd] z-10 rounded-xl p-1 dark:text-[#c9cccf]"
  >
    <button
      v-if="isFollowing"
      @click="$emit('unFollowUser')"
      class="dark:hover:bg-[#313131] w-full flex flex-row items-center gap-2 hover:bg-[#f2f2f2] text-[15px] font-medium p-2 rounded-lg custom-transition"
    >
      <Icon
        name="material-symbols:person-remove-outline-rounded"
        size="20"
        class="text-black dark:text-[#c9cccf]"
      />
      Отписаться
    </button>
    <button
      class="dark:hover:bg-[#313131] w-full flex flex-row items-center gap-2 hover:bg-[#f2f2f2] text-[15px] font-medium p-2 rounded-lg custom-transition"
    >
      <Icon
        name="clarity:eye-hide-solid"
        size="20"
        class="text-black dark:text-[#c9cccf]"
      />
      Скрыть
    </button>
    <button
      class="dark:hover:bg-[#313131] w-full flex flex-row items-center gap-2 hover:bg-[#f2f2f2] text-[15px] font-medium p-2 rounded-lg custom-transition"
    >
      <Icon
        name="solar:flag-outline"
        size="20"
        class="text-black dark:text-[#c9cccf]"
      />
      Пожаловаться
    </button>
  </div>
</template>

<script setup>
const user = useSupabaseUser();

const emit = defineEmits(["unFollowUser"]);

const props = defineProps({
  currentUser: {
    type: Object,
    required: true,
  },
  isFollowing: {
    type: Boolean,
    required: true,
  },
});
</script>
