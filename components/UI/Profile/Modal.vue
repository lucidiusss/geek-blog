<template>
  <div
    v-motion-fade
    ref="target"
    class="absolute bottom-12 right-0 bg-black rounded-md"
  >
    <button @click="logOut()" class="text-red-500 px-6 py-1">logout</button>
  </div>
</template>

<script setup>
const client = useSupabaseClient();
const emit = defineEmits(["close"]);
const target = ref(null);
onClickOutside(target, () => emit("close"));

const logOut = async () => {
  try {
    await client.auth.signOut();
  } catch (err) {
    console.log(err);
  } finally {
    navigateTo("/auth");
  }
};
</script>
