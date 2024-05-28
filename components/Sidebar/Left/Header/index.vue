<template>
  <nav>
    <ul class="dark:text-[#c9cccf] text-black text-[17px]">
      <NuxtLink
        class="dark:hover:bg-[#232324] mb-3 flex flex-row p-3 rounded-xl custom-transition gap-2"
        to="/popular"
      >
        <ClientOnly><Icon name="ph:fire-simple-bold" size="24" /></ClientOnly>
        <p class="topic">Популярное</p>
      </NuxtLink>
      <NuxtLink
        class="dark:hover:bg-[#232324] mb-3 flex flex-row p-3 rounded-xl custom-transition gap-2"
        to="/new"
      >
        <ClientOnly>
          <Icon name="iconamoon:clock" size="24" />
        </ClientOnly>
        <p class="topic">Свежее</p>
      </NuxtLink>
      <NuxtLink
        class="dark:hover:bg-[#232324] flex flex-row p-3 rounded-xl custom-transition gap-2"
        to="/my"
      >
        <ClientOnly>
          <Icon name="material-symbols:feed-outline-rounded" size="24" />
        </ClientOnly>
        <p class="topic">Моя лента</p>
      </NuxtLink>
    </ul>
  </nav>
</template>

<script setup></script>

<style scoped>
.topic {
  @apply dark:text-[#c9cccf] text-black !important;
}
.router-link-exact-active {
  @apply text-[#0b5dd7] dark:bg-[#232324] bg-white;
}
</style>
