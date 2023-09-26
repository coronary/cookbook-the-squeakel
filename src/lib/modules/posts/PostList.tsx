"use client";

import * as React from "react";
import { Post } from "./PostTypes";
import HttpService from "@/lib/utils/HttpService";
import { Routes } from "@/lib/constants/ApiRoutes";
import { CookbookContext } from "../cookbooks/CookbookLayout";
import PostItem from "./PostItem";
import { v4 as uuid } from "uuid";
import useInfiniteScroll from "@/lib/ui/scroll/useInfiniteScroll";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import SkeletonPostItem from "./SkeletonPostItem";
import { debounce } from "@/lib/utils/Debounce";

const POST_LIMIT = 10;

export default function PostList() {
  const { cookbook } = React.useContext(CookbookContext);
  const [isFetching, setIsFetching] = React.useState<boolean>(true);
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [searchText, setSearchText] = React.useState<string | undefined>(
    undefined,
  );
  const [page, setPage] = React.useState<number>(0);
  const { loadMoreRef } = useInfiniteScroll(setPage);
  const debouncesetIsFetching = debounce(() => setIsFetching(false));

  async function fetchPosts(initialPage = page, initialPosts = posts) {
    if (cookbook == null) {
      return;
    }

    const newPosts = await HttpService.get(Routes.POSTS_GET_ALL(cookbook.id), {
      options: {
        skip: initialPage * POST_LIMIT,
        limit: POST_LIMIT,
      },
      search: searchText,
    });

    setPosts([...initialPosts, ...newPosts]);
  }

  React.useEffect(() => {
    async function init() {
      await fetchPosts();
      debouncesetIsFetching();
    }
    init();
  }, [page]);

  React.useEffect(() => {
    setIsFetching(true);
    setPage(0);
    setPosts([]);

    const delayDebounceFn = setTimeout(async () => {
      // Setting initial "avoids" a race condition with setPage and setPosts
      await fetchPosts(0, []);
      debouncesetIsFetching();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  function handleSearchChange(event) {
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
        {posts.length > 0 && !isFetching && (
          <>
            {posts.map((post) => (
              <PostItem
                key={uuid()}
                post={post}
                backupImg={cookbook?.avatarUrl ?? ""}
              />
            ))}
          </>
        )}
        <div ref={loadMoreRef} />
      </div>
    </div>
  );
}
