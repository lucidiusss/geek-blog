import { defineStore } from "pinia";

export const usePostModal = defineStore("postModal", {
  state: () => ({
    isDropdown: false,
    isModalOpen: false,
    isFullscreen: true,
    content: {},
  }),
});
