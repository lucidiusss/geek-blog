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
      class="absolute pointer-events-auto -bottom-28 right-5 flex flex-col w-36 dark:bg-[#1f1f1f] bg-white shadow-xl border dark:border-[#2f2f2f] text-black border-[#dddddd] rounded-xl p-2 dark:text-[#c9cccf]"
    >
      <button
        class="flex w-full relative h-full p-2 flex-row gap-2 items-center dark:hover:bg-[#313131] hover:bg-[#f2f2f2] text-[15px] font-medium cursor-pointer rounded-lg custom-transition"
      >
        <Icon
          name="gravity-ui:picture"
          size="20"
          class="text-black dark:text-[#c9cccf]"
        />
        Изменить
        <input
          type="file"
          accept="image/*"
          @change="$emit('updateBanner', $event)"
          class="absolute w-full h-full top-0 left-0 opacity-0"
        />
      </button>
      <button
        @click="deleteBanner()"
        class="flex flex-row gap-2 items-center dark:hover:bg-[#313131] hover:bg-[#f2f2f2] text-[15px] font-medium cursor-pointer p-2 rounded-lg custom-transition"
      >
        <Icon
          name="lucide:trash-2"
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
const user = useSupabaseUser();
const client = useSupabaseClient();
let imageUrl = ref(null);

const emit = defineEmits(["updateBanner"]);

const props = defineProps({
  thisUser: {
    type: Object,
    required: true,
  },
});

const deleteBanner = async () => {
  try {
    props.thisUser.bannerImage = null;
    await client.storage
      .from("banners")
      .remove([`${props.thisUser.bannerImage}`]);
    await client
      .from("User")
      .update({ bannerImage: null })
      .eq("id", user.value.id);
  } catch (err) {
    console.log(err);
  }
};

onClickOutside(target, () => {
  isOpen.value = false;
});
</script>
