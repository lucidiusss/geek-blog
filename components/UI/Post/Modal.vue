<template>
  <div
    ref="modal"
    class="fixed top-1/2 left-1/2 dark:bg-[#232324] w-screen h-screen bg-white -translate-y-1/2 -translate-x-1/2 z-40"
  >
    <div class="absolute top-2 right-2 gap-2 flex">
      <UIPostButton
        icon="heroicons:x-mark-16-solid"
        @click="postModal.isModalOpen = false"
      />
    </div>
    <div class="w-full h-full p-10 flex flex-col">
      <div class="flex flex-row gap-2 items-center">
        <div>
          <NuxtImg
            class="w-9 h-9 rounded-full"
            :src="
              props.currentUser.profileImage
                ? `https://wsnrscwmvaliilxyaimk.supabase.co/storage/v1/object/public/avatars/${props.currentUser.profileImage}`
                : `https://ui-avatars.com/api/?name=${props.currentUser.username}`
            "
          />
        </div>
        <div class="flex items-start flex-col">
          <p class="font-bold text-[15px] dark:text-[#c9cccf] text-black">
            {{ props.currentUser.username }}
          </p>
          <button class="flex items-center hover:opacity-70">
            <p class="text-black dark:text-[#c9cccf] font-medium text-[13px]">
              Без темы
            </p>
            <Icon
              class="dark:text-[#c9cccf] text-black"
              name="lucide:chevron-down"
            />
          </button>
        </div>
      </div>
      <div
        class="flex flex-col items-center justify-between w-1/2 h-[90%] mx-auto"
      >
        <UIPostTipTapEditor />
      </div>
      <div class="w-1/2 mx-auto">
        <div class="w-fit">
          <button
            :disabled="isPosting"
            class="px-4 py-3 custom-transition leading-[17px] text-[17px] font-medium rounded-xl text-white bg-[#0b5dd7] hover:bg-[#2664bf] active:bg-[#2a6dd1] dark:bg-[#418af4] dark:hover:bg-[#598fde] dark:active:bg-[#3367b5]"
            @click="createPost()"
          >
            Опубликовать
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
const modal = ref(null);
const postModal = usePostModal();
const userStore = useUserStore();
let isPosting = ref(false);
let createdPost = ref({});

const props = defineProps({
  currentUser: {
    type: Object,
    required: true,
  },
});

onClickOutside(modal, () => {
  postModal.isFullscreen = false;
  postModal.isModalOpen = false;
});

const createPost = async () => {
  isPosting.value = true;
  try {
    const post = await $fetch("/api/create-post/", {
      method: "POST",
      body: {
        userId: user.value.id,
        username: props.currentUser.username,
        image: `${
          props.currentUser.profileImage
            ? props.currentUser.profileImage
            : `https://ui-avatars.com/api/?name=${props.currentUser.username}`
        }`,
        content: postModal.content,
        picture: "http://placekitten.com/200/200",
      },
    });

    createdPost = {
      ...post,
      user: props.currentUser,
    };

    userStore.posts = [createdPost, ...userStore.posts];
    console.log(userStore.posts);
  } catch (err) {
    console.log(err);
  } finally {
    postModal.isFullscreen = false;
    postModal.isModalOpen = false;
    postModal.content = "";
    isPosting.value = false;
  }
};
</script>
