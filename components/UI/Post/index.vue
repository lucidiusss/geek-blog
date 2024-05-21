<template>
  <div
    class="relative dark:bg-[#232324] bg-[#ffffff] min-h-[350px] overflow-hidden rounded-xl p-6"
  >
    <div class="flex flex-row items-center justify-between gap-2">
      <div class="flex flex-row items-center gap-2">
        <NuxtImg
          v-motion-fade
          :src="
            post?.user?.profileImage
              ? `https://wsnrscwmvaliilxyaimk.supabase.co/storage/v1/object/public/avatars/${post?.user?.profileImage}`
              : `https://ui-avatars.com/api/?name=${post?.user?.username}`
          "
          class="w-9 h-9 rounded-full"
        />
        <NuxtLink
          v-motion-fade
          :to="`/u/${post.user?.shortId}-${post.user?.username}`"
          >{{ post?.user?.username }}</NuxtLink
        >
        <div>
          <NuxtLink
            v-motion-fade
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
          v-if="post.userId !== user?.id"
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
        v-motion-fade
        v-html="content === 'full' ? post.content : filteredContent"
        class="my-8 prose-styles"
      ></div>
    </NuxtLink>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
const client = useSupabaseClient();
const target = ref(null);
const ignoreEl = ref(null);
let isDropdown = ref(false);

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
  content: {
    type: String,
  },
});

const timeAgo = useTimeAgo(props.post.createdAt);

onClickOutside(
  target,
  () => {
    isDropdown.value = false;
  },
  { ignore: [ignoreEl] }
);

const filteredContent = computed(() => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(props.post.content, "text/html");
  const h1 = doc.querySelector("h1");
  const p = doc.querySelector("p");
  return `${h1 ? h1.outerHTML : ""}${p ? p.outerHTML : ""}`;
});
</script>
