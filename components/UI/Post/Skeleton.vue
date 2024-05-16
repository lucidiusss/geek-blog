<template>
  <div
    class="relative dark:bg-[#232324] bg-[#ffffff] overflow-hidden rounded-xl p-6"
  >
    <div class="flex flex-row items-center justify-between gap-2">
      <div v-motion-fade class="flex flex-row items-center gap-2">
        <USkeleton class="w-9 h-9 rounded-full dark:bg-[#353436]" />
        <USkeleton class="w-32 h-4 rounded-full dark:bg-[#353436]" />
        <USkeleton class="w-10 h-3 rounded-full dark:bg-[#353436]" />
        <NuxtLink>
          <span
            class="text-[12px] font-medium dark:text-[#969c9d] dark:hover:text-[#767b7b]"
          ></span>
        </NuxtLink>
      </div>
    </div>
    <div class="my-8 flex flex-col gap-3">
      <USkeleton class="w-3/4 h-3 rounded-full dark:bg-[#353436]" />
      <USkeleton class="w-2/4 h-3 rounded-full dark:bg-[#353436]" />
      <USkeleton class="w-3/4 h-3 rounded-full dark:bg-[#353436]" />
      <USkeleton class="w-4/4 h-3 rounded-full dark:bg-[#353436]" />
      <USkeleton class="w-2/4 h-3 rounded-full dark:bg-[#353436]" />
      <USkeleton class="w-3/4 h-3 rounded-full dark:bg-[#353436]" />
      <USkeleton class="w-2/4 h-3 rounded-full dark:bg-[#353436]" />
      <USkeleton class="w-1/4 h-3 rounded-full dark:bg-[#353436]" />
    </div>
    <div class="mt-5 flex justify-between w-full">
      <div class="flex flex-row gap-3">
        <USkeleton class="w-6 h-6 rounded-full dark:bg-[#353436]" />
        <USkeleton class="w-6 h-6 rounded-full dark:bg-[#353436]" />
        <USkeleton class="w-6 h-6 rounded-full dark:bg-[#353436]" />
      </div>
      <div>
        <USkeleton class="w-6 h-6 rounded-full dark:bg-[#353436]" />
      </div>
    </div>
  </div>
</template>
