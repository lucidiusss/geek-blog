<template>
  <div class="w-full flex flex-col">
    <button
      class="w-full flex flex-row gap-2 items-center dark:hover:bg-[#313131] hover:bg-[#f2f2f2] text-[15px] font-medium cursor-pointer p-2 rounded-lg custom-transition"
    >
      <Icon
        name="ph:push-pin"
        size="20"
        class="text-black dark:text-[#c9cccf]"
      />
      Закрепить
    </button>
    <button
      class="w-full flex flex-row gap-2 items-center dark:hover:bg-[#313131] hover:bg-[#f2f2f2] text-[15px] font-medium cursor-pointer p-2 rounded-lg custom-transition"
    >
      <Icon
        name="material-symbols:edit-outline-rounded"
        size="20"
        class="text-black dark:text-[#c9cccf]"
      />
      Редактировать
    </button>
    <button
      @click="isDeleting = true"
      class="w-full flex flex-row gap-2 items-center dark:hover:bg-[#313131] hover:bg-[#f2f2f2] text-[15px] font-medium cursor-pointer p-2 rounded-lg custom-transition"
    >
      <Icon
        name="lucide:trash-2"
        size="20"
        class="text-black dark:text-[#c9cccf]"
      />
      Удалить
    </button>
  </div>

  <UIAuthBackground v-if="isDeleting" />
  <UIPostDropdownDeleteModal
    ref="targetEl"
    :isLoading="isLoading"
    :isDeleting="isDeleting"
    :post="props.post"
    @delete-post="deletePost()"
    @toggle-modal="toggleModal()"
    v-if="isDeleting"
  />
</template>

<script setup>
let isLoading = ref(false);
let isDeleting = ref(false);
const targetEl = ref(null);

const userStore = useUserStore();

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const toggleModal = () => {
  isDeleting.value = !isDeleting.value;
};

const deletePost = async () => {
  isDeleting.value = true;
  isLoading.value = true;
  try {
    const index = userStore.posts.findIndex(
      (post) => post.id === props.post.id
    );
    if (index !== -1) {
      userStore.posts.splice(index, 1);
    }
    await useFetch(`/api/delete-post/${props.post.id}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
    isDeleting.value = false;
    if (useRoute().path === `/p/${props.post.id}`) {
      navigateTo("/");
    }
  }
};

onClickOutside(targetEl, () => {
  isDeleting.value = false;
});
</script>
