<template>
  <div
    class="w-full h-[500px] relative dark:bg-[#232324] bg-[#ffffff] rounded-xl p-4"
  >
    <div class="flex flex-row items-center justify-between gap-2">
      <div class="flex flex-row items-center gap-2">
        <NuxtImg :src="post?.image" class="w-9 h-9 rounded-full" />
        <NuxtLink :to="`/u/${post.username}`">{{ post?.username }}</NuxtLink>
        <NuxtLink :to="`/p/${post.id}`">
          <span
            class="text-[12px] font-medium dark:text-[#969c9d] dark:hover:text-[#767b7b]"
            >{{ timeAgo }}</span
          >
        </NuxtLink>
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
    <UIPostDropdown ref="target" :post="props.post" v-if="isDropdown" />
    <div
      v-html="post.content"
      class="my-8 prose prose-headings:text-black prose-p:text-black dark:prose-p:text-[#c9cccf] dark:prose-headings:text-[#c9cccf] prose-sm sm:prose lg:prose-lg xl:prose-2xl max-w-none"
    ></div>
    <div></div>
  </div>
</template>

<script setup>
/* import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import CodeBlock from "@tiptap/extension-code-block";
import Code from "@tiptap/extension-code";
import { generateHTML } from "@tiptap/html"; */

const user = useSupabaseUser();
const target = ref(null);
const ignoreEl = ref(null);
let isDropdown = ref(false);

const props = defineProps({
  post: {
    type: Object,
    required: true,
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

/* let output = computed(() => {
  return generateHTML(props.post.content, [
    Code,
    CodeBlock,
    Document,
    Paragraph,
    Strike,
    Heading,
    Italic,
    Text,
    Bold,
    Underline,
  ]);
}); */
</script>
