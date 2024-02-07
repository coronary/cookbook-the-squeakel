"use client";

import * as React from "react";
import { Markdown } from "@/lib/ui/markdown/Markdown";
import { itemFromUrl } from "@/lib/utils/SectionUtils";
import { Editor } from "@/lib/ui/editor/editor";
import classNames from "classnames";
import SectionToolbar from "./SectionToolbar";
import useEditing from "@/lib/ui/editor/useEditing";
import { Routes } from "@/lib/constants/ApiRoutes";
import HttpService from "@/lib/utils/HttpService";
import { useCookbookStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import Image from "next/image";
import { User } from "../users/UserTypes";

export const SectionLayout = ({
  guideUrl,
  sectionUrl,
}: {
  guideUrl: string;
  sectionUrl: string;
}) => {
  const { cookbook, guides, user } = useCookbookStore(
    useShallow((state) => ({
      cookbook: state.cookbook,
      guides: state.guides,
      user: state.user,
    })),
  );
  const guide = itemFromUrl(guides, guideUrl);
  const section = itemFromUrl(guide.sections, sectionUrl);
  const { isEditing, setIsEditing, body, setBody, canEdit } = useEditing({
    initialBody: section?.body ?? "",
  });

  const handleSetEditing = (value: boolean) => {
    setIsEditing(value);
  };

  const handleSectionEdit = (text: string) => {
    setBody(text);
  };

  const handleSave = async () => {
    section.body = body;
    try {
      if (cookbook == null) return;
      await HttpService.put(
        Routes.SECTION_EDIT(cookbook.id, guide.id, section.id),
        section,
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={classNames("flex flex-1 flex-col h-full overflow-x-hidden")}
    >
      <>
        {canEdit && (
          <SectionToolbar
            isEditing={isEditing}
            setIsEditing={handleSetEditing}
            onSave={handleSave}
          />
        )}
        <div
          className={classNames(
            "scrollbar overflow-y-scroll flex flex-1 flex-col overflow-x-hidden",
            {
              "p-8": !isEditing,
              "pt-0": !isEditing && canEdit,
              "md:pl-16": !isEditing,
              "pb-32": !isEditing,
              "pb-8": isEditing,
            },
          )}
        >
          {!isEditing && (
            <div className="flex items-center gap-x-4">
              <div>
                <div className="text-slate-200 text-xl capitalize">
                  {section.name.replace(/-/g, " ")}
                </div>
                <div className="inline-flex items-center gap-4 text-slate-400 text-sm my-2">
                  {section.authors.map((author: User) => (
                    <div
                      className="flex gap-x-2 items-center text-slate-300"
                      key={author.id}
                    >
                      <Image
                        className={classNames(
                          "w-6 h-6 rounded-full",
                        )}
                        src={Routes.DISCORD_AVATAR(
                          author.discordId,
                          author.discordAvatar,
                        )}
                        alt="Cookbook.gg"
                        width={64}
                        height={64}
                      />
                      {author.discordUsername}
                    </div>
                  ))}
                  {new Date(section.creationDate).toLocaleString("en-us", {
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
          )}
          {isEditing && user != null
            ? <Editor body={section.body} onChange={handleSectionEdit} />
            : <Markdown body={section?.body} />}
        </div>
      </>
    </div>
  );
};
