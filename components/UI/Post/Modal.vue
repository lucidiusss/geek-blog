<template>
  <div
    ref="modal"
    class="fixed top-1/2 left-1/2 rounded-xl dark:bg-[#232324] bg-white -translate-y-1/2 -translate-x-1/2 z-20"
    :class="
      postModal.isFullscreen ? 'w-screen h-screen rounded-none' : 'w-2/4 h-3/4'
    "
  >
    <div class="absolute top-2 right-2 gap-2 flex">
      <UIPostButton
        icon="ion:resize"
        @click="postModal.isFullscreen = !postModal.isFullscreen"
      />
      <UIPostButton
        icon="heroicons:x-mark-16-solid"
        @click="postModal.isModalOpen = false"
      />
    </div>
    <div class="w-full h-full p-10">
      <div class="flex flex-row gap-2 items-center">
        <div>
          <NuxtImg
            class="w-9 h-9 rounded-full"
            :src="user?.user_metadata.avatar_url"
          />
        </div>
        <div class="flex items-start flex-col">
          <p class="font-bold text-[15px] dark:text-[#c9cccf] text-black">
            {{ user?.user_metadata.user_name }}
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

      <div class="">
        <div
          :class="
            postModal.isFullscreen ? ' w-1/2 h-[90%] mx-auto' : 'w-full h-1/3'
          "
        >
          <UIPostTipTapEditor />
        </div>
        <div class="w-full">
          <button
            class="px-4 py-3 custom-transition leading-[17px] text-[17px] font-medium rounded-xl dark:text-white bg-[#0b5dd7] hover:bg-[#2664bf] active:bg-[#2a6dd1] dark:bg-[#418af4] dark:hover:bg-[#598fde] dark:active:bg-[#3367b5]"
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

onClickOutside(modal, () => {
  postModal.isFullscreen = false;
  postModal.isModalOpen = false;
});

console.log(user.value.identities[0].identity_data);
const createPost = async () => {
  try {
    await useFetch("/api/create-post/", {
      method: "POST",
      body: {
        userId: user.value.user_metadata.sub,
        username: user.value.user_metadata.user_name,
        image: `${
          user.value.user_metadata.avatar_url
            ? user.value.user_metadata.avatar_url
            : `https://ui-avatars.com/api/?name=${user.value.user_metadata.user_name}`
        }`,
        content: postModal.content,
        picture: "http://placekitten.com/200/200",
      },
    });
  } catch (err) {
    console.log(err);
  } finally {
    postModal.isFullscreen = false;
    postModal.isModalOpen = false;
    postModal.content = "";
  }
};
</script>
