<template>
  <div v-if="user" class="flex flex-row items-center mb-5">
    <div>
      <img
        :src="user.identities[0].identity_data.avatar_url"
        class="w-[40px] h-[40px] rounded-full"
      />
    </div>
    <div class="flex flex-col ml-3">
      <p class="font-bold text-[16px] text-black dark:text-white">
        {{ user.identities[0].identity_data.full_name }}
      </p>
      <span
        class="font-medium text-[16px] tracking-tight text-[#5B7083] dark:text-[#8899A6]"
        >@{{ user.identities[0].identity_data.user_name }}</span
      >
    </div>
    <div class="ml-auto mr-5">
      <button @click="modalFn()" class="text-black dark:text-white">
        <Icon size="30" name="mdi:dots-horizontal" />
      </button>
    </div>
  </div>

  <UIProfileModal v-if="isModalOpen" @close="isModalOpen = false" />
</template>

<script setup>
const router = useRouter();
const user = useSupabaseUser();
const client = useSupabaseClient();
const isModalOpen = useState("isModalOpen", () => false);

const logOut = async () => {
  try {
    await client.auth.signOut();
  } catch (err) {
    console.log(err);
  } finally {
    navigateTo("/auth");
  }
};

const modalFn = () => {
  isModalOpen.value = !isModalOpen.value;
};

watch(isModalOpen, () => {
  console.log(isModalOpen.value);
});

onMounted(() => {
  const user = useSupabaseUser();
  if (!user.value) {
    router.replace("/auth");
  }
});
</script>
