<template>
  <div
    class="fixed top-0 left-0 z-10 dark:bg-[#26282b] bg-[#d9f0ff] h-[60px] w-full"
  >
    <div
      class="grid grid-cols-12 gap-6 justify-center mx-auto lg:max-w-[1280px] h-[60px]"
    >
      <div class="xs:col-span-2 xl:col-span-3 ml-[76px] flex items-center">
        <UILogo />
      </div>
      <div
        class="col-span-12 md:col-span-8 xl:col-span-6 flex items-center w-full"
      >
        <Search />
      </div>

      <div
        class="col-span-12 xl:col-span-3 md:col-span-2 flex items-center w-full ml-14"
      >
        <div class="sticky top-0">
          <UIProfile :currentUser="currentUser" />
        </div>
      </div>
    </div>
  </div>
  <div class="min-h-full mt-20 w-full">
    <div class="grid grid-cols-12 gap-[30px] mx-auto lg:max-w-[1280px]">
      <div class="hidden md:block xs:col-span-2 xl:col-span-3">
        <div class="sticky top-20 h-[90vh] ml-16">
          <SidebarLeft />
        </div>
      </div>

      <main class="col-span-12 md:col-span-8 xl:col-span-6">
        <slot />
      </main>

      <!-- <div
        class="hidden col-span-12 bg-green-300 md:block xl:col-span-3 md:col-span-2"
      >
        <div class="fixed top-0">
          <SidebarRight />
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { RealtimeChannel } from "@supabase/supabase-js";

const user = useSupabaseUser();
const userStore = useUserStore();
const client = useSupabaseClient();
const currentUser = ref({});

let realtimeChannel = RealtimeChannel;

onMounted(() => {
  nextTick(async () => {
    try {
      await userStore.getAuthenticatedUser(user.value.id);
      currentUser.value = userStore.currentUser;
    } catch (err) {
      console.log(err);
    }
  });
});

watchEffect(() => {
  realtimeChannel = client
    .channel("profile-updated")
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "User" },
      (payload) => {
        currentUser.value = payload.new;
      }
    );

  realtimeChannel.subscribe();
});
</script>
