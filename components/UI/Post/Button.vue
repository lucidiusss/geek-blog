<template>
  <div>
    <button
      class="dark:hover:bg-[#333333] hover:bg-[#f0f0f0] p-1 rounded-full custom-transition"
    >
      <ClientOnly>
        <Icon
          :name="props.icon"
          size="24"
          class="dark:text-[#969c9d] text-[#595959]"
        />
      </ClientOnly>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
});
</script>
