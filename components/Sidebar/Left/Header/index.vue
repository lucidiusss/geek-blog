<template>
  <nav>
    <ul class="dark:text-[#c9cccf] text-black text-[17px]">
      <NuxtLink to="/popular">
        <SidebarLeftHeaderLink icon="ph:fire-simple-bold" name="Популярное" />
      </NuxtLink>
      <NuxtLink to="/new">
        <SidebarLeftHeaderLink icon="iconamoon:clock" name="Свежее" />
      </NuxtLink>
      <NuxtLink to="/my">
        <SidebarLeftHeaderLink
          icon="material-symbols:feed-outline-rounded"
          name="Моя лента"
        />
      </NuxtLink>
    </ul>
  </nav>
</template>

<script setup></script>

<style scoped>
.router-link-exact-active {
  @apply text-[#0b5dd7];
}
</style>
