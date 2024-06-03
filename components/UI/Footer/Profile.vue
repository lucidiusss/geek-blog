<template>
  <nav
    ref="targetEl"
    class="dark:bg-[#1f1f1f] bg-white leading-4 w-screen h-screen p-2 dark:text-[#c9cccf] text-black absolute bottom-10 right-0"
  >
    <h1 class="text-[17px] select-none ml-3 my-2">Мой профиль</h1>
    <ul class="select-none mb-2">
      <NuxtLink
        @click="profileModal.isModalOpen = false"
        :to="`/u/${currentUser?.shortId}-${currentUser?.username}`"
      >
        <li
          class="dark:hover:bg-[#313131] hover:bg-[#f2f2f2] font-medium cursor-pointer p-3 rounded-xl custom-transition"
        >
          <div class="flex gap-2 items-center">
            <USkeleton
              v-if="!userStore.isUserLoaded"
              class="w-9 h-9 rounded-full dark:bg-[#353436] bg-[#f1f1f1]"
            />
            <NuxtImg
              v-else
              v-motion-fade
              class="w-9 h-9 rounded-full border dark:border-[#2f2f2f]"
              :src="`https://wsnrscwmvaliilxyaimk.supabase.co/storage/v1/object/public/avatars/${currentUser?.profileImage}`"
            />
            <div>
              <h1 class="font-bold">
                {{ currentUser?.username }}
              </h1>
            </div>
          </div>
        </li>
      </NuxtLink>
      <li
        class="dark:hover:bg-[#313131] hover:bg-[#f2f2f2] font-medium cursor-pointer p-3 rounded-xl custom-transition"
      >
        <div class="flex items-center gap-2">
          <Icon
            size="25"
            class="text-black dark:text-[#c9cccf]"
            name="material-symbols:edit-outline-rounded"
          />
          <p>Черновики</p>
        </div>
      </li>
      <li
        class="dark:hover:bg-[#313131] hover:bg-[#f2f2f2] font-medium cursor-pointer p-3 rounded-xl custom-transition"
      >
        <NuxtLink to="/bookmarks" @click="profileModal.isModalOpen = false">
          <div class="flex items-center gap-2">
            <Icon
              size="25"
              class="text-black dark:text-[#c9cccf]"
              name="material-symbols:bookmark-outline-rounded"
            />
            <p>Закладки</p>
          </div>
        </NuxtLink>
      </li>

      <li
        class="dark:hover:bg-[#313131] hover:bg-[#f2f2f2] font-medium cursor-pointer p-3 rounded-xl custom-transition"
      >
        <div class="flex relative items-center w-full">
          <NuxtLink
            @click="profileModal.isModalOpen = false"
            class="w-full"
            to="/settings"
          >
            <div class="flex items-center gap-2 w-full">
              <Icon
                size="25"
                class="text-black dark:text-[#c9cccf]"
                name="solar:settings-outline"
              />
              <p>Настройки</p>
            </div>
          </NuxtLink>
          <button ref="ignoreEl" @click="isDropdown = !isDropdown">
            <ClientOnly>
              <Icon
                class="dark:text-[#c9cccf]"
                name="codicon:color-mode"
                size="20"
                :class="
                  colorMode.preference === 'dark'
                    ? 'text-[#c9cccf]'
                    : 'text-black'
                "
              />
            </ClientOnly>
          </button>
          <UIProfileModalColorModal v-if="isDropdown" ref="target" />
        </div>
      </li>
      <li
        @click="
          signOut();
          profileModal.isModalOpen = false;
        "
        class="dark:hover:bg-[#313131] hover:bg-[#f2f2f2] font-medium cursor-pointer p-3 rounded-xl custom-transition"
      >
        <div class="flex items-center gap-2">
          <Icon
            size="25"
            class="text-black dark:text-[#c9cccf]"
            name="fluent:arrow-exit-20-filled"
          />
          <p>Выход</p>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const user = useSupabaseUser();
const userStore = useUserStore();
const client = useSupabaseClient();
const colorMode = useColorMode();
const profileModal = useProfileModal();
const target = ref(null);
let isDropdown = ref(false);
const ignoreEl = ref(null);

const props = defineProps({
  currentUser: {
    type: Object,
    required: true,
  },
});

const signOut = async () => {
  userStore.isLoading = true;
  try {
    await client.auth.signOut();
    userStore.currentUser = {};
  } catch (err) {
    console.log(err);
  } finally {
    userStore.isLoading = false;
    user.value = null;
  }
};
</script>
