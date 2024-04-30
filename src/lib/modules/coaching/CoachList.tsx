"use client";
import * as React from "react";
import { useStateFromStore } from "@/store/useStateFromStore";
import { Card } from "@/lib/ui/card/Card";
import { Routes } from "@/lib/constants/ApiRoutes";
import classNames from "classnames";
import styles from "./CoachList.module.css";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

export function CoachList() {
  const { cookbook } = useStateFromStore((state) => state);
  const users = cookbook?.coaches ?? [];

  if (!cookbook?.features?.coaching) return <></>;

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 overflow-y-auto scrollbar grid grid-cols-1 gap-4 sm:grid-cols-2">
        {users.map((user) => (
          <Card
            key={user.discordId}
            className="flex flex-col items-start text-indigo-200 gap-y-4"
          >
            <div className="flex items-center gap-4 text-indigo-100 font-semibold text-lg">
              <img
                className={classNames(
                  "inline-block rounded-full",
                  styles.avatar,
                )}
                src={Routes.DISCORD_AVATAR(user.discordId, user.discordAvatar)}
                alt=""
                onError={(e: any) => {
                  e.target.src = cookbook?.avatarUrl;
                }}
              />

              {user.discordUsername}
            </div>

            <div>
              Hi, I&apos;m coach coach. Please book sessions so I can earn free
              money.
            </div>
            <button className="flex justify-center items-center gap-x-2 w-full rounded bg-teal-500 px-2 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500">
              <CalendarDaysIcon className="h-6 w-6 shrink-0" />
              Book session
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
