<template>
  <div class="flex flex-col gap-3 mt-5 min-h-[250px]">
    <h1
      class="ml-3 dark:text-[#969c9d] text-black font-normal text-[15px] leading-[22px]"
    >
      Темы
    </h1>
    <div class="flex flex-col gap-2 h-full" v-if="isLoading">
      <SidebarLeftTopicsSkeleton />
      <SidebarLeftTopicsSkeleton />
      <SidebarLeftTopicsSkeleton />
    </div>
    <div
      v-motion-fade
      v-if="!isLoading"
      class="flex flex-col gap-2 h-full"
      v-for="topic in topics"
    >
      <NuxtLink
        class="flex flex-row items-center gap-2 dark:hover:bg-[#232324] p-3 rounded-xl custom-transition"
        :to="`/t/${topic.short_name}`"
      >
        <NuxtImg class="w-7 h-7 rounded-full" :src="topic.avatar" />
        <p class="text-black dark:text-[#c9cccf] font-medium text-[17px]">
          {{ topic.name }}
        </p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const userStore = useUserStore();
let topics = ref([]);
let isLoading = ref(true);
let isTopics = ref(false);

onBeforeMount(async () => {
  try {
    await userStore.getAllTopics();
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
});

onMounted(() => {
  watchEffect(() => {
    if (userStore.topics && userStore.topics.length >= 1) {
      topics.value = userStore.topics;
      isTopics.value = true;
    }
  });
});
</script>

<style scoped>
.router-link-exact-active {
  @apply dark:bg-[#232324] bg-white;
}
</style>
