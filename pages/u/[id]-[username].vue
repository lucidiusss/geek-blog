<template>
  <UIProfileSkeleton v-if="isLoading" />

  <div
    v-else
    class="w-full relative h-[500px] dark:bg-[#232324] bg-[#ffffff] rounded-xl"
  >
    <div
      class="w-full relative h-[45%] dark:bg-[#353436] bg-[#e5e5e5] rounded-t-xl"
    >
      <NuxtImg
        v-if="thisUser?.bannerImage"
        :src="thisUser?.bannerImage"
        class="w-full z-0 h-full rounded-t-xl object-cover"
      />
      <button
        v-if="thisUser?.id === user?.id && !thisUser?.bannerImage"
        class="absolute flex flex-row gap-1 z-10 items-center font-medium top-1/2 text-[13px] leading-[13px] rounded-md p-1 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white bg-black/30 hover:bg-black/50"
      >
        <Icon name="gravity-ui:picture" size="20" />
        Добавить обложку
        <input
          type="file"
          accept="image/*"
          @change="updateBanner($event)"
          class="absolute cursor-pointer w-full h-full opacity-0"
        />
      </button>
      <UIProfileModalBannerModal v-if="thisUser?.id === user?.id" />
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
              class="hover:bg-black/30 dark:hover:bg-black/50 opacity-0 absolute hover:opacity-100 z-10 rounded-full w-full h-full dark:text-[#c9cccf] text-black"
            >
              <Icon
                name="gravity-ui:picture"
                size="20"
                class="absolute w-14 h-14 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#c9cccf]"
              />
              <input
                class="w-full h-full opacity-0 cursor-pointer"
                type="file"
                accept="image/*"
                @change="updateAvatar($event)"
              />
            </button>
          </div>
          <div
            class="w-full h-full absolute rounded-full bg-[#f1f1f1] dark:bg-[#353436]"
          >
            <Icon
              v-if="isAvatarLoading"
              name="svg-spinners:pulse"
              size="35"
              class="w-full h-full rounded-full"
            />
          </div>
          <NuxtImg
            v-if="!isAvatarLoading"
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
let isAvatarLoading = ref(false);
let isBannerLoading = ref(false);
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
          payload.new = userStore.currentUser;

          isAvatarLoading.value = false;
        }
      }
    );

  realtimeChannel.subscribe();
});

const updateAvatar = async (event) => {
  isAvatarLoading.value = true;
  const file = event.target.files[0];
  if (!file) return;
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;

    await client.storage
      .from("avatars")
      .upload(`${id}${username}/${fileName}`, file);

    const { data: publicUrl } = client.storage
      .from("avatars")
      .getPublicUrl(`${id}${username}/${fileName}`);

    await client
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

const updateBanner = async (event) => {
  isBannerLoading.value = true;
  const file = event.target.files[0];
  if (!file) return;
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;

    await client.storage
      .from("banners")
      .upload(`${id}${username}/${fileName}`, file);

    const { data: publicUrl } = client.storage
      .from("banners")
      .getPublicUrl(`${id}${username}/${fileName}`);

    await client
      .from("User")
      .update({
        bannerImage: publicUrl.publicUrl,
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

console.log(thisUser?.bannerImage);
</script>
