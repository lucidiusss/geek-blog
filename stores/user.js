import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    posts: [],
    singlePost: {},
    newPosts: [],
    bookmarks: [],
    topics: [],
    comments: [],
    followers: [],
    follows: [],
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
      this.followers = res.data;
      return res.data;
    },
    async getFollows(id) {
      const res = await useFetch(`/api/get-follows/${id}`, {
        method: "GET",
      });
      this.follows = res.data;
      return res.data;
    },
    async getBookmarks(id) {
      const res = await useFetch(`/api/get-bookmarks/${id}`, {
        method: "GET",
      });

      if (!res) {
        this.bookmarks.length = 0;
      } else {
        this.bookmarks = res.data;
      }
      return res.data;
    },

    async getUsersPosts(id) {
      const res = await useFetch(`/api/get-users-posts/${id}`, {
        method: "GET",
      });
      return res.data;
    },
  },
});
