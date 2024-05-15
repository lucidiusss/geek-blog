// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    "@pinia/nuxt",
    "@nuxt/ui",
    "@nuxtjs/supabase",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@nuxtjs/color-mode",
    "nuxt-icon",
    "@nuxtjs/google-fonts",
    "@vueuse/nuxt",
    "nuxt-time",
    "@morev/vue-transitions/nuxt",
    "@vueuse/motion/nuxt",
    "nuxt-tiptap-editor",
    "@nuxtjs/i18n"
  ],
  tiptap: {
    prefix: "Tiptap",
  },

  css: ["~/assets/css/tailwind.css"],
  googleFonts: {
    families: {
      Roboto: true,
    },
  },
  supabase: {
    redirect: false,
  },
  pages: true,
});