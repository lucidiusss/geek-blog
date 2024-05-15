<template>
  <div class="ml-5 btn leading-4 relative">
    <button
      ref="ignoreEl"
      @click="isDropdown = !isDropdown"
      class="flex gap-2 items-center transition hover:opacity-70"
    >
      <NuxtImg
        class="w-9 h-9 rounded-full"
        :src="
          user?.user_metadata.avatar_url
            ? user?.user_metadata.avatar_url
            : 'https://placebear.com/200/200'
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
