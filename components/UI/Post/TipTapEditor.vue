<template>
  <div>
    <div
      :class="postModal.isFullscreen ? 'block' : 'hidden'"
      v-if="editor"
      class="text-white"
    >
      <!--  <TiptapBubbleMenu
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

          <button
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
          </button>
        </div>
      </TiptapBubbleMenu> -->
      <div
        class="flex flex-row mt-5 w-full xs:flex-wrap justify-center mx-auto gap-1 items-center dark:bg-[#1f1f1f] p-2 rounded-xl border border-1 dark:border-[#2d2d2d] shadow-xl mb-14"
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
          <button
            @click="editor.chain().focus().toggleBlockquote().run()"
            :disabled="!editor.can().chain().focus().toggleBlockquote().run()"
            :class="{ 'is-active': editor.isActive('blockquote') }"
            class="bubble-btn"
          >
            <Icon
              name="material-symbols:format-quote-rounded"
              size="20"
              class="text-black dark:text-[#c9cccf]"
            />
          </button>
        </div>
        <div class="flex flex-row gap-1 px-2 items-center">
          <button
            @click="editor.chain().focus().toggleBulletList().run()"
            :disabled="!editor.can().chain().focus().toggleBulletList().run()"
            :class="{ 'is-active': editor.isActive('bulletlist') }"
            class="bubble-btn"
          >
            <Icon
              name="material-symbols:format-list-bulleted-rounded"
              size="20"
              class="text-black dark:text-[#c9cccf]"
            />
          </button>
          <button
            @click="editor.chain().focus().toggleOrderedList().run()"
            :disabled="!editor.can().chain().focus().toggleOrderedList().run()"
            :class="{ 'is-active': editor.isActive('orderedlist') }"
            class="bubble-btn"
          >
            <Icon
              name="ci:list-ordered"
              size="20"
              class="text-black dark:text-[#c9cccf]"
            />
          </button>
          <button
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
            class="bubble-btn"
          >
            <Icon
              name="lucide:heading"
              size="20"
              class="text-black dark:text-[#c9cccf]"
            />
          </button>
          <button
            @click="editor.chain().focus().setParagraph().run()"
            :class="{ 'is-active': editor.isActive('paragraph') }"
            class="bubble-btn"
          >
            <Icon
              name="ph:text-align-left-light"
              size="20"
              class="text-black dark:text-[#c9cccf]"
            />
          </button>
          <button
            @click="editor.chain().focus().setHorizontalRule().run()"
            :disabled="!editor.can().chain().focus().setHorizontalRule().run()"
            :class="{ 'is-active': editor.isActive('horizontalrule') }"
            class="bubble-btn"
          >
            <Icon
              name="material-symbols:horizontal-rule"
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
import Link from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-link";

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
      class:
        "bg-transparent prose-styles h-2/3 w-full p-4 overflow-y-scroll max-h-[500px] max-w-none focus:outline-none",
    },
  },
});

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
