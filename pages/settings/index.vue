<template>
  <div class="dark:bg-[#232324] bg-[#ffffff] overflow-hidden rounded-xl">
    <div class="border-b w-full p-4 dark:border-[#353436]">
      <h1
        class="font-medium text-[17px] leading-[26px] text-black dark:text-[#c9cccf]"
      >
        Настройки
      </h1>
    </div>

    <nav class="p-2 flex flex-col w-full">
      <div class="w-full" v-for="link in links">
        <NuxtLink
          class="flex flex-row p-2 rounded-xl gap-5 items-center dark:hover:bg-[#313131] hover:bg-[#f2f2f2]"
          :to="link.to"
        >
          <Icon
            size="25"
            class="text-black dark:text-[#c9cccf]"
            :name="link.icon"
          />
          <div class="flex flex-col">
            <h1
              class="text-black font-normal text-[17px] leading-[26px] dark:text-[#c9cccf]"
            >
              {{ link.name }}
            </h1>
            <p
              class="text-[#595959] font-normal text-[15px] leading-[22px] dark:text-[#969c9d]"
            >
              {{ link.description }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </nav>
  </div>
</template>

<script setup>
const links = [
  {
    name: "Профиль",
    description: "Аватарка, Описание",
    icon: "ic:outline-person-outline",
    to: "/settings/profile",
  },
  {
    name: "Ленты",
    description: "Настройки лент, Фильтрация, Заблокированные",
    icon: "material-symbols:feed-outline-rounded",
    to: "/settings/feed",
  },
  {
    name: "Основные",
    description: "Безопасность ,Удаление аккаунта",
    icon: "solar:settings-outline",
    to: "/settings/account",
  },
  {
    name: "Уведомления",
    description: "Уведомления, Письма",
    icon: "mdi:bell-outline",
    to: "/settings/feed",
  },
];
</script>
