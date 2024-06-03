<template>
  <div
    id="comments"
    class="flex flex-col gap-4 dark:bg-[#232324] min-h-[350px] bg-[#ffffff] overflow-hidden rounded-xl px-5 py-4"
  >
    <div>
      <h1
        class="text-[20px] leading-[28px] font-medium dark:text-[#c9cccf] text-[#595959]"
      >
        {{ comments.length }}
        {{ pluralizeComments(comments.length) }}
      </h1>
    </div>
    <div class="relative">
      <textarea
        class="w-full relative min-h-[100px] p-3 pb-16 resize-none font-medium text-[17px] dark:text-[#c9cccf] dark:placeholder:text-[#595959] outline-none outline-4 outline-offset-0 dark:hover:outline-[#303031] dark:focus:outline-[#303031] border border-transparent dark:hover:border-[#324a5e] dark:focus:border-[#418af4] dark:bg-[#2c2c2d] dark:hover:bg-[#1e1d1e] dark:focus:bg-[#1e1d1e] bg-[#f5f5f5] hover:bg-white hover:border-[#b3d1ff] focus:border-[#4989e9] hover:outline-[#e6effd] focus:outline-[#e6effd] focus:bg-white text-black placeholder:text-[#646464] custom-transition rounded-xl"
        type="text"
        ref="textarea"
        v-model="input"
        placeholder="Комментарий..."
      />
      <button
        v-if="isTyping"
        @click="submit(props.post.id)"
        class="absolute bottom-6 right-6 px-3 py-2 custom-transition leading-[15px] text-[15px] font-medium rounded-lg text-white bg-[#0b5dd7] hover:bg-[#2664bf] active:bg-[#2a6dd1] dark:bg-[#418af4] dark:hover:bg-[#598fde] dark:active:bg-[#3367b5]"
      >
        <p class="w-full" v-if="!isPosting">Отправить</p>
        <Icon
          name="eos-icons:three-dots-loading"
          class="w-full"
          v-else
          size="20"
        />
      </button>
    </div>
    <div class="flex flex-col gap-10">
      <div v-for="(comment, index) in comments">
        <UIPostComment :comment="comment" :post="post" :key="index" />
      </div>
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
const userStore = useUserStore();
const { textarea, input } = useTextareaAutosize();
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

let isTyping = ref(false);
let isPosting = ref(false);
let createdComment = ref({});
let comments = ref([]);

watch(input, () => {
  if (input.value.length > 0) {
    isTyping.value = true;
  } else {
    isTyping.value = false;
  }
});

onBeforeMount(() => {
  if (props?.post?.comments) {
    comments.value = props.post.comments;
  }
});
const submit = async (postId) => {
  isPosting.value = true;
  try {
    const comment = await useFetch(`/api/create-comment/${postId}`, {
      method: "POST",
      body: {
        text: input.value,
        userId: user.value.id,
      },
    });

    createdComment = {
      ...comment.data.value,
      user: userStore.currentUser,
      createdAt: new Date(),
      likes: [],
    };

    comments.value.unshift(createdComment);
  } catch (error) {
    console.log(error);
  } finally {
    isPosting.value = false;
    input.value = "";
  }
};

const pluralizeComments = (count) => {
  const cases = [2, 0, 1, 1, 1, 2];
  const titles = ["комментарий", "комментария", "комментариев"];
  return titles[
    count % 100 > 4 && count % 100 < 20
      ? 2
      : cases[count % 10 < 5 ? count % 10 : 5]
  ];
};
</script>
