<template>
  <div>
    <div class="p-4 flex flex-row gap-2">
      <div class="h-full w-[49px]">
        <NuxtImg class="w-[49px] h-[49px] rounded-full" :src="post.image" />
      </div>
      <div>
        <div class="flex flex-row gap-1">
          <h1 class="font-bold text-black text-[15px]">{{ post.name }}</h1>
          <p class="font-medium text-[15px] text-[#5B7083]">
            @{{ post.username }}
          </p>
          <span class="text-[#5B7083] text-[15px]">•</span>
          <p class="text-[#5B7083] text-[15px] font-medium">{{ timeAgo }}</p>
        </div>
        <div class="flex gap-2">
          <p class="text-black text-[15px] font-medium">{{ post.text }}</p>
          <div v-if="post.picture">
            <NuxtImg class="w-full rounded-lg" :src="post.picture" />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["post"]);
const timeAgo = useTimeAgo(props.post.createdAt);
</script>
