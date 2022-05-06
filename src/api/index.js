import axios from "axios";

const url = "https://places-a.herokuapp.com/";

const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );

export const createPost = (newPost) => {
  return API.post("/posts", newPost);
};

export const updatePost = (id, updatedPost) => {
  return API.patch(`/posts/${id}`, updatedPost);
};

export const deletePost = (id) => {
  return API.delete(`/posts/${id}`);
};

export const likePost = (id) => {
  return API.patch(`/posts/${id}/likePost`);
};

export const signIn = (formData) => {
  return API.post("/user/signin", formData);
};

export const signUn = (formData) => {
  return API.post("/user/signup", formData);
};

export const comment = (comment, id) => {
  return API.post(`/posts/${id}/commentPost`, { comment });
};
