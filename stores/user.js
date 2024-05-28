import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    posts: [],
    singlePost: {},
    newPosts: [],
    topics: [],
    fetchedUser: {},
    currentUser: {},
    isUserLoaded: false,
    user_name: "",
    email: "",
    password: "",
  }),
  actions: {
    async getAllPosts() {
      const res = await useFetch(`/api/get-all-posts`);
      if (!res) {
        this.posts.length = 0;
      } else {
        this.posts = res.data;
      }
      return res.data;
    },
    async getMorePosts(skips) {
      const res = await useFetch(`/api/get-more-posts?skip=${skips}`);

      if (!res) {
        this.newPosts.length = 0;
      } else {
        this.newPosts = res.data;
      }
      return res.data;
    },

    async getAllTopics() {
      const res = await useFetch("/api/get-all-topics");
      this.topics = res.data;
      return res.data;
    },

    async getSinglePost(id) {
      const res = await useFetch(`/api/find-post/${id}`);
      this.singlePost = res.data;
      return res.data;
    },
    async getUserByUuid(id) {
      const res = await useFetch(`/api/get-user-by-uuid/${id}`);
      this.fetchedUser = res.data;
      return res.data;
    },
    async getUserById(id) {
      const res = await useFetch(`/api/get-user-by-id/${id}`);
      this.fetchedUser = res.data;
      return res.data;
    },
    async getAuthenticatedUser(id) {
      this.isUserLoaded = false;
      const res = await useFetch(`/api/get-user-by-uuid/${id}`);
      this.currentUser = res.data;
      this.isUserLoaded = true;
      return res.data;
    },
    async getFollowers(id) {
      const res = await useFetch(`/api/get-followers/${id}`, {
        method: "GET",
      });
      this.followerCount = res.data.length;
      return res.data;
    },
  },
});
