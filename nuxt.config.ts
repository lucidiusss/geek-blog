// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    "@nuxtjs/supabase",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@nuxtjs/color-mode",
    "nuxt-icon",
    "@nuxtjs/google-fonts",
    "@vueuse/nuxt",
    "@vueuse/motion/nuxt",
    "nuxt-time",
  ],
  css: ["~/assets/css/tailwind.css"],
  googleFonts: {
    families: {
      Roboto: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
  },
  supabase: {
    redirect: false,
  },
  pages: true,
});
