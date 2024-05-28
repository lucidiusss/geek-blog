<template>
  <div
    id="#comments"
    class="flex flex-col gap-4 dark:bg-[#232324] min-h-[350px] bg-[#ffffff] overflow-hidden rounded-xl px-5 py-4"
  >
    <div>
      <h1
        class="text-[20px] leading-[28px] font-medium dark:text-[#c9cccf] text-[#595959]"
      >
        {{ props?.post?.comments?.length }} Комментариев
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
        <p v-if="!isPosting">Отправить</p>
        <Icon name="eos-icons:three-dots-loading" v-else size="20" />
      </button>
    </div>
    <div class="flex flex-col gap-10">
      <div v-for="(comment, index) in props.post.comments">
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
let createdComment = ref(null);

watch(input, () => {
  if (input.value.length > 0) {
    isTyping.value = true;
  } else {
    isTyping.value = false;
  }
});

const submit = async (postId) => {
  isPosting.value = true;
  try {
    const { error, data } = await useFetch(`/api/create-comment/${postId}`, {
      method: "POST",
      body: {
        text: input.value,
        userId: user.value.id,
      },
    });

    createdComment = {
      likes: [],
      user: userStore.currentUser,
      ...data.value,
    };
    props.post.comments = [createdComment, ...props.post.comments];

    if (error.value) {
      throw error.value;
    }
  } catch (error) {
    console.log(error);
  } finally {
    isPosting.value = false;
    input.value = "";
  }
};

console.log(userStore.currentUser);
</script>
