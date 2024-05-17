<template>
  <div class="w-full h-full flex flex-col gap-6">
    <div
      v-if="!isLoading"
      v-for="post in posts"
      class="dark:text-[#c9cccf] text-black font-medium text-[17px]"
    >
      <UIPost v-if="isPosts" :post="post" :key="post" />
    </div>
    <ClientOnly>
      <div class="flex flex-col gap-6" v-if="isLoading">
        <UIPostSkeleton />
        <UIPostSkeleton />
        <UIPostSkeleton />
      </div>
    </ClientOnly>
    <div
      v-if="!isPosts"
      class="w-full h-2/4 dark:bg-[#232324] flex flex-col gap-10 items-center justify-center bg-[#ffffff] rounded-xl p-4"
    >
      <div>
        <Icon name="twemoji:pensive-face" size="100" />
      </div>
      <div>
        <h1 class="text-black dark:text-[#c9cccf] font-medium text-[35px]">
          Здесь пока ничего нет.
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RealtimeChannel } from "@supabase/supabase-js";
const userStore = useUserStore();
const client = useSupabaseClient();
let realtimeChannel = RealtimeChannel;
let posts = ref([]);
let isLoading = ref(true);
let isPosts = ref(true);

watchEffect(() => {
  realtimeChannel = client
    .channel("posts-insert")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "Posts" },
      (payload) => {
        console.log(payload);
        posts.value.unshift(payload.new);
      }
    );

  realtimeChannel.subscribe();
});

watchEffect(() => {
  realtimeChannel = client
    .channel("posts-delete")
    .on(
      "postgres_changes",
      { event: "DELETE", schema: "public", table: "Posts" },
      (payload) => {
        console.log(payload);
        const index = posts.value.findIndex(
          (post) => post.user.id === payload.old.id
        );
        if (index !== -1) {
          posts.value.splice(index, 1);
        }
      }
    );

  realtimeChannel.subscribe();
});

onBeforeMount(async () => {
  try {
    await userStore.getAllPosts();
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
});

watch(posts, () => {
  if (posts.value.length > 0) {
    isPosts.value = true;
  } else {
    isPosts.value = false;
  }
});

onMounted(() => {
  watchEffect(() => {
    if (userStore.posts && userStore.posts.length >= 1) {
      posts.value = userStore.posts;
      isPosts.value = true;
    }
  });
});

watch(
  () => posts.value,
  () => {
    if (userStore.posts && userStore.posts.length >= 1) {
      posts.value = userStore.posts;
      isPosts.value = true;
    }
  },
  { deep: true }
);

onUnmounted(() => {
  client.removeChannel(realtimeChannel);
});
</script>
