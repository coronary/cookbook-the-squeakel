"use client";

import * as React from "react";
import { Post, Tag } from "./PostTypes";
import HttpService from "@/lib/utils/HttpService";
import { Routes } from "@/lib/constants/ApiRoutes";
import { CookbookContext } from "../cookbooks/CookbookLayout";
import PostItem from "./PostItem";
import { v4 as uuid } from "uuid";
import useInfiniteScroll from "@/lib/ui/scroll/useInfiniteScroll";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import SkeletonPostItem from "./SkeletonPostItem";

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
    <div className="flex flex-col min-h-full h-full">
      <div className="pt-2 px-4 md:px-8 md:pl-16 mb-2">
        <div className="relative mt-2 flex items-center">
          <div className="absolute inset-y-0 left-0 flex py-1.5 pl-1.5"></div>
          <div className="absolute inset-y-0 left-0 flex py-1.5 pl-1.5">
            <kbd className="inline-flex items-center rounded border border-gray-600 px-1 font-sans text-xs text-gray-400">
              ⌘K
            </kbd>
            <MagnifyingGlassIcon className="text-gray-600 mx-2" />
          </div>
          <input
            type="text"
            name="search"
            id="search"
            autoComplete="off"
            placeholder="search #defense #punish"
            className="bg-gray-900 block w-full rounded-md border-0 py-1.5 pr-8 pl-20 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-600 focus:ring-1 focus:ring-inset focus:ring-teal-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="scrollbar flex flex-col overflow-x-hidden flex-1 p-4 md:p-8 md:pl-16 pb-32 gap-y-12">
        {posts.length < 1 && isFetching && (
          <>
            <SkeletonPostItem />
            <SkeletonPostItem />
          </>
        )}
        {posts.length > 0 && !isFetching && (
          <>
            {posts.map((post) => (
              <PostItem key={uuid()} post={post} />
            ))}
          </>
        )}
        <div ref={loadMoreRef} />
      </div>
    </div>
  );
}
