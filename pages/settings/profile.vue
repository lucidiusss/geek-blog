<template>
  <div
    class="dark:bg-[#232324] bg-[#ffffff] min-h-[350px] overflow-hidden rounded-xl"
  >
    <div
      class="border-b p-4 relative gap-5 flex flex-row items-center w-full dark:border-[#353436]"
    >
      <NuxtLink to="/settings">
        <div
          class="hover:bg-[#f0f0f0] top-1/2 -translate-y-1/2 left-4 absolute p-1 dark:hover:bg-[#333333] rounded-full"
        >
          <Icon
            name="ph:arrow-left"
            size="25"
            class="text-black dark:text-[#c9cccf]"
          />
        </div>
      </NuxtLink>
      <h1
        class="font-medium text-[17px] leading-[26px] ml-5 text-black dark:text-[#c9cccf]"
      >
        Профиль
      </h1>
      <button @click="updateProfile()">Сохранить</button>
    </div>
    <div class="p-4 flex flex-col gap-4 items-center">
      <div class="w-2/4 flex flex-col gap-3">
        <h1>Название</h1>
        <input
          class="w-full font-medium text-[17px] dark:text-[#c9cccf] dark:placeholder:text-[#595959] outline-none outline-4 outline-offset-0 dark:hover:outline-[#303031] dark:focus:outline-[#303031] border border-transparent dark:hover:border-[#324a5e] dark:focus:border-[#418af4] dark:bg-[#2c2c2d] dark:hover:bg-[#1e1d1e] dark:focus:bg-[#1e1d1e] bg-[#f5f5f5] hover:bg-white hover:border-[#b3d1ff] focus:border-[#4989e9] hover:outline-[#e6effd] focus:outline-[#e6effd] focus:bg-white text-black placeholder:text-[#646464] p-3 custom-transition rounded-xl"
          type="text"
          v-model="username"
        />
      </div>
      <div class="w-2/4 flex flex-col gap-3">
        <h1>Описание</h1>
        <textarea
          class="w-full font-medium text-[17px] dark:text-[#c9cccf] dark:placeholder:text-[#595959] outline-none outline-4 outline-offset-0 dark:hover:outline-[#303031] dark:focus:outline-[#303031] border border-transparent dark:hover:border-[#324a5e] dark:focus:border-[#418af4] dark:bg-[#2c2c2d] dark:hover:bg-[#1e1d1e] dark:focus:bg-[#1e1d1e] bg-[#f5f5f5] hover:bg-white hover:border-[#b3d1ff] focus:border-[#4989e9] hover:outline-[#e6effd] focus:outline-[#e6effd] focus:bg-white text-black placeholder:text-[#646464] p-3 custom-transition rounded-xl"
          type="text"
          placeholder="Пара слов о себе"
          v-model="description"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
const client = useSupabaseClient();
let username = ref(user.value.user_metadata.user_name);
let description = ref(user.value.user_metadata.description);

const updateProfile = async () => {
  try {
    await client.auth.updateUser({
      data: {
        user_name: username.value,
        description: description.value,
      },
    });
    await client
      .from("User")
      .update({
        username: username.value,
        description: description.value,
      })
      .eq("id", user.value.id);
  } catch (err) {
    console.log(err);
  } finally {
  }
};
</script>
