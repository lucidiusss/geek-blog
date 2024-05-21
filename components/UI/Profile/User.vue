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
          props.currentUser.profileImage
            ? `https://wsnrscwmvaliilxyaimk.supabase.co/storage/v1/object/public/avatars/${props.currentUser.profileImage}`
            : `https://ui-avatars.com/api/?name=${props.currentUser.username}`
        "
      />
      <Icon class="dark:text-[#c9cccf]" size="15" name="lucide:chevron-down" />
    </button>
  </div>
  <UIProfileModal
    :currentUser="props.currentUser"
    ref="target"
    v-if="isDropdown && user"
  />
</template>

<script setup>
const user = useSupabaseUser();
const userStore = useUserStore();

const target = ref(null);
const ignoreEl = ref(null);
let isDropdown = ref(false);

const props = defineProps({
  currentUser: {
    type: Object,
    required: true,
  },
});

onClickOutside(
  target,
  () => {
    isDropdown.value = false;
  },
  { ignore: [ignoreEl] }
);
</script>
