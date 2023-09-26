import * as React from "react";
import { Post } from "./PostTypes";
import { Markdown } from "@/lib/ui/markdown/Markdown";
import { Routes } from "@/lib/constants/ApiRoutes";
import TagItem from "./TagItem";
import { v4 as uuid } from "uuid";
import styles from "./PostItem.module.css";
import classNames from "classnames";

export default function PostItem(
  { post, backupImg }: { post: Post; backupImg: string },
) {
  const { user, tags } = post;

  return (
    <div className="flex flex-1 gap-x-4 items-baseline w-full md:max-w-4xl">
      <div>
        <img
          className={classNames(
            "inline-block h-10 w-10 rounded-full",
            styles.avatar,
          )}
          src={Routes.DISCORD_AVATAR(user.discordId, user.discordAvatar)}
          alt=""
          onError={(e: any) => {
            e.target.src = backupImg;
          }}
        />
      </div>
      <div className="w-full">
        <div className="text-lg text-white">{user.discordUsername}</div>
        <div className="text-gray-500 flex gap-x-2 flex-wrap">
          {tags.map((tag) => <TagItem key={uuid()} tag={tag} />)}
        </div>
        <Markdown body={post.body} />
      </div>
    </div>
  );
}
