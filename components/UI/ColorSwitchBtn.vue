<template>
  <div>
    <button
      @click="toggleColor()"
      class="border border-transparent transition-all p-2 rounded-lg"
    >
      <Icon
        size="24"
        :color="$colorMode.value === 'dark' ? 'white' : 'black'"
        :name="
          $colorMode.value === 'dark'
            ? 'material-symbols-light:sunny-outline'
            : 'material-symbols:dark-mode-outline'
        "
      />
    </button>
  </div>
</template>

<script setup>
const colorMode = useColorMode();
const darkMode = useDarkMode();

const toggleColor = () => {
  if (colorMode.value === "light") {
    colorMode.preference = "dark";
    darkMode.value = true;
  } else {
    colorMode.preference = "light";
    darkMode.value = false;
  }
};
</script>
