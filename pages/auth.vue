<template>
  <div class="w-full flex flex-col items-center">
    <div class="flex justify-center">
      <div>
        <Icon name="mdi:twitter" size="30" />
      </div>
    </div>

    <div class="pt-5 space-y-6 items-center">
      <button @click="signIn()">Login via Github</button>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const user = useSupabaseUser();
const userStore = useUserStore();
const client = useSupabaseClient();

const signIn = async () => {
  try {
    const { data, error } = await client.auth.signInWithOAuth({
      provider: "github",
    });
  } catch (err) {
    console.log(err);
  }
};
</script>
