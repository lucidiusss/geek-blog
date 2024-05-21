<template>
  <div
    v-if="!authModal.isSigningIn"
    ref="target"
    class="z-50 fixed top-1/2 -translate-x-1/2 left-1/2 w-1/4 -translate-y-1/2 h-[550px] rounded-xl dark:bg-[#232324] bg-white text-black dark:text-[#c9cccf]"
  >
    <h1
      v-motion
      :initial="{
        x: -50,
        opacity: 0,
      }"
      :enter="{
        x: 0,
        opacity: 1,
        transition: {
          duration: 400,
          type: 'keyframes',
          ease: 'easeInOut',
        },
      }"
      class="text-[20px] mt-32 font-medium text-center"
    >
      Вход в аккаунт
    </h1>
    <div
      v-motion
      :initial="{
        x: -50,
        opacity: 0,
      }"
      :enter="{
        x: 0,
        opacity: 1,
        transition: {
          duration: 400,
          type: 'keyframes',
          ease: 'easeInOut',
        },
      }"
      class="w-full flex flex-col gap-4 mt-5 items-center"
    >
      <UIAuthButton
        @click="signInWithGithub()"
        text="Продолжить с Github"
        icon="logos:github-icon"
      />
      <UIAuthButton
        @click="authModal.isSigningIn = true"
        text="Почта"
        icon="mdi:email-outline"
      />
    </div>
    <div
      v-motion
      :initial="{
        x: -50,
        opacity: 0,
      }"
      :enter="{
        x: 0,
        opacity: 1,
        transition: {
          duration: 400,
          type: 'keyframes',
          ease: 'easeInOut',
        },
      }"
      class="flex justify-center gap-1 mt-5"
    >
      <h1 class="dark:text-[#c9cccf] text-[17px]">Нет аккаунта?</h1>
      <button
        @click="authModal.toggleModal()"
        class="custom-transition text-[#418af4] hover:text-[#386db9] text-[17px]"
      >
        Регистрация
      </button>
    </div>
    <button
      @click="authModal.isOpen = false"
      class="absolute rounded-full dark:hover:bg-[#2c2c2c] hover:bg-[#f0f0f0] p-1 top-5 right-5"
    >
      <Icon
        size="25"
        class="dark:text-[#969c9d] text-[#595959]"
        name="heroicons:x-mark-16-solid"
      />
    </button>
  </div>
  <div
    v-else
    ref="target"
    class="z-50 fixed top-1/2 -translate-x-1/2 left-1/2 w-1/4 -translate-y-1/2 h-[550px] rounded-xl dark:bg-[#232324] bg-white text-black dark:text-[#c9cccf]"
  >
    <h1
      v-motion
      :initial="{
        x: 50,
        opacity: 0,
      }"
      :enter="{
        x: 0,
        opacity: 1,
        transition: {
          duration: 400,
          type: 'keyframes',
          ease: 'easeInOut',
        },
      }"
      class="text-[20px] mt-32 font-medium text-center"
    >
      Вход в аккаунт
    </h1>
    <div
      v-motion
      :initial="{
        x: 50,
        opacity: 0,
      }"
      :enter="{
        x: 0,
        opacity: 1,
        transition: {
          duration: 400,
          type: 'keyframes',
          ease: 'easeInOut',
        },
      }"
      class="w-full flex flex-col gap-4 mt-5 items-center"
    >
      <input
        text-black
        class="w-2/4 font-medium text-[17px] dark:text-[#c9cccf] dark:placeholder:text-[#595959] outline-none outline-4 outline-offset-0 dark:hover:outline-[#303031] dark:focus:outline-[#303031] border border-transparent dark:hover:border-[#324a5e] dark:focus:border-[#418af4] dark:bg-[#2c2c2d] dark:hover:bg-[#1e1d1e] dark:focus:bg-[#1e1d1e] bg-[#f5f5f5] hover:bg-white hover:border-[#b3d1ff] focus:border-[#4989e9] hover:outline-[#e6effd] focus:outline-[#e6effd] focus:bg-white text-black placeholder:text-[#646464] p-3 custom-transition rounded-xl"
        type="email"
        v-model="userStore.email"
        placeholder="Почта"
      />
      <input
        class="w-2/4 font-medium text-[17px] dark:text-[#c9cccf] dark:placeholder:text-[#595959] outline-none outline-4 outline-offset-0 dark:hover:outline-[#303031] dark:focus:outline-[#303031] border border-transparent dark:hover:border-[#324a5e] dark:focus:border-[#418af4] dark:bg-[#2c2c2d] dark:hover:bg-[#1e1d1e] dark:focus:bg-[#1e1d1e] bg-[#f5f5f5] hover:bg-white hover:border-[#b3d1ff] focus:border-[#4989e9] hover:outline-[#e6effd] focus:outline-[#e6effd] focus:bg-white text-black placeholder:text-[#646464] p-3 custom-transition rounded-xl"
        type="password"
        v-model="userStore.password"
        placeholder="Пароль"
        @keyup.enter="signInWithEmail()"
      />
      <button
        class="w-2/4 font-medium text-[17px] p-3 rounded-xl custom-transition dark:text-[#c9cccf] dark:bg-[#418af4] dark:hover:bg-[#598fde] dark:active:bg-[#3367b5] bg-[#0b5dd7] hover:bg-[#2664bf] active:bg-[#2a6dd1] text-white"
        @click="signInWithEmail()"
      >
        Войти
      </button>
    </div>

    <button
      @click="authModal.isOpen = false"
      class="absolute rounded-full dark:hover:bg-[#2c2c2c] hover:bg-[#f0f0f0] p-1 top-5 right-5"
    >
      <Icon
        size="25"
        class="dark:text-[#969c9d] text-[#595959]"
        name="heroicons:x-mark-16-solid"
      />
    </button>
    <button
      @click="authModal.isSigningIn = false"
      class="absolute rounded-full dark:hover:bg-[#2c2c2c] hover:bg-[#f0f0f0] p-1 top-5 left-5"
    >
      <Icon
        size="25"
        class="dark:text-[#969c9d] text-[#595959]"
        name="lucide:chevron-left"
      />
    </button>
  </div>
</template>

<script setup>
const authModal = useAuthModal();
const client = useSupabaseClient();
const user = useSupabaseUser();
const target = ref(null);
const input = ref(null);
const userStore = useUserStore();
useFocus(input);

const signInWithEmail = async () => {
  userStore.isLoading = true;
  try {
    const { data, error } = await client.auth.signInWithPassword({
      email: userStore.email,
      password: userStore.password,
    });
  } catch (err) {
    console.log(err);
  } finally {
    userStore.isLoading = false;
    userStore.email = "";
    userStore.password = "";
    userStore.user_name = "";
    authModal.isOpen = false;
    authModal.isSigningIn = false;
    navigateTo("/");
    await userStore.getAuthenticatedUser(user.value.id);
  }
};

const signInWithGithub = async () => {
  userStore.isLoading = true;
  try {
    const { data, error } = await client.auth.signInWithOAuth({
      provider: "github",
      redirectTo: window.location.origin,
    });
  } catch (err) {
    console.log(err);
  } finally {
    userStore.isLoading = false;
    authModal.isOpen = false;
    authModal.isSigningIn = false;
    navigateTo("/");
  }
};

onClickOutside(target, () => {
  authModal.isOpen = false;
  authModal.isSignUp = false;
});

onBeforeUnmount(() => {
  userStore.email = "";
  userStore.password = "";
  userStore.user_name = "";
});
</script>
