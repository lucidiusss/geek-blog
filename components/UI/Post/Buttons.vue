<template>
  <div class="w-full flex flex-row gap-4 items-center">
    <div v-if="!isLiked">
      <button
        :disabled="isLiking"
        @click="likePost()"
        class="flex flex-row gap-1 items-center text-[15px] leading-[22px] text-[#595959] dark:text-[#c9cccf] dark:hover:text-[#d6333e] hover:text-[#f0303d]"
      >
        <Icon
          class="w-7 h-7 p-1 rounded-full dark:hover:bg-[#3a292b] hover:bg-[#fae9ea]"
          name="material-symbols:favorite-outline-rounded"
        />

        <span>{{ post?.likes?.length }} </span>
      </button>
    </div>
    <div v-if="isLiked">
      <button
        :disabled="isLiking"
        @click="unLikePost()"
        class="flex flex-row gap-1 items-center text-[15px] leading-[22px] text-[#595959] dark:text-[#c9cccf] dark:hover:text-[#d6333e] hover:text-[#f0303d]"
      >
        <Icon
          class="w-7 h-7 p-1 rounded-full dark:hover:bg-[#3a292b] hover:bg-[#fae9ea] text-[#d6333e] dark:text-[#f0303d]"
          name="material-symbols:favorite-rounded"
        />

        <span class="text-[#d6333e] dark:text-[#f0303d]"
          >{{ post?.likes?.length }}
        </span>
      </button>
    </div>
    <NuxtLink
      :to="{ path: `/p/${post.id}`, hash: '#comments' }"
      class="flex cursor-pointer flex-row gap-1 items-center text-[15px] leading-[22px] text-[#595959] dark:text-[#c9cccf] hover:text-[#0b5dd7] dark:hover:text-[#396eba]"
    >
      <ClientOnly>
        <Icon
          class="w-7 h-7 p-1 rounded-full hover:bg-[#e6effd] dark:hover:bg-[#252e3d]"
          name="material-symbols:chat-bubble-outline-rounded"
        />
      </ClientOnly>
      <span>{{ post?.comments?.length }}</span>
    </NuxtLink>
    <div class="flex flex-row items-center">
      <div v-if="isSaved">
        <button
          :disabled="isSaving"
          @click="unSavePost(props.post.id)"
          class="flex flex-row gap-1 items-center text-[15px] leading-[22px] text-[#595959] dark:text-[#c9cccf] hover:text-[#0b5dd7] dark:hover:text-[#396eba]"
        >
          <ClientOnly>
            <Icon
              class="w-7 h-7 p-1 rounded-full hover:bg-[#e6effd] text-[#0b5dd7] dark:text-[#396eba] dark:hover:bg-[#252e3d]"
              name="material-symbols:bookmark-rounded"
            />
          </ClientOnly>
        </button>
      </div>
      <div v-if="!isSaved">
        <button
          :disabled="isSaving"
          @click="savePost(props.post.id)"
          class="flex flex-row gap-1 items-center text-[15px] leading-[22px] text-[#595959] dark:text-[#c9cccf] hover:text-[#0b5dd7] dark:hover:text-[#396eba]"
        >
          <ClientOnly>
            <Icon
              class="w-7 h-7 p-1 rounded-full hover:bg-[#e6effd] dark:hover:bg-[#252e3d]"
              name="material-symbols:bookmark-outline-rounded"
            />
          </ClientOnly>
        </button>
      </div>
      <span :class="isSaved ? 'text-[#0b5dd7] dark:text-[#396eba]' : ''">{{
        post?.bookmarks?.length
      }}</span>
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser();

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

let isSaved = ref(false);
let isSaving = ref(false);
let isLiked = ref(false);
let isLiking = ref(false);

onMounted(() => {
  if (props.post?.likes) {
    props.post?.likes.forEach((like) => {
      if (like.userId === user.value.id) {
        isLiked.value = true;
      }
    });
  }
});

onMounted(() => {
  if (props.post?.bookmarks) {
    props.post?.bookmarks.forEach((bookmark) => {
      if (bookmark.userId === user.value.id) {
        isSaved.value = true;
      }
    });
  }
});

const likePost = async () => {
  isLiking.value = true;
  isLiked.value = true;
  props.post.likes.length += 1;

  try {
    await $fetch("/api/like-post", {
      method: "POST",
      body: {
        postId: props.post.id,
        userId: user.value.id,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    isLiking.value = false;
  }
};

const unLikePost = async () => {
  isLiked.value = false;
  isLiking.value = true;
  props.post.likes.length -= 1;
  try {
    await $fetch(`/api/unlike-post`, {
      method: "DELETE",
      body: {
        postId: props.post.id,
        userId: user.value.id,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    isLiking.value = false;
  }
};

const savePost = async (postId) => {
  isSaving.value = true;
  isSaved.value = true;
  props.post.bookmarks.length += 1;
  try {
    await $fetch(`/api/save-post/${postId}`, {
      method: "POST",
      body: {
        userId: user.value.id,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    isSaving.value = false;
  }
};

const unSavePost = async (postId) => {
  isSaving.value = true;
  isSaved.value = false;
  props.post.bookmarks.length -= 1;

  try {
    await $fetch(`/api/unsave-post/${postId}`, {
      method: "DELETE",
      body: {
        userId: user.value.id,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    isSaving.value = false;
  }
};
</script>
