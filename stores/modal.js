import { defineStore } from "pinia";

export const useAuthModal = defineStore("authModal", {
  state: () => ({
    isOpen: false,
    isSignUp: false,
    isSigningUp: false,
    isSigningIn: false,
  }),
  actions: {
    toggleModal() {
      this.isSignUp = !this.isSignUp;
    },
  },
});

export const useUserModal = defineStore("userModal", {
  state: () => ({
    isModalOpen: false,
  }),
  actions: {
    toggleUserModal() {
      this.isModalOpen = !this.isModalOpen;
    },
  },
});

export const usePostModal = defineStore("postModal", {
  state: () => ({
    isDropdown: false,
    isFullscreen: false,
    content: {},
  }),
});
