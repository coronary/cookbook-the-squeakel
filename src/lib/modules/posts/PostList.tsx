"use client";

import * as React from "react";
import { Post } from "./PostTypes";
import HttpService from "@/lib/utils/HttpService";
import { Routes } from "@/lib/constants/ApiRoutes";
import { CookbookContext } from "../cookbooks/CookbookLayout";
import PostItem from "./PostItem";

export default function PostList() {
  const { cookbook } = React.useContext(CookbookContext);
  const [isFetching, setIsFetching] = React.useState<boolean>(true);
  const [posts, setPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    async function init() {
      if (cookbook == null) {
        return;
      }
      setPosts(await HttpService.get(Routes.POSTS_GET_ALL(cookbook.id)));
      setIsFetching(false);
    }
    init();
  }, []);

  return (
    <div className="flex flex-col h-full overflow-x-hidden p-8 md:pl-16 pb-32 gap-y-12">
      {posts != null && !isFetching && (
        <>
          {posts.map((post) => (
            <PostItem post={post} />
          ))}
        </>
      )}
    </div>
  );
}
