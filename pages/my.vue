<template>
  <div class="w-full relative h-full flex flex-col gap-6">
    <button
      @click="postModal.isModalOpen = true"
      class="fixed xs:block md:hidden rounded-full p-3 dark:bg-[#2c2c2c] border-[#e4e4e4] shadow bg-white z-10 bottom-20 right-5"
    >
      <Icon
        class="xl:w-6 xl:h-6 md:h-4 md:w-4 xs:w-6 xs:h-6 text-[#418af4]"
        name="material-symbols:edit-outline-rounded"
      />
    </button>
    <ClientOnly>
      <div class="flex flex-col gap-6" v-if="isLoading">
        <UIPostSkeleton />
        <UIPostSkeleton />
        <UIPostSkeleton />
      </div>
    </ClientOnly>
    <div
      v-if="!isLoading"
      v-for="(post, index) in posts"
      :key="`post-${index}-${posts.length}`"
      class="dark:text-[#c9cccf] text-black font-medium text-[17px]"
    >
      <UIPost
        :ref="index == posts.length - 1 ? 'target' : null"
        :key="post.id"
        :post="post"
        type="post"
      />
    </div>

    <ClientOnly>
      <div
        v-if="isFetching"
        class="dark:bg-[#232324] justify-center flex shadow-xl bg-[#ffffff] rounded-xl p-2"
      >
        <Icon name="eos-icons:three-dots-loading" size="35" />
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
const userStore = useUserStore();
const user = useSupabaseUser();
const client = useSupabaseClient();
const postModal = usePostModal();
let posts = ref();
let isLoading = ref(true);
let isFetching = ref(false);

onBeforeMount(async () => {
  isFetching.value = true;
  try {
    const myPosts = await $fetch(`/api/get-user-feed/${user.value.id}`, {
      method: "GET",
    });
    posts.value = myPosts;
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
    isFetching.value = false;
  }
});

const onTabChange = (index) => {
  const tab = tabs[index];

  if (tab.value === "new") {
    activeTab.value = "new";
    navigateTo("/new");
  } else if (tab.value === "my") {
    activeTab.value = "my";
    navigateTo("/my");
  } else if (tab.value === "popular") {
    activeTab.value = "popular";
    navigateTo("/popular");
  }
};

/* onMounted(() => {
  watchEffect(() => {
    if (userStore.posts && userStore.posts.length >= 1) {
      posts.value = userStore.posts;
    }
  });
}); */

/* watch(
  () => posts.value,
  () => {
    if (userStore.posts && userStore.posts.length >= 1) {
      posts.value = userStore.posts;
    }
  },
  { deep: true }
);

watchEffect(() => {
  posts.value = userStore.posts;
}); */

useHead({
  title: "Моя лента - игры, кино, сериалы, разработка, сообщество",
});
</script>
