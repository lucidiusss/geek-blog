<template>
  <nav
    class="absolute leading-4 top-5 right-5 w-48 dark:bg-[#1f1f1f] bg-white shadow-xl border dark:border-[#2f2f2f] text-black border-[#dddddd] z-30 rounded-xl p-2 dark:text-[#c9cccf]"
  >
    <ul class="flex flex-col gap-2">
      <li
        :class="{
          'dark:bg-[#313131] bg-[#f2f2f2]': colorMode.preference === 'system',
        }"
        @click="colorMode.preference = 'system'"
        class="dark:hover:bg-[#313131] hover:bg-[#f2f2f2] text-[15px] font-medium cursor-pointer p-2 rounded-lg custom-transition"
      >
        Системная
      </li>
      <li
        :class="{
          'dark:bg-[#313131] bg-[#f2f2f2]': colorMode.preference === 'dark',
        }"
        @click="colorMode.preference = 'dark'"
        class="dark:hover:bg-[#313131] hover:bg-[#f2f2f2] text-[15px] font-medium cursor-pointer p-2 rounded-lg custom-transition"
      >
        Темная
      </li>
      <li
        @click="colorMode.preference = 'light'"
        :class="{
          'dark:bg-[#313131] bg-[#f2f2f2]': colorMode.preference === 'light',
        }"
        class="dark:hover:bg-[#313131] hover:bg-[#f2f2f2] text-[15px] font-medium cursor-pointer p-2 rounded-lg custom-transition"
      >
        Светлая
      </li>
    </ul>
  </nav>
</template>

<script setup>
const colorMode = useColorMode();
</script>
