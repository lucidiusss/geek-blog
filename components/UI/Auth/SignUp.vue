<template>
  <div
    v-if="!authModal.isSigningUp"
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
      Регистрация
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
      <UIAuthButton
        @click="signUpWithGithub()"
        text="Продолжить с Github"
        icon="logos:github-icon"
      />
      <UIAuthButton
        @click="authModal.isSigningUp = true"
        text="Почта"
        icon="mdi:email-outline"
      />
    </div>

    <button
      @click="authModal.isOpen = false"
      class="absolute rounded-full dark:hover:bg-[#2c2c2c] hover:bg-[#f0f0f0] p-1 top-5 right-5"
    >
      <ClientOnly>
        <Icon
          size="25"
          class="dark:text-[#969c9d] text-[#595959]"
          name="heroicons:x-mark-16-solid"
        />
      </ClientOnly>
    </button>
    <button
      @click="authModal.isSignUp = false"
      class="absolute rounded-full dark:hover:bg-[#2c2c2c] hover:bg-[#f0f0f0] p-1 top-5 left-5"
    >
      <ClientOnly>
        <Icon
          size="25"
          class="dark:text-[#969c9d] text-[#595959]"
          name="lucide:chevron-left"
        />
      </ClientOnly>
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
      Регистрация
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
        ref="input"
        class="w-2/4 font-medium text-[17px] dark:text-[#c9cccf] dark:placeholder:text-[#595959] outline-none outline-4 outline-offset-0 dark:hover:outline-[#303031] dark:focus:outline-[#303031] border-2 border-transparent dark:hover:border-[#324a5e] dark:focus:border-[#418af4] dark:bg-[#2c2c2d] dark:hover:bg-[#1e1d1e] dark:focus:bg-[#1e1d1e] bg-[#f5f5f5] hover:bg-white hover:border-[#b3d1ff] focus:border-[#4989e9] hover:outline-[#e6effd] focus:outline-[#e6effd] focus:bg-white text-black placeholder:text-[#646464] p-3 custom-transition rounded-xl"
        type="text"
        v-model="userStore.user_name"
        placeholder="Имя или никнейм"
      />
      <input
        class="w-2/4 font-medium text-[17px] dark:text-[#c9cccf] dark:placeholder:text-[#595959] outline-none outline-4 outline-offset-0 dark:hover:outline-[#303031] dark:focus:outline-[#303031] border-2 border-transparent dark:hover:border-[#324a5e] dark:focus:border-[#418af4] dark:bg-[#2c2c2d] dark:hover:bg-[#1e1d1e] dark:focus:bg-[#1e1d1e] bg-[#f5f5f5] hover:bg-white hover:border-[#b3d1ff] focus:border-[#4989e9] hover:outline-[#e6effd] focus:outline-[#e6effd] focus:bg-white text-black placeholder:text-[#646464] p-3 custom-transition rounded-xl"
        type="email"
        v-model="userStore.email"
        placeholder="Почта"
      />
      <input
        class="w-2/4 font-medium text-[17px] dark:text-[#c9cccf] dark:placeholder:text-[#595959] outline-none outline-4 outline-offset-0 dark:hover:outline-[#303031] dark:focus:outline-[#303031] border-2 border-transparent dark:hover:border-[#324a5e] dark:focus:border-[#418af4] dark:bg-[#2c2c2d] dark:hover:bg-[#1e1d1e] dark:focus:bg-[#1e1d1e] bg-[#f5f5f5] hover:bg-white hover:border-[#b3d1ff] focus:border-[#4989e9] hover:outline-[#e6effd] focus:outline-[#e6effd] focus:bg-white text-black placeholder:text-[#646464] p-3 custom-transition rounded-xl"
        type="password"
        v-model="userStore.password"
        placeholder="Пароль"
        @keyup.enter="signUpWithEmail()"
      />
      <button
        class="w-2/4 font-medium text-[17px] h-14 p-3 rounded-xl custom-transition dark:text-[#c9cccf] dark:bg-[#418af4] dark:hover:bg-[#598fde] dark:active:bg-[#3367b5] bg-[#0b5dd7] hover:bg-[#2664bf] active:bg-[#2a6dd1] text-white"
        @click="signUpWithEmail()"
      >
        <ClientOnly v-if="isLoading">
          <Icon name="eos-icons:three-dots-loading" size="35" />
        </ClientOnly>
        <h1 v-else>Зарегистрироваться</h1>
      </button>
    </div>

    <button
      @click="authModal.isOpen = false"
      class="absolute rounded-full dark:hover:bg-[#2c2c2c] hover:bg-[#f0f0f0] p-1 top-5 right-5"
    >
      <ClientOnly>
        <Icon
          size="25"
          class="dark:text-[#969c9d] text-[#595959]"
          name="heroicons:x-mark-16-solid"
        />
      </ClientOnly>
    </button>
    <button
      @click="authModal.isSigningUp = false"
      class="absolute rounded-full dark:hover:bg-[#2c2c2c] hover:bg-[#f0f0f0] p-1 top-5 left-5"
    >
      <ClientOnly>
        <Icon
          size="25"
          class="dark:text-[#969c9d] text-[#595959]"
          name="lucide:chevron-left"
        />
      </ClientOnly>
    </button>
  </div>
