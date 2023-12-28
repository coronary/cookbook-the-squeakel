"use client";

import { SetStore, Store } from "./store";
import { Post } from "@/lib/modules/posts/PostTypes";

export interface PostStore {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  addPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
}

export function createPostStore(set: SetStore): PostStore {
  function handleAddPosts(posts: Post[]) {
    set((state: Store) => {
      return { posts: [...state.posts, ...posts] };
    });
  }

  function handleSetPosts(posts: Post[]) {
    set(() => {
      return { posts };
    });
  }

  function handleAddPost(post: Post) {
    set((state: Store) => {
      return { posts: [post, ...state.posts] };
    });
  }

  return {
    posts: [],
    setPosts: handleSetPosts,
    addPosts: handleAddPosts,
    addPost: handleAddPost,
  };
}
