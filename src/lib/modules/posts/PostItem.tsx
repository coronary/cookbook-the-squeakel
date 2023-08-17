import * as React from "react";
import { Post } from "./PostTypes";
import { Markdown } from "@/lib/ui/markdown/Markdown";

export default function PostItem({ post }: { post: Post }) {
  return (
    <div className="flex flex-1 gap-x-4 items-baseline">
      <div>
        <img
          className="inline-block h-10 w-10 rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
      <div className="">
        <div className="text-xl text-white">chef</div>
        <Markdown body={post.body} />
      </div>
    </div>
  );
}
