<template>
  <div
    class="relative flex flex-col dark:bg-[#232324] min-h-[350px] bg-[#ffffff] overflow-hidden rounded-xl px-5 py-4"
  >
    <div class="flex flex-row items-center justify-between gap-2">
      <div class="flex flex-row items-center gap-2">
        <NuxtImg
          :src="`https://wsnrscwmvaliilxyaimk.supabase.co/storage/v1/object/public/avatars/${post?.user?.profileImage}`"
          class="w-9 h-9 rounded-full"
        />
        <NuxtLink :to="`/u/${post.user?.shortId}-${post.user?.username}`">{{
          post?.user?.username
        }}</NuxtLink>
        <div>
          <NuxtLink
            :to="useRoute().path !== `/p/${post.id}` ? `/p/${post.id}` : ``"
          >
            <span
              :class="
                useRoute().path !== `/p/${post.id}`
                  ? 'dark:hover:text-[#767b7b]'
                  : ''
              "
              class="text-[12px] font-medium dark:text-[#969c9d]"
              >{{ timeAgo }}</span
            >
          </NuxtLink>
        </div>
      </div>

      <div class="flex flex-row items-center gap-4">
        <button
          v-if="post?.user?.id !== user?.id && !isFollowed"
          @click="followUser(post.userId)"
          class="py-2 px-3 rounded-lg bg-[#f0f0f0] hover:bg-[#e6e6e6] active:bg-[#dbdbdb] dark:active:bg-[#2c2c2c] dark:bg-[#333333] dark:hover:bg-[#2c2c2c] font-medium text-[13px]"
        >
          Подписаться
        </button>
        <button ref="ignoreEl" @click="isDropdown = !isDropdown">
          <Icon
            name="bi:three-dots"
            class="dark:text-[#c9cccf] p-2 dark:hover:bg-[#333333] hover:bg-[#f0f0f0] rounded-full w-8 h-8 text-black custom-transition"
          />
        </button>
      </div>
    </div>
    <UIPostDropdown
      class="absolute w-1/4 top-14 right-5"
      ref="target"
      :post="props.post"
      v-if="isDropdown"
    />

    <NuxtLink :to="useRoute().path !== `/p/${post.id}` ? `/p/${post.id}` : ``">
      <div
        v-html="content === 'full' ? post.content : filteredContent"
        class="my-8 prose-styles"
      ></div>
    </NuxtLink>
    <div class="w-full h-full mt-auto">
      <UIPostButtons :post="props.post" />
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
const target = ref(null);
const ignoreEl = ref(null);
const authModal = useAuthModal();
let isDropdown = ref(false);
let isFollowed = ref(false);

const props = defineProps({
  bookmark: {
    type: Object,
    required: false,
  },
});

onMounted(() => {
  if (props.post?.user?.followedBy) {
    props.post?.user?.followedBy.forEach((user) => {
      if (user.id === user?.id) {
        isFollowed.value = true;
      }
    });
  }
});

const followUser = async (userId) => {
  if (!user.value) {
    authModal.isOpen = true;
    return;
  }

  const { error } = await useFetch(`/api/follow-user`, {
    method: "POST",
    body: {
      followedToId: userId,
      followedById: user.value.id,
    },
  });
  isFollowed.value = true;
  await props.post.user.followedBy.push({
    followedById: user.value.id,
    followedToId: userId,
  });
  console.log(props.post.user.followedBy);
  if (error) {
    return;
  }
};

const timeAgo = useTimeAgo(props.post.createdAt);

onClickOutside(
  target,
  () => {
    isDropdown.value = false;
  },
  { ignore: [ignoreEl] }
);

/* const filteredContent = computed(() => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(props.post.content, "text/html");
  const h1 = doc.querySelector("h1");
  const p = doc.querySelector("p");
  return `${h1 ? h1.outerHTML : ""}${p ? p.outerHTML : ""}`;
}); */
</script>
