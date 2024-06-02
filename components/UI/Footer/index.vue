<template>
  <nav class="flex w-full p-1 flex-row justify-center sm:gap-32 xs:gap-12">
    <NuxtLink to="/" class="flex items-center">
      <Icon
        name="material-symbols:home-outline-rounded"
        class="sm:w-9 sm:h-9 xs:h-9 xs:w-9 dark:text-[#c9cccf] text-black"
      />
    </NuxtLink>
    <NuxtLink to="/discovery" class="flex items-center">
      <Icon
        name="ph:magnifying-glass-bold"
        class="sm:w-9 sm:h-9 xs:h-9 xs:w-9 dark:text-[#c9cccf] text-black"
      />
    </NuxtLink>
    <NuxtLink to="/notifications" class="flex items-center">
      <Icon
        name="mdi:bell-outline"
        class="sm:w-9 sm:h-9 xs:h-9 xs:w-9 dark:text-[#c9cccf] text-black"
      />
    </NuxtLink>
    <NuxtLink
      :to="`/u/${currentUser?.shortId}-${currentUser?.username}`"
      class="flex items-center"
    >
      <NuxtImg
        :src="`https://wsnrscwmvaliilxyaimk.supabase.co/storage/v1/object/public/avatars/${currentUser?.profileImage}`"
        class="sm:w-9 sm:h-9 xs:h-9 xs:w-9 rounded-full"
      />
    </NuxtLink>
  </nav>
</template>

<script setup>
const props = defineProps({
  currentUser: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.router-link-active {
  svg {
    @apply text-[#197aba] dark:text-[#1793e6] border-none dark:border-none;
  }

  img {
    @apply border-2 border-[#197aba] dark:border-[#1793e6];
  }
}
</style>
