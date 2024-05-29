<template>
  <UIProfileSkeleton v-if="isLoading" />

  <div
    v-else
    class="w-full relative h-[500px] dark:bg-[#232324] bg-[#ffffff] rounded-xl"
  >
    <div
      class="w-full relative h-[45%] dark:bg-[#353436] bg-[#e5e5e5] rounded-t-xl"
    >
      <div
        class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
        v-if="isBannerLoading"
      >
        <Icon name="svg-spinners:3-dots-fade" size="35" />
      </div>
      <ClientOnly>
        <NuxtImg
          loading="lazy"
          v-if="thisUser.bannerImage !== null && !isBannerLoading"
          v-show="!isBannerLoading"
          :src="`https://wsnrscwmvaliilxyaimk.supabase.co/storage/v1/object/public/banners/${thisUser.bannerImage}`"
          class="w-full z-0 h-full rounded-t-xl object-cover"
        />
      </ClientOnly>
      <button
        v-if="
          thisUser?.id === user?.id &&
          thisUser.bannerImage === null &&
          !isBannerLoading
        "
        class="absolute cursor-pointer flex flex-row gap-1 z-30 items-center font-medium top-1/2 text-[13px] leading-[13px] rounded-md p-1 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white bg-black/30 hover:bg-black/50"
      >
        <Icon name="gravity-ui:picture" size="20" />
        Добавить обложку
        <input
          type="file"
          accept="image/*"
          @change="uploadBanner($event)"
          class="absolute cursor-pointer w-full h-full opacity-0"
        />
      </button>
      <UIProfileModalBannerModal
        @update-banner="updateBanner($event)"
        :thisUser="thisUser"
        v-if="thisUser?.id === user?.id && thisUser?.bannerImage"
      />
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

          <ClientOnly>
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
              preload
              v-if="!isAvatarLoading"
              loading="lazy"
              v-motion-fade
              class="w-full h-full rounded-full"
              :src="`https://wsnrscwmvaliilxyaimk.supabase.co/storage/v1/object/public/avatars/${thisUser.profileImage}`"
            />
          </ClientOnly>
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
        <button
          @click="profileModal.isModalOpen = !profileModal.isModalOpen"
          v-if="thisUser?.id !== user?.id"
          ref="ignoreEl"
          class="rounded-lg absolute right-10 dark:bg-[#333333] dark:hover:bg-[#2c2c2c] bg-[#f0f0f0] hover:bg-[#e6e6e6]"
        >
          <Icon
            size="35"
            name="bi:three-dots"
            class="text-black dark:text-white p-2"
          />
          <UIFollowersModal
            ref="targetEl"
            @un-follow-user="unFollowUser()"
            :isFollowing="isFollowing"
            :currentUser="thisUser"
            v-if="profileModal.isModalOpen"
          />
        </button>
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
        <div class="flex flex-row gap-3">
          <button
            :disabled="thisUser.followedBy.length === 0"
            @click="followersModal.isFollowedBy = true"
            :class="
              thisUser.followedBy.length === 0
                ? 'disabled hover:none cursor-auto'
                : 'dark:hover:text-[#b4b4b4] hover:text-[#3c4347] cursor-pointer'
            "
            class="text-[15px] leading-[22px] dark:text-[#c9cccf] text-black"
          >
            {{ thisUser.followedBy.length }}
            {{ getFollowersLabel(thisUser.followedBy.length) }}
          </button>
          <button
            @click="followersModal.isFollowedTo = true"
            :disabled="thisUser.followedTo.length === 0"
            :class="
              thisUser.followedTo.length === 0
                ? 'disabled hover:none cursor-auto'
                : 'dark:hover:text-[#b4b4b4] hover:text-[#3c4347] cursor-pointer'
            "
            class="text-[15px] leading-[22px] dark:text-[#c9cccf] text-black"
          >
            {{ thisUser.followedTo.length }}
            {{ getSubscriptionsLabel(thisUser.followedTo.length) }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <UIAuthBackground
      v-show="followersModal.isFollowedBy || followersModal.isFollowedTo"
    />
    <UIProfileFollowedBy
      :followers="thisUsersFollowers"
      v-if="followersModal.isFollowedBy"
    />
    <UIProfileFollowedTo
      :follows="thisUsersFollows"
      v-if="followersModal.isFollowedTo"
    />
  </Teleport>
</template>

<script setup>
import { RealtimeChannel } from "@supabase/supabase-js";

const { username } = useRoute().params;
const { id } = useRoute().params;
const followersModal = useFollowersModal();

let isLoading = ref(true);
let realtimeChannel = RealtimeChannel;
let isAvatarLoading = ref(false);
let isBannerLoading = ref(false);
let thisUser = ref({});
let thisUsersFollowers = ref([]);
let thisUsersFollows = ref([]);
let isFollowing = ref(false);

const imageUrl = ref(null);
const targetEl = ref(null);
const ignoreEl = ref(null);

const userStore = useUserStore();
const profileModal = useProfileModal();
const client = useSupabaseClient();
const user = useSupabaseUser();

useHead({
  title: `${username} (@${id}) - Блог`,
});

onMounted(() => {
  nextTick(async () => {
    try {
      await userStore.getUserById(id);
      thisUser.value = userStore.fetchedUser;
      await userStore.getFollowers(thisUser.value.id);
      thisUsersFollowers.value = userStore.followers;
      await userStore.getFollows(thisUser.value.id);
      thisUsersFollows.value = userStore.follows;
    } catch (err) {
      console.log(err);
    } finally {
      isLoading.value = false;
    }
    if (userStore.fetchedUser.followedBy) {
      userStore.fetchedUser.followedBy.forEach((u) => {
        if (u.id === user?.id) {
          isFollowing.value = true;
        }
      });
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
        if (payload.new.id === thisUser.value.id) {
          await userStore.getUserById(id);
          thisUser.value = userStore.fetchedUser;
          payload.new = userStore.currentUser;
          isAvatarLoading.value = false;
          isBannerLoading.value = false;
        }
      }
    );

  realtimeChannel.subscribe();
});

const updateAvatar = async (event) => {
  thisUser.value.profileImage = null;
  isAvatarLoading.value = true;
  const file = event.target.files[0];
  if (!file) return;
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;

    await client.storage
      .from("avatars")
      .upload(`${id}/${username}/${fileName}`, file);

    await client
      .from("User")
      .update({
        profileImage: `${id}/${username}/${fileName}`,
      })
      .eq("id", user.value.id);
  } catch (err) {
    console.log(err);
  } finally {
    file.value = null;
    isAvatarLoading.value = false;
  }

  imageUrl.value = URL.createObjectURL(file);
};

const uploadBanner = async (event) => {
  isBannerLoading.value = true;
  const file = event.target.files[0];
  if (!file) return;
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;

    await client.storage
      .from("banners")
      .upload(`${id}/${username}/${fileName}`, file);

    await client
      .from("User")
      .update({
        bannerImage: `${id}/${username}/${fileName}`,
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
  thisUser.value.bannerImage = ".";
  isBannerLoading.value = true;
  const file = event.target.files[0];
  if (!file) return;
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;

    await client.storage
      .from("banners")
      .upload(`${id}/${username}/${fileName}`, file);

    await client
      .from("User")
      .update({
        bannerImage: `${id}/${username}/${fileName}`,
      })
      .eq("id", user.value.id);
  } catch (err) {
    console.log(err);
  } finally {
    isBannerLoading.value = false;
  }

  imageUrl.value = URL.createObjectURL(file);
};

const unFollowUser = async () => {
  isFollowing.value = false;
  try {
    await useFetch(`/api/unfollow-user/`, {
      method: "DELETE",
      body: {
        followedToId: thisUser.value.id,
        followedById: user.value.id,
      },
    });
  } catch (err) {
    console.log(err);
  }
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

const getFollowersLabel = (count) => {
  if (count % 10 === 1 && count % 100 !== 11) {
    return "подписчик";
  } else if (
    [2, 3, 4].includes(count % 10) &&
    ![12, 13, 14].includes(count % 100)
  ) {
    return "подписчика";
  } else {
    return "подписчиков";
  }
};

const getSubscriptionsLabel = (count) => {
  if (count % 10 === 1 && count % 100 !== 11) {
    return "подписка";
  } else if (
    [2, 3, 4].includes(count % 10) &&
    ![12, 13, 14].includes(count % 100)
  ) {
    return "подписки";
  } else {
    return "подписок";
  }
};

onClickOutside(
  targetEl,
  () => {
    profileModal.isModalOpen = false;
  },
  { ignore: [ignoreEl] }
);

onUnmounted(() => {
  realtimeChannel.unsubscribe();
  profileModal.isModalOpen = false;
});
</script>
