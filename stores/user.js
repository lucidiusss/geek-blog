import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    posts: [],
    singlePost: {},
    topics: [],
    isLoading: true,
    user_name: "",
    email: "",
    password: "",
  }),
  actions: {
    async getAllPosts() {
      const res = await useFetch("/api/get-all-posts");
      if (!res) {
        this.posts.length = 0;
      } else {
        this.posts = res.data;
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
  },
});
