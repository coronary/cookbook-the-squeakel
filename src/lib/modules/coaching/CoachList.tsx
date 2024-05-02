"use client";
import * as React from "react";
import { Card } from "@/lib/ui/card/Card";
import { Routes } from "@/lib/constants/ApiRoutes";
import classNames from "classnames";
import styles from "./CoachList.module.css";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useCookbookStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import Image from "next/image";
import { ScheduleCoachModal } from "./ScheduleCoachModal";

export function CoachList() {
	const {
		modal,
		setModal,
		cookbook
	} = useCookbookStore(
		useShallow((state) => ({
			cookbook: state.cookbook,
			modal: state.modal,
			setModal: state.setModal
		}))
	);

  const coaches = cookbook?.coaches ?? [];

	const setOpen = (isOpen: boolean): void => setModal({ ...modal, open: isOpen });

  if (!cookbook?.features?.coaching) return <></>;

  return (
    <div className="h-full flex flex-col">
			<ScheduleCoachModal
				coach={'idk man'}
			/>
      <div className="p-6 overflow-y-auto scrollbar grid grid-cols-1 gap-4 sm:grid-cols-2">
        {coaches.map((coach) => (
          <Card
            key={coach.discordId}
            className="flex flex-col items-start text-indigo-200 gap-y-4"
          >
            <div className="flex items-center gap-4 text-indigo-100 font-semibold text-lg">
              <Image
                className={classNames(
                  "inline-block rounded-full",
                  styles.avatar,
                )}
                src={Routes.DISCORD_AVATAR(coach.discordId, coach.discordAvatar)}
                alt=""
                onError={(e: any) => {
                  e.target.src = cookbook?.avatarUrl;
                }}
              />

              {coach.discordUsername}
            </div>

            <div>
              Hi, I&apos;m coach coach. Please book sessions so I can earn free
              money.
            </div>
            <button 
							className="flex justify-center items-center gap-x-2 w-full rounded bg-teal-500 px-2 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
							onClick={() => {
								//put modal activation here
								console.log(coach.discordUsername);
							}}
							>
              <CalendarDaysIcon className="h-6 w-6 shrink-0" />
              Book session
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
