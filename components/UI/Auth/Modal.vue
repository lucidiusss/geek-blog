<template>
  <div class="w-full h-screen fixed top-0 left-0 z-20">
    <UIAuthSignIn v-if="!authModal.isSignUp" />
    <UIAuthSignUp v-else />
  </div>
</template>

<script setup>
const authModal = useAuthModal();
</script>
