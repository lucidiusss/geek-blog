<template>
  <div
    class="fixed top-0 left-0 z-10 dark:bg-[#26282b] bg-[#d9f0ff] h-[60px] w-full"
  >
    <div
      class="grid grid-cols-12 gap-6 md:grid-cols-9 lg:grid-cols-12 xl:grid-cols-12 justify-center mx-auto lg:max-w-[1280px] h-[60px]"
    >
      <div
        class="col-span-3 2xl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-9 xl:ml-[76px] xs:ml-[15px] flex items-center"
      >
        <UILogo />
      </div>
      <div
        class="2xl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-3 md:flex sm:hidden xs:hidden flex items-center w-full"
      >
        <Search />
      </div>

      <div
        class="col-span-3 2xl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-3 md:flex sm:hidden xs:hidden flex items-center w-full 2xl:ml-14"
      >
        <div class="sticky top-0">
          <UIProfile :currentUser="currentUser" />
        </div>
      </div>
    </div>
  </div>
  <div class="min-h-full mt-20 w-full relative">
    <div
      class="sticky top-15 left-0 dark:bg-[#232324] bg-white md:hidden mb-5 xs:block"
    >
      <UIHeader />
    </div>
    <div
      class="grid grid-cols-12 md:grid-cols-9 lg:grid-cols-12 xl:grid-cols-12 gap-[30px] mx-auto lg:max-w-[1280px]"
    >
      <div
        class="col-span-3 2xl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-3 md:block sm:hidden xs:hidden"
      >
        <div class="sticky top-20 h-[90vh] ml-16">
          <SidebarLeft />
        </div>
      </div>

      <main
        class="xl:col-span-6 2xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 xs:col-span-12 md:mr-[50px] sm:mx-10"
      >
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

  <div
    class="fixed bottom-0 left-0 z-10 dark:bg-[#232324] bg-white md:hidden xs:block w-full"
  >
    <UIFooter :currentUser="currentUser" />
  </div>
</template>

<script setup>
import { RealtimeChannel } from "@supabase/supabase-js";

const user = useSupabaseUser();
const userStore = useUserStore();
const client = useSupabaseClient();
const currentUser = ref({});

let realtimeChannel = RealtimeChannel;

onMounted(async () => {
  if (user.value) {
    nextTick(async () => {
      await userStore.getAuthenticatedUser(user.value.id);
      currentUser.value = userStore.currentUser;
    });
  }
});

watchEffect(() => {
  currentUser.value = userStore.currentUser;
});

watchEffect(() => {
  if (user.value) {
    realtimeChannel = client.channel("profile-updated").on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "User",
        filter: `id=eq.${user.value.id}`,
      },
      (payload) => {
        currentUser.value = payload.new;
      }
    );
    realtimeChannel.subscribe();
  }
});
onUnmounted(() => {
  client.removeChannel(realtimeChannel);
});
</script>
