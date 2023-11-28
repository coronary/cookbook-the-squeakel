"use client";

import { Routes } from "@/lib/constants/ApiRoutes";
import useInfiniteScroll from "@/lib/ui/scroll/useInfiniteScroll";
import HttpService from "@/lib/utils/HttpService";
import { useCookbookStore } from "@/store/store";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import * as React from "react";
import { v4 as uuid } from "uuid";
import PostItem from "./PostItem";
import { Post } from "./PostTypes";
import SkeletonPostItem from "./SkeletonPostItem";
import { useShallow } from "zustand/react/shallow";

const POST_LIMIT = 10;

export default React.memo(function PostList() {
  const { cookbook } = useCookbookStore(
    useShallow((state) => ({
      cookbook: state.cookbook,
    })),
  );
  const [isFetching, setIsFetching] = React.useState<boolean>(true);
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [searchText, setSearchText] = React.useState<string | undefined>(
    undefined,
  );
  const [page, setPage] = React.useState<number>(0);
  const { loadMoreRef } = useInfiniteScroll(setPage);

  React.useEffect(() => {
    async function fetchPosts() {
      if (cookbook == null) {
        return;
      }

      const newPosts = await HttpService.get(
        Routes.POSTS_GET_ALL(cookbook.id),
        {
          options: {
            skip: page * POST_LIMIT,
            limit: POST_LIMIT,
          },
          search: searchText,
        },
      );

      setPosts((prev) => [...prev, ...newPosts]);
    }

    if (page === 0) return;

    async function init() {
      await fetchPosts();
      setIsFetching(false);
    }

    init();
  }, [cookbook, page, searchText]);

  React.useEffect(() => {
    setIsFetching(true);
    setPage(0);
    setPosts([]);

    async function fetchPosts() {
      if (cookbook == null) {
        return;
      }

      const newPosts = await HttpService.get(
        Routes.POSTS_GET_ALL(cookbook.id),
        {
          options: {
            skip: 0,
            limit: POST_LIMIT,
          },
          search: searchText,
        },
      );

      setPosts([...newPosts]);
    }

    const delayDebounceFn = setTimeout(async () => {
      await fetchPosts();
      setIsFetching(false);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText, cookbook]);

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const search = event.target.value === "" ? undefined : event.target.value;
    setSearchText(search);
  }

  return (
    <div className="flex flex-col min-h-full h-full">
      <div className="pt-2 px-4 md:px-8 md:pl-16 mb-2 md:max-w-lg">
        <div className="relative mt-2 flex items-center">
          <div className="absolute inset-y-0 left-0 flex py-1.5 pl-1.5"></div>
          <div className="absolute inset-y-0 left-0 flex py-1.5 pl-1.5">
            <MagnifyingGlassIcon className="text-slate-400 mx-2" />
          </div>
          <input
            type="text"
            name="search"
            id="search"
            autoComplete="off"
            placeholder="search #defense #punish"
            className="tracking-wide leading-loose bg-slate-800 block w-full rounded-full border-0 py-1.5 pr-8 pl-14 text-slate-300 shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-500 sm:text-sm sm:leading-6"
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="scrollbar flex flex-col overflow-x-hidden flex-1 p-4 md:p-8 md:pl-16 pb-32 gap-y-12">
        {isFetching && (
          <>
            <SkeletonPostItem />
            <SkeletonPostItem />
          </>
        )}
        {posts.length > 0 && !isFetching && cookbook != null && (
          <>
            {posts.map((post) => (
              <PostItem
                key={uuid()}
                post={post}
                backupImg={cookbook.avatarUrl ?? ""}
                cookbookId={cookbook.id}
              />
            ))}
          </>
        )}
        <div ref={loadMoreRef} />
      </div>
    </div>
  );
});
