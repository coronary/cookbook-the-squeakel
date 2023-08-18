"use client";

import * as React from "react";
import { Post } from "./PostTypes";
import HttpService from "@/lib/utils/HttpService";
import { Routes } from "@/lib/constants/ApiRoutes";
import { CookbookContext } from "../cookbooks/CookbookLayout";
import PostItem from "./PostItem";
import { v4 as uuid } from "uuid";
import useInfiniteScroll from "@/lib/ui/scroll/useInfiniteScroll";

const POST_LIMIT = 10;

export default function PostList() {
  const { cookbook } = React.useContext(CookbookContext);
  const [isFetching, setIsFetching] = React.useState<boolean>(true);
  const [posts, setPosts] = React.useState<Post[]>([]);
  const { loadMoreRef, page } = useInfiniteScroll();

  async function fetchPosts() {
    if (cookbook == null) {
      return;
    }

    const newPosts = await HttpService.get(Routes.POSTS_GET_ALL(cookbook.id), {
      options: { skip: page * POST_LIMIT, limit: POST_LIMIT },
    });
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
  }

  React.useEffect(() => {
    async function init() {
      await fetchPosts();
      setIsFetching(false);
    }
    init();
  }, [page]);

  return (
    <div className="scrollbar flex flex-col min-h-full h-full overflow-x-hidden p-4 md:p-8 md:pl-16 pb-32 gap-y-12">
      {posts != null && !isFetching && (
        <>
          {posts.map((post) => (
            <PostItem key={uuid()} post={post} />
          ))}
        </>
      )}
      <div ref={loadMoreRef} />
    </div>
  );
}
