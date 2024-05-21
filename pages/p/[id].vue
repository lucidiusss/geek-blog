<template>
  <div>
    <UIPost content="full" :post="post" v-if="!isLoading" />
    <UIPostSkeleton v-if="isLoading" />
  </div>
</template>

<script setup>
const userStore = useUserStore();
const target = ref(null);
const ignoreEl = ref(null);
let isDropdown = ref(false);
let isLoading = ref(true);
let post = ref({});

const { id } = useRoute().params;

onBeforeMount(async () => {
  try {
    await userStore.getSinglePost(id);
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
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

onClickOutside(
  target,
  () => {
    isDropdown.value = false;
  },
  { ignore: [ignoreEl] }
);
</script>