</template>

<script setup>
const userStore = useUserStore();
const client = useSupabaseClient();
const authModal = useAuthModal();
const target = ref(null);
let isLoading = ref(false);
const input = ref(null);
useFocus(input);

const toast = useToast();

const showToast = (message, errorType, id, icon) => {
  toast.add({
    id: id,
    title: errorType,
    description: message,
    timeout: 5000,
    icon: icon,
    ui: {
      progress: {
        base: "absolute bottom-0 end-0 start-0 h-1",
        background: `${
          errorType === "Что-то пошло не так" || errorType === "Упс!"
            ? `bg-rose-600 dark:bg-rose-500`
            : `bg-emerald-600 dark:bg-emerald-500`
        }`,
      },
      icon: {
        color: `${
          errorType === "Что-то пошло не так" || errorType === "Упс!"
            ? `bg-rose-600 dark:bg-rose-500`
            : `bg-emerald-600 dark:bg-emerald-500`
        }`,
      },
    },
  });
};

const signUpWithEmail = async () => {
  if (
    userStore.password === "" &&
    userStore.email === "" &&
    userStore.user_name === ""
  )
    throw showToast(
      "Вы забыли ввести никнейм, почту и пароль",
      "Упс!",
      "invalid_login_credentials",
      "i-heroicons-x-mark-20-solid"
    );
  if (userStore.user_name === "") {
    throw showToast(
      "Вы не ввели никнейм",
      "Упс!",
      "invalid_login_credentials",
      "i-heroicons-x-mark-20-solid"
    );
  }
  if (userStore.email === "") {
    throw showToast(
      "Вы не ввели почту",
      "Упс!",
      "invalid_login_credentials",
      "i-heroicons-x-mark-20-solid"
    );
  }

  if (userStore.password === "")
    throw showToast(
      "Вы не ввели пароль",
      "Упс!",
      "invalid_login_credentials",
      "i-heroicons-x-mark-20-solid"
    );
  try {
    isLoading.value = true;

    const { data, error } = await client.auth.signUp({
      email: userStore.email,
      password: userStore.password,
      options: {
        data: {
          user_name: userStore.user_name,
        },
      },
    });
    if (error && error.message === "Password should be at least 6 characters.")
      throw showToast(
        "Пароль должен содержать не менее 6 символов",
        "Что-то пошло не так",
        "password_should_be_at_least_6_characters",
        "i-heroicons-x-mark-20-solid"
      );
    if (error && error.message === "Email rate limit exceeded")
      throw showToast(
        "Достигнут лимит на регистрацию через почту. Попробуйте позже",
        "Что-то пошло не так",
        "email_rate_limit_exceeded",
        "i-heroicons-x-mark-20-solid"
      );
    if (
      error &&
      error.message === "Unable to validate email address: invalid format"
    )
      throw showToast(
        "Некорректный формат почты",
        "Что-то пошло не так",
        "email_address_invalid_format",
        "gravity-ui:triangle-exclamation"
      );

    if (data) {
      userStore.email = "";
      userStore.password = "";
      userStore.user_name = "";
      authModal.isOpen = false;
      authModal.isSigningUp = false;
      throw showToast(
        "Проверьте свою почту для подтверждения регистрации",
        "Успех!",
        "success",
        "i-heroicons-check-circle"
      );
    }
    console.log(error);
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
};

const signUpWithGithub = async () => {
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
