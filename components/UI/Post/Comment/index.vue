<template>
  <div>
    <div class="flex flex-row items-center gap-2">
      <NuxtLink :to="`/u/${comment.user?.shortId}-${comment?.user?.username}`">
        <NuxtImg
          :src="`https://wsnrscwmvaliilxyaimk.supabase.co/storage/v1/object/public/avatars/${comment?.user?.profileImage}`"
          class="w-9 h-9 rounded-full"
        />
      </NuxtLink>
      <div class="flex flex-col">
        <NuxtLink
          class="dark:hover:text-[#9b9d9f] hover:text-[#474747]"
          :to="`/u/${comment.user?.shortId}-${comment?.user?.username}`"
          >{{ comment?.user?.username }}</NuxtLink
        >
        <span class="text-[12px] font-medium dark:text-[#969c9d]">{{
          timeAgo
        }}</span>
      </div>
    </div>
    <div class="mt-3">
      <p class="text-[17px] leading-[26px] dark:text-[#c9cccf] text-black">
        {{ comment?.text }}
      </p>
    </div>
    <div class="flex flex-row gap-4 items-center mt-3">
      <div>
        <div v-if="!isLiked">
          <button
            :disabled="isLiking"
            @click="likeComment()"
            class="flex flex-row gap-1 items-center text-[15px] leading-[22px] text-[#595959] dark:text-[#c9cccf] dark:hover:text-[#d6333e] hover:text-[#f0303d]"
          >
            <Icon
              class="w-7 h-7 p-1 rounded-full dark:hover:bg-[#3a292b] hover:bg-[#fae9ea]"
              name="material-symbols:favorite-outline-rounded"
            />

            <span>{{ comment?.likes?.length }} </span>
          </button>
        </div>
        <div v-if="isLiked">
          <button
            :disabled="isLiking"
            @click="unLikeComment()"
            class="flex flex-row gap-1 items-center text-[15px] leading-[22px] text-[#595959] dark:text-[#c9cccf] dark:hover:text-[#d6333e] hover:text-[#f0303d]"
          >
            <Icon
              class="w-7 h-7 p-1 rounded-full dark:hover:bg-[#3a292b] hover:bg-[#fae9ea] text-[#d6333e] dark:text-[#f0303d]"
              name="material-symbols:favorite-rounded"
            />

            <span class="text-[#d6333e] dark:text-[#f0303d]"
              >{{ comment?.likes?.length }}
            </span>
          </button>
        </div>
      </div>
      <div>
        <button
          class="text-[15px] leading-[22px] text-[#595959] dark:text-[#c9cccf] dark:hover:text-[#767b7b] hover:text-[#878787]"
        >
          Ответить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
  post: {
    type: Object,
    required: true,
  },
});

let isLiked = ref(false);
let isLiking = ref(false);

onMounted(() => {
  if (props.comment?.likes) {
    props.comment?.likes.forEach((like) => {
      if (like.userId === user.value.id) {
        isLiked.value = true;
      }
    });
  }
});

const likeComment = async () => {
  isLiking.value = true;
  isLiked.value = true;
  props.comment.likes.length += 1;

  const id = props.comment.id;

  try {
    await $fetch(`/api/like-comment/${id}`, {
      method: "POST",
      body: {
        userId: user.value.id,
        postId: props.post.id,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    isLiking.value = false;
  }
};

const unLikeComment = async () => {
  isLiked.value = false;
  isLiking.value = true;
  props.comment.likes.length -= 1;
  const id = props.comment.id;

  try {
    await $fetch(`/api/unlike-comment/${id}`, {
      method: "DELETE",
      body: {
        userId: user.value.id,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    isLiking.value = false;
  }
};

const timeAgo = useTimeAgo(props?.comment?.createdAt);
</script>
