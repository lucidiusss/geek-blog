<template>
  <div class="flex flex-row gap-3 items-center justify-between">
    <div>
      <button>
        <Icon
          name="mdi:bell-outline"
          class="text-black hover:text-[#3c4347] dark:text-white dark:hover:text-[#c3c3c4] custom-transition"
          size="30"
        />
      </button>
    </div>
    <div class="flex items-center gap-2">
      <button
        @click="
          !user ? (authModal.isOpen = true) : (postModal.isModalOpen = true)
        "
        class="dark:text-[#c9cccf] font-medium leading-4 text-black px-3 py-2 border dark:border-transparent border-[#f0f0f0] bg-white hover:shadow custom-transition rounded-full dark:bg-[#2c2c2c] text-[17px] dark:hover:border-[#474747]"
      >
        <Icon
          size="25"
          class="text-black dark:text-[#c9cccf]"
          name="material-symbols:edit-outline-rounded"
        />
        Написать
      </button>
    </div>
    <div>
      <button
        v-if="!user"
        @click="authModal.isOpen = true"
        class="py-2 px-3 custom-transition rounded-full font-medium dark:text-[#c9cccf] text-white text-[17px] bg-[#0b5dd7] hover:bg-[#2664bf] active:bg-[#2a6dd1] dark:bg-[#418af4] dark:hover:bg-[#598fde]"
      >
        Войти
      </button>
      <div v-else>
        <UIProfileUser :currentUser="props.currentUser" ref="ignoreEl" />
      </div>
    </div>
  </div>

  <Teleport to="body">
    <UIAuthBackground v-show="authModal.isOpen || postModal.isModalOpen" />
    <TransitionFade>
      <UIAuthModal v-if="authModal.isOpen" />
      <UIPostModal
        :currentUser="props.currentUser"
        v-if="postModal.isModalOpen && user"
      />
    </TransitionFade>
  </Teleport>
</template>

<script setup>
const authModal = useAuthModal();
const postModal = usePostModal();
const user = useSupabaseUser();

const props = defineProps({
  currentUser: {
    type: Object,
    required: true,
  },
});
</script>
