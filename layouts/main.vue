<template>
  <div class="min-h-full bg-white dark:bg-[#0F1419] custom-transition">
    <div class="grid grid-cols-12 sm:px-6 lg:px-8 mx-auto lg:max-w-7xl">
      <div class="hidden md:block xs-col-span-1 xl:col-span-3">
        <div class="fixed top-0">
          <SidebarLeft />
        </div>
      </div>

      <main class="col-span-12 md:col-span-8 xl:col-span-6">
        <slot />
      </main>

      <div class="hidden col-span-12 md:block xl:col-span-3 md:col-span-3">
        <div class="fixed top-0">
          <SidebarRight />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
