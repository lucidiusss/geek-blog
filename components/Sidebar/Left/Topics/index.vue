<template>
  <div class="flex flex-col gap-3 mt-5">
    <h1
      class="ml-3 dark:text-[#969c9d] text-black font-normal text-[15px] leading-[22px]"
    >
      Темы
    </h1>
    <!-- <div v-if="isLoading" class="flex flex-col gap-2">
      <div class="bg-stone-500">loading...</div>
      <div class="bg-stone-500">loading...</div>
      <div class="bg-stone-500">loading...</div>
      
    </div> -->
    <div v-for="topic in topics">
      <div v-if="isLoading" class="bg-stone-500">loading...</div>
      <NuxtLink
        v-else
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
    }
  });
});
</script>
