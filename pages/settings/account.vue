<template>
  <div
    class="dark:bg-[#232324] bg-[#ffffff] min-h-[350px] overflow-hidden rounded-xl"
  >
    <div
      class="border-b p-4 relative gap-5 flex flex-row items-center w-full dark:border-[#353436]"
    >
      <NuxtLink to="/settings">
        <div
          class="hover:bg-[#f0f0f0] top-1/2 -translate-y-1/2 left-4 absolute p-1 dark:hover:bg-[#333333] rounded-full"
        >
          <Icon
            name="ph:arrow-left"
            size="25"
            class="text-black dark:text-[#c9cccf]"
          />
        </div>
      </NuxtLink>
      <h1
        class="font-medium text-[17px] leading-[26px] ml-5 text-black dark:text-[#c9cccf]"
      >
        Аккаунт
      </h1>
    </div>
  </div>
</template>

<script setup></script>
