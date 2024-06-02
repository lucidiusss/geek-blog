<template>
  <div
    class="w-full relative h-[500px] dark:bg-[#232324] bg-[#ffffff] rounded-xl"
  >
    <div
      class="w-full relative h-[45%] dark:bg-[#353436] bg-[#e5e5e5] rounded-t-xl"
    ></div>
    <div class="p-5">
      <div
        class="flex flex-row items-end justify-between absolute top-[35%] left-5"
      >
        <USkeleton
          class="w-24 h-24 rounded-full dark:bg-[#353436] bg-[#f1f1f1] border-2 border-white dark:border-[#232324]"
        />
      </div>
      <div class="mt-10">
        <div class="flex flex-col gap-5">
          <USkeleton
            class="w-14 h-3 leading-[30px] rounded-full dark:bg-[#353436] bg-[#f1f1f1]"
          />
          <USkeleton
            class="w-36 h-3 rounded-full leading-[22px] dark:bg-[#353436] bg-[#f1f1f1]"
          />
          <USkeleton
            class="w-48 h-3 rounded-full leading-[22px] dark:bg-[#353436] bg-[#f1f1f1]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
