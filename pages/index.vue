<template>
  <div
    class="flex flex-col border-l border-r border-l-[#ebeef0] dark:border-l-[#3a444c] border-r-[#ebeef0] dark:border-r-[#3a444c] h-screen"
  >
    <div
      class="flex border-b w-full border-b-[#d4d4d4] dark:border-b-[#8899A6]"
    >
      <h1
        class="text-[19px] w-full text-black dark:text-white font-bold px-5 py-3"
      >
        Home
      </h1>
    </div>
    <div
      class="flex border-b-[15px] border-b-[#d4d4d4] dark:border-b-[#8899A6]"
    >
      <PostSection />
    </div>
    <div v-if="isPosts" v-for="post in posts" :key="post">
      <Post :post="post" />
    </div>
    <div v-else>
      <ClientOnly
        ><div
          v-if="isLoading"
          class="mt-20 w-full flex items-center justify-center mx-auto"
        >
          <div
            class="text-black mx-auto flex flex-col items-center justify-center"
          >
            <Icon name="eos-icons:bubble-loading" size="50" color="black" />
            <div class="w-full mt-1">Loading...</div>
          </div>
        </div>
        <div
          v-if="!isLoading"
          class="mt-20 w-full flex items-center justify-center mx-auto"
        >
          <div
            class="text-black mx-auto flex flex-col items-center justify-center"
          >
            <Icon name="tabler:mood-empty" size="50" color="black" />
            <div class="w-full">Create the first post!</div>
          </div>
        </div></ClientOnly
      >
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/user";
const userStore = useUserStore();
let posts = ref([]);
let isPosts = ref(false);
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
</script>
