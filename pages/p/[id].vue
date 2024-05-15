<template>
  <div
    class="w-full h-[500px] relative dark:bg-[#232324] bg-[#ffffff] rounded-xl p-6"
  >
    <div class="flex flex-row items-center justify-between gap-2">
      <div class="flex flex-row items-center gap-2">
        <NuxtImg :src="post?.image" class="w-9 h-9 rounded-full" />
        <NuxtLink :to="`/u/${post.username}`">{{ post?.username }}</NuxtLink>
        <span
          class="text-[12px] font-medium dark:text-[#969c9d] dark:hover:text-[#767b7b]"
          >{{ timeAgo }}</span
        >
      </div>
      <div class="flex flex-row items-center gap-4">
        <button
          v-if="post.userId !== user?.id"
          class="py-2 px-3 rounded-lg bg-[#f0f0f0] hover:bg-[#e6e6e6] active:bg-[#dbdbdb] dark:active:bg-[#2c2c2c] dark:bg-[#333333] dark:hover:bg-[#2c2c2c] font-medium text-[13px]"
        >
          Подписаться
        </button>
        <button ref="ignoreEl" @click="isDropdown = !isDropdown">
          <Icon
            name="bi:three-dots"
            class="dark:text-[#c9cccf] p-2 dark:hover:bg-[#333333] rounded-full w-8 h-8 text-black custom-transition"
          />
        </button>
      </div>
    </div>
    <UIPostDropdown ref="target" :post="post" v-if="isDropdown" />
    <div v-html="post.content" class="my-8 prose-styles"></div>
    <div></div>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
const userStore = useUserStore();
const target = ref(null);
const ignoreEl = ref(null);
let isDropdown = ref(false);
let post = ref({});

const timeAgo = useTimeAgo(post.createdAt);
const { id } = useRoute().params;
console.log(id);

onClickOutside(
  target,
  () => {
    isDropdown.value = false;
  },
  { ignore: [ignoreEl] }
);

onBeforeMount(async () => {
  try {
    await userStore.getSinglePost(id);
  } catch (err) {
    console.log(err);
  }
});

onMounted(() => {
  watchEffect(() => {
    if (userStore.singlePost) {
      post.value = userStore.singlePost;
    }
  });
});

watch(
  () => post.value,
  () => {
    if (userStore.singlePost) {
      post.value = userStore.singlePost;
    }
  },
  { deep: true }
);
</script>
