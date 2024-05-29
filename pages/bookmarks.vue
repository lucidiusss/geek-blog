<template>
  <div class="w-full relative h-full flex flex-col gap-6">
    <div
      v-if="!isLoading"
      v-for="(post, index) in posts"
      :key="`post-${index}-${posts.length}`"
      class="dark:text-[#c9cccf] text-black font-medium text-[17px] h-full"
    >
      <UIPost
        :ref="index == posts.length - 1 ? 'target' : null"
        :key="post.id"
        :post="post"
      />
    </div>

    <ClientOnly>
      <div class="flex flex-col gap-6" v-if="isLoading">
        <UIPostSkeleton />
        <UIPostSkeleton />
        <UIPostSkeleton />
      </div>
    </ClientOnly>
    <ClientOnly>
      <div class="flex flex-col gap-6" v-if="!isBookmarks && !isLoading">
        <div
          class="w-full min-h-[350px] dark:bg-[#232324] flex flex-col gap-10 items-center justify-center bg-[#ffffff] rounded-xl p-4"
        >
          <div>
            <Icon name="twemoji:confused-face" size="100" />
          </div>
          <div>
            <h1
              class="text-black dark:text-[#c9cccf] font-medium text-[25px] text-center w-full"
            >
              Вы пока ничего не добавили в закладки...
            </h1>
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
const userStore = useUserStore();
const posts = ref([]);
let isLoading = ref(true);
let isBookmarks = ref(false);

onBeforeMount(async () => {
  try {
    await userStore.getBookmarks(user.value.id);
  } catch (err) {
    e.log(err);
  } finally {
    isLoading.value = false;
  }
});

onMounted(() => {
  watchEffect(() => {
    if (userStore.bookmarks && userStore.bookmarks.length >= 1) {
      posts.value = userStore.bookmarks;
      isBookmarks.value = true;
    }
  });
});

watch(
  () => posts.value,
  () => {
    if (userStore.bookmarks && userStore.bookmarks.length >= 1) {
      posts.value = userStore.bookmarks;
      isBookmarks.value = true;
    }
  },
  { deep: true }
);

watchEffect(() => {
  posts.value = userStore.bookmarks;
});
</script>
