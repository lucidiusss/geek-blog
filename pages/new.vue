<template>
  <div class="w-full h-full flex flex-col gap-6">
    <div
      v-if="!isLoading"
      v-for="post in posts"
      class="dark:text-[#c9cccf] text-black font-medium text-[17px]"
    >
      <UIPost :post="post" :key="post" />
    </div>
    <ClientOnly>
      <div class="flex flex-col gap-6" v-if="isLoading">
        <UIPostSkeleton />
        <UIPostSkeleton />
        <UIPostSkeleton />
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
import { RealtimeChannel } from "@supabase/supabase-js";
const userStore = useUserStore();
const client = useSupabaseClient();
let realtimeChannel = RealtimeChannel;
let posts = ref([]);
let isLoading = ref(true);

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
</script>
