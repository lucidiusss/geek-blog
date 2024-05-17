<template>
  <div class="ml-5 btn leading-4 relative">
    <button
      ref="ignoreEl"
      @click="isDropdown = !isDropdown"
      class="flex gap-2 items-center transition hover:opacity-70"
    >
      <NuxtImg
        v-motion-fade
        class="w-9 h-9 rounded-full custom-transition"
        :src="
          user?.user_metadata.avatar_url
            ? user?.user_metadata.avatar_url
            : `https://ui-avatars.com/api/?name=${user.user_metadata.user_name}`
        "
      />
      <Icon class="dark:text-[#c9cccf]" size="15" name="lucide:chevron-down" />
    </button>
  </div>
  <UIProfileModal ref="target" v-if="isDropdown && user" />
</template>

<script setup>
const user = useSupabaseUser();
const userModal = useUserModal();

const target = ref(null);
const ignoreEl = ref(null);
let isDropdown = ref(false);

onClickOutside(
  target,
  () => {
    isDropdown.value = false;
  },
  { ignore: [ignoreEl] }
);
</script>
