<template>
  <div
    class="dark:bg-[#1f1f1f] bg-white shadow-xl border dark:border-[#2f2f2f] text-black border-[#dddddd] z-10 rounded-xl p-1 dark:text-[#c9cccf]"
  >
    <UIPostDropdownAuthor :post="props.post" v-if="post.userId === user?.id" />
    <UIPostDropdownUser :post="props.post" v-else />
  </div>
</template>

<script setup>
const user = useSupabaseUser();

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});
</script>
