import * as React from "react";
import { Post } from "./PostTypes";
import { Markdown } from "@/lib/ui/markdown/Markdown";
import { Routes } from "@/lib/constants/ApiRoutes";
import TagItem from "./TagItem";
import { v4 as uuid } from "uuid";

export default function PostItem({ post }: { post: Post }) {
  const { user, tags } = post;
  console.log("user: ", user);
  return (
    <div className="flex flex-1 gap-x-4 items-baseline w-full">
      <div>
        <img
          className="inline-block h-10 w-10 rounded-full"
          src={Routes.DISCORD_AVATAR(user.discordId, user.discordAvatar)}
          alt=""
        />
      </div>
      <div className="w-full">
        <div className="text-xl text-white">{user.discordUsername}</div>
        <div className="text-gray-500 flex gap-x-2 flex-wrap mt-2">
          {tags.map((tag) => (
            <TagItem key={uuid()} tag={tag} />
          ))}
        </div>
        <Markdown body={post.body} />
      </div>
    </div>
  );
}
