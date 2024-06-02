<template>
  <div class="w-full pl-5">
    <UTabs
      :default-index="-1"
      :items="tabs"
      @change="onTabChange"
      :unmount="true"
    />
  </div>
</template>

<script setup>
const activeTab = ref("popular");

const tabs = [
  {
    label: "Популярное",
    value: "popular",
  },
  {
    label: "Свежее",
    value: "new",
  },
  {
    label: "Моя лента",
    value: "my",
  },
];

const onTabChange = (index) => {
  const tab = tabs[index];
  navigateTo(`/${tab.value}`);
};
</script>
