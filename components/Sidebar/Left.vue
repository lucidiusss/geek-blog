<template>
  <div class="flex flex-col w-full gap-8 h-screen">
    <div class="ml-10">
      <NuxtLink to="/">
        <Icon
          name="mdi:twitter"
          size="30"
          :color="colorMode.value === 'dark' ? '#FFF' : '#1DA1F2'"
        />
      </NuxtLink>
    </div>
    <div>
      <nav class="ml-10">
        <ul class="w-44" v-for="link in links">
          <NuxtLink
            class="custom-transition text-black dark:text-white"
            :to="link.path"
          >
            <div class="flex gap-4 mb-5">
              <Icon size="30" :name="link.icon" class="custom-transition" />

              <li class="text-[19px] font-bold">
                {{ link.name }}
              </li>
            </div>
          </NuxtLink>
        </ul>
      </nav>
    </div>
    <UITweetBtn />
    <div class="mt-auto ml-10 flex flex-col gap-4">
      <UIColorSwitchBtn />
      <UIProfile />
    </div>
  </div>
</template>

<script setup>
const colorMode = useColorMode();
const user = useSupabaseUser();

const links = [
  {
    name: "Home",
    icon: "mdi:home",
    path: "/",
  },
  {
    name: "Explore",
    icon: "prime:hashtag",
    path: "/explore",
  },
  {
    name: "Notifications",
    icon: "material-symbols:notifications-outline-rounded",
    path: "/notifications",
  },
  {
    name: "Messages",
    icon: "material-symbols:mail-outline-rounded",
    path: "/messages",
  },
  {
    name: "Bookmarks",
    icon: "material-symbols:bookmark-outline-rounded",
    path: "/bookmarks",
  },
  {
    name: "Lists",
    icon: "solar:notebook-minimalistic-outline",
    path: "/lists",
  },
  {
    name: "Profile",
    icon: "mdi:account",
    path: `/profile/${user.value?.user_metadata.user_name}`,
  },
  {
    name: "More",
    icon: "mdi:dots-horizontal-circle-outline",
    path: "/more",
  },
];
</script>

<style scoped>
.router-link-exact-active {
  @apply text-[#1DA1F2] !important;
}
</style>
