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

export const useProfileModal = defineStore("profileModal", {
  state: () => ({
    isModalOpen: false,
  }),
});

export const useFollowersModal = defineStore("followersModal", {
  state: () => ({
    isFollowedBy: false,
    isFollowedTo: false,
  }),
});
