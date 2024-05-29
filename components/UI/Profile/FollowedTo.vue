<template>
  <div
    ref="targetEl"
    class="fixed w-1/4 min-h-[350px] top-1/2 left-1/2 rounded-xl dark:bg-[#232324] bg-white -translate-y-1/2 -translate-x-1/2 z-40"
  >
    <div
      class="px-10 py-5 border-b dark:border-b-[#353436] border-b-[#e5e5e5] flex flex-row justify-between items-center"
    >
      <h1 class="text-[20px] leading-[28px] text-[#595959] dark:text-[#c9cccf]">
        Подписки
      </h1>
      <button
        @click="followersModal.isFollowedTo = false"
        ref="ignoreEl"
        class="dark:hover:bg-[#2c2c2c] hover:bg-[#f0f0f0] rounded-full p-1"
      >
        <Icon
          class="text-[#595959] hover:text-black dark:text-[#969c9d] dark:hover:text-[#c9cccf]"
          name="i-heroicons:x-mark-20-solid"
          size="25"
        />
      </button>
    </div>
    <div>
      <div class="overflow-y h-full w-full">
        <div
          class="px-10 py-5 opacity-100 hover:opacity-75"
          v-for="follow in follows"
          :key="follow.id"
        >
          <NuxtLink
            class="flex flex-row items-center gap-3"
            @click="followersModal.isFollowedTo = false"
            :to="`/u/${follow.shortId}-${follow.username}`"
          >
            <div>
              <NuxtImg
                class="w-10 h-10 rounded-full border border-white/20"
                :src="`https://wsnrscwmvaliilxyaimk.supabase.co/storage/v1/object/public/avatars/${follow.profileImage}`"
              />
            </div>
            <div>
              <p
                class="text-[17px] leading-[26px] dark:text-[#c9cccf] text-black"
              >
                {{ follow.username }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const followersModal = useFollowersModal();

const props = defineProps({
  follows: {
    type: Object,
    required: true,
  },
});

const targetEl = ref(null);
const ignoreEl = ref(null);

onClickOutside(
  targetEl,
  () => {
    followersModal.isFollowedTo = false;
  },
  { ignore: [ignoreEl] }
);
</script>
