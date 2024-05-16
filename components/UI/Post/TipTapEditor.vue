<template>
  <div>
    <div
      :class="postModal.isFullscreen ? 'block' : 'hidden'"
      v-if="editor"
      class="text-white"
    >
      <TiptapBubbleMenu
        :editor="editor"
        v-show="!postModal.isFullscreen"
        :tippy-options="{ duration: 100 }"
        class="dark:bg-[#1f1f1f] p-2 rounded-xl border border-1 dark:border-[#2d2d2d] shadow-xl"
      >
        <div class="flex flex-row gap-1 items-center">
          <button
            @click="editor.chain().focus().toggleBold().run()"
            :disabled="!editor.can().chain().focus().toggleBold().run()"
            :class="{ 'is-active': editor.isActive('bold') }"
            class="bubble-btn"
          >
            <Icon
              name="material-symbols:format-bold-rounded"
              size="20"
              class="text-black dark:text-[#c9cccf]"
            />
          </button>
          <button
            @click="editor.chain().focus().toggleItalic().run()"
            :disabled="!editor.can().chain().focus().toggleItalic().run()"
            :class="{ 'is-active': editor.isActive('italic') }"
            class="bubble-btn"
          >
            <Icon
              name="material-symbols:format-italic-rounded"
              size="20"
              class="text-black dark:text-[#c9cccf]"
            />
          </button>
          <button
            @click="editor.chain().focus().toggleStrike().run()"
            :disabled="!editor.can().chain().focus().toggleStrike().run()"
            :class="{ 'is-active': editor.isActive('strike') }"
            class="bubble-btn"
          >
            <Icon
              name="material-symbols:format-strikethrough-rounded"
              size="20"
              class="text-black dark:text-[#c9cccf]"
            />
          </button>
          <button
            @click="editor.chain().focus().toggleUnderline().run()"
            :disabled="!editor.can().chain().focus().toggleUnderline().run()"
            :class="{ 'is-active': editor.isActive('underline') }"
            class="bubble-btn"
          >
            <Icon
              name="material-symbols:format-underlined-rounded"
              size="20"
              class="text-black dark:text-[#c9cccf]"
            />
          </button>
          <!-- <button
            @click="setLink"
            :class="{ 'is-active': editor.isActive('link') }"
          >
            setLink
          </button>
          <button
            @click="editor.chain().focus().unsetLink().run()"
            :disabled="!editor.isActive('link')"
          >
            unsetLink
          </button> -->
        </div>
      </TiptapBubbleMenu>
      <div
        class="flex flex-row gap-1 items-center dark:bg-[#1f1f1f] p-2 rounded-xl border border-1 dark:border-[#2d2d2d] shadow-xl h-16 mb-14"
      >
        <div
          class="flex flex-row gap-1 pr-2 items-center border-r dark:border-r-[#2d2d2d]"
        >
          <button
            @click="editor.chain().focus().toggleBold().run()"
            :disabled="!editor.can().chain().focus().toggleBold().run()"
            :class="{ 'is-active': editor.isActive('bold') }"
            class="bubble-btn"
          >
            <Icon
              name="material-symbols:format-bold-rounded"
              size="20"
              class="text-black dark:text-[#c9cccf]"
            />
          </button>
          <button
            @click="editor.chain().focus().toggleItalic().run()"
            :disabled="!editor.can().chain().focus().toggleItalic().run()"
            :class="{ 'is-active': editor.isActive('italic') }"
            class="bubble-btn"
          >
            <Icon
              name="material-symbols:format-italic-rounded"
              size="20"
              class="text-black dark:text-[#c9cccf]"
            />
          </button>
          <button
            @click="editor.chain().focus().toggleStrike().run()"
            :disabled="!editor.can().chain().focus().toggleStrike().run()"
            :class="{ 'is-active': editor.isActive('strike') }"
            class="bubble-btn"
          >
            <Icon
              name="material-symbols:format-strikethrough-rounded"
              size="20"
              class="text-black dark:text-[#c9cccf]"
            />
          </button>
          <button
            @click="editor.chain().focus().toggleUnderline().run()"
            :disabled="!editor.can().chain().focus().toggleUnderline().run()"
            :class="{ 'is-active': editor.isActive('underline') }"
            class="bubble-btn"
          >
            <Icon
              name="material-symbols:format-underlined-rounded"
              size="20"
              class="text-black dark:text-[#c9cccf]"
            />
          </button>
        </div>
        <div
          class="flex flex-row gap-1 px-2 items-center border-r dark:border-r-[#2d2d2d]"
        >
          <button
            @click="editor.chain().focus().toggleCodeBlock().run()"
            :disabled="!editor.can().chain().focus().toggleCodeBlock().run()"
            :class="{ 'is-active': editor.isActive('codeBlock') }"
            class="bubble-btn"
          >
            <Icon
              name="material-symbols:code-rounded"
              size="20"
              class="text-black dark:text-[#c9cccf]"
            />
          </button>
        </div>
      </div>
    </div>
    <TiptapEditorContent :editor="editor" />
  </div>
</template>

<script setup>
import BubbleMenu from "@tiptap/extension-bubble-menu";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import CodeBlock from "@tiptap/extension-code-block";

const postModal = usePostModal();

const editor = useEditor({
  onUpdate: ({ editor }) => {
    postModal.content = editor.getHTML();
  },
  extensions: [
    CodeBlock,
    Underline,
    TiptapStarterKit.configure({
      codeBlock: false,
    }),
    Placeholder.configure({
      emptyEditorClass: "is-editor-empty",
      placeholder: "введите текст",
    }),

    BubbleMenu.configure({
      element: document.querySelector(".menu"),
    }),
  ],

  editorProps: {
    attributes: {
      class: ` bg-transparent prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl  overflow-y-auto max-w-none focus:outline-none dark:text-[#c9cccf] text-black`,
    },
  },
});

/* ${
     postModal.isFullscreen    ? "h-2/3 w-full p-4" : "p-2 max-h-[500px] w-full"
      } */
onBeforeUnmount(() => {
  unref(editor).destroy();
});
</script>

<style scoped>
.bubble-btn {
  @apply px-2 py-1 dark:hover:bg-[#373737] hover:bg-[#e5f0ff] rounded-lg transition ease-linear duration-100;
}

.is-active {
  @apply dark:bg-[#c9c9c9] bg-[#d5e4fa] !important;
}

.is-active .icon {
  @apply dark:text-[#595959];
}
</style>
