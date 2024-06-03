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
      class="dark:text-[#c9cccf] text-black font-medium text-[17px] h-full"
    >
      <UIPost :key="post.id" :post="post" type="post" />
    </div>
  </div>
</template>

<script setup>
const postModal = usePostModal();

const userStore = useUserStore();
const client = useSupabaseClient();
let posts = ref();
let isLoading = ref(true);
let isFetching = ref(false);

onBeforeMount(async () => {
  try {
    await userStore.getAllPosts();
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
});

onMounted(() => {
  watchEffect(() => {
    if (userStore.posts && userStore.posts.length >= 1) {
      posts.value = userStore.posts;
    }
  });
});

watch(
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
});

/* watchEffect(() => {
  realtimeChannel = client
    .channel("post-insert")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "Post" },
      async (payload) => {
        // Проверьте, существует ли payload.new
        const post = await userStore.getSinglePost(payload.new.id);
        posts.value.unshift(post.value);
      }
    );

  realtimeChannel.subscribe();
}); */

/* watchEffect(() => {
  realtimeChannel = client
    .channel("follows-update")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "Follows" },
      async (payload) => {
        const postsToUpdate = await useFetch("/api/get-many-posts", {
          method: "GET",
          body: {
            id: payload.new.followedToId,
          },
        });
        console.log(postsToUpdate);
      }
    );

  realtimeChannel.subscribe();
}); */

/* watchEffect(() => {
  realtimeChannel = client
    .channel("post-delete")
    .on(
      "postgres_changes",
      { event: "DELETE", schema: "public", table: "Post" },
      (payload) => {
        isLoading.value = true;
        const index = posts.value.findIndex(
          (post) => post.id === payload.old.id
        );
        if (index !== -1) {
          posts.value.splice(index, 1);
        }
        isLoading.value = false;
      }
    );

  realtimeChannel.subscribe();
}); */

/* onUnmounted(() => {
  client.removeChannel(realtimeChannel);
}); */
useHead({
  title: "Свежее - игры, кино, сериалы, разработка, сообщество",
});
</script>
