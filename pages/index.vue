<template>
  <div
    class="flex flex-col border-l border-r border-l-[#d4d4d4] dark:border-l-[#8899A6] border-r-[#EBEEF0 ] dark:border-r-[#8899A6] h-screen"
  >
    <div
      class="flex border-b w-full border-b-[#d4d4d4] dark:border-b-[#8899A6]"
    >
      <h1
        class="text-[19px] w-full text-black dark:text-white font-bold px-5 py-3"
      >
        Home
      </h1>
    </div>
    <div
      class="flex border-b-[15px] border-b-[#d4d4d4] dark:border-b-[#8899A6]"
    >
      <PostSection />
    </div>
    <div v-for="post in posts">
      <Post :post="post" />
    </div>
  </div>
</template>

<script setup>
const posts = await $fetch("/api/get-all-posts");
</script>
