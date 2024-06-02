<template>
  <nav class="flex w-full p-1 flex-row justify-center gap-32">
    <NuxtLink to="/" class="flex items-center">
      <Icon
        name="material-symbols:home-outline-rounded"
        class="sm:w-9 sm:h-9 dark:text-[#c9cccf] text-black"
      />
    </NuxtLink>
    <NuxtLink to="/" class="flex items-center">
      <Icon
        name="ph:magnifying-glass-bold"
        class="sm:w-9 sm:h-9 dark:text-[#c9cccf] text-black"
      />
    </NuxtLink>
    <NuxtLink to="/" class="flex items-center">
      <Icon
        name="mdi:bell-outline"
        class="sm:w-9 sm:h-9 dark:text-[#c9cccf] text-black"
      />
    </NuxtLink>
    <NuxtLink
      :to="`/u/${currentUser?.shortId}-${currentUser?.username}`"
      class="flex items-center"
    >
      <NuxtImg
        :src="`https://wsnrscwmvaliilxyaimk.supabase.co/storage/v1/object/public/avatars/${currentUser?.profileImage}`"
        class="sm:w-9 sm:h-9 rounded-full"
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
.nuxt-link-exact-active {
  @apply bg-red-500;
}
</style>
