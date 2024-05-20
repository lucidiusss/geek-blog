<template>
  <UIProfileSkeleton v-if="isLoading" />

  <div
    v-else
    class="w-full relative h-[500px] dark:bg-[#232324] bg-[#ffffff] rounded-xl"
  >
    <div
      class="w-full relative h-[45%] dark:bg-[#353436] bg-[#e5e5e5] rounded-t-xl"
    >
      <button
        v-if="thisUser?.id === user?.id"
        class="absolute flex flex-row gap-1 items-center font-medium top-1/2 text-[13px] leading-[13px] rounded-md p-2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white bg-black/30 hover:bg-black/50"
      >
        <Icon name="gravity-ui:picture" size="20" />
        Добавить обложку
      </button>
    </div>
    <div class="p-5">
      <div
        class="w-full flex flex-row items-end justify-between absolute top-[35%] left-5"
      >
        <div
          class="w-24 h-24 relative rounded-full border-2 border-white dark:border-[#232324]"
        >
          <div v-if="thisUser?.id === user?.id">
            <button
              class="hover:bg-black/30 opacity-0 absolute hover:opacity-100 z-10 rounded-full w-full h-full dark:text-[#c9cccf] text-black"
            >
              <input
                class="absolute"
                type="file"
                id="single"
                accept="image/*"
                @change="handleFileInputChange($event)"
              />
            </button>
          </div>
          <NuxtImg
            v-motion-fade
            class="w-full h-full rounded-full"
            :src="thisUser?.profileImage"
          />
        </div>

        <NuxtLink
          v-if="thisUser?.id === user?.id"
          to="/settings"
          class="rounded-lg absolute right-10 dark:bg-[#333333] dark:hover:bg-[#2c2c2c] bg-[#f0f0f0] hover:bg-[#e6e6e6]"
        >
          <Icon
            size="35"
            class="text-black dark:text-white p-2"
            name="solar:settings-outline"
          />
        </NuxtLink>
      </div>
      <div class="mt-10">
        <div class="flex flex-col gap-3">
          <h1
            class="font-medium text-[22px] leading-[30px] dark:text-[#c9cccf] text-black"
          >
            {{ thisUser?.username }}
          </h1>
          <p
            class="text-[#595959] dark:text-[#969c9d] text-[15px] leading-[22px]"
          >
            с {{ createdAt }}
          </p>
          <p class="text-[14px] leading-[22px] dark:text-[#c9cccf] text-black">
            {{ thisUser?.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RealtimeChannel } from "@supabase/supabase-js";
const { username } = useRoute().params;
const { id } = useRoute().params;
let isLoading = ref(true);
let realtimeChannel = RealtimeChannel;
let thisUser = ref();

const imageUrl = ref(null);

const userStore = useUserStore();
const client = useSupabaseClient();
const user = useSupabaseUser();

onMounted(() => {
  nextTick(async () => {
    try {
      await userStore.getUserById(id);
      thisUser.value = userStore.fetchedUser;
    } catch (err) {
      console.log(err);
    } finally {
      isLoading.value = false;
    }
  });
});

watchEffect(() => {
  realtimeChannel = client
    .channel("profile-update")
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "User" },
      async (payload) => {
        if (payload.new.username === username) {
          await userStore.getUserById(id);
          thisUser.value = userStore.fetchedUser;
        }
      }
    );

  realtimeChannel.subscribe();
});

const handleFileInputChange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;

    const { data, error } = await client.storage
      .from("avatars")
      .upload(`${id}${username}/${fileName}`, file);

    const { data: publicUrl } = client.storage
      .from("avatars")
      .getPublicUrl(`${id}${username}/${fileName}`);

    const { data: updateLink } = await client
      .from("User")
      .update({
        profileImage: publicUrl.publicUrl,
      })
      .eq("id", user.value.id);
  } catch (err) {
    console.log(err);
  } finally {
    file.value = null;
  }

  imageUrl.value = URL.createObjectURL(file);
};

const options = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};

const createdAt = computed(() => {
  return new Date(thisUser?.value.createdAt).toLocaleDateString(
    "ru-RU",
    options
  );
});
</script>
