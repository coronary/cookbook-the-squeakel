"use client";

import * as React from "react";
import { Markdown } from "@/lib/ui/markdown/Markdown";
import { Editor } from "@/lib/ui/editor/editor";
import classNames from "classnames";
import useEditing from "@/lib/ui/editor/useEditing";
import { Routes } from "@/lib/constants/ApiRoutes";
import HttpService from "@/lib/utils/HttpService";
import { useCookbookStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import SectionToolbar from "../sections/SectionToolbar";

export const HomeLayout = () => {
  const { cookbook, user } = useCookbookStore(
    useShallow((state) => ({
      cookbook: state.cookbook,
      user: state.user,
    })),
  );
  const { isEditing, setIsEditing, body, setBody, canEdit } = useEditing({
    initialBody: cookbook?.about ?? "",
  });

  const handleSetEditing = (value: boolean) => {
    setIsEditing(value);
  };

  const handleSectionEdit = (text: string) => {
    setBody(text);
  };

  const handleSave = async () => {
    if (cookbook == null) return;

    cookbook.about = body;

    try {
      if (cookbook == null) return;
      await HttpService.put(Routes.COOKBOOK_EDIT(cookbook.id), cookbook);
    } catch (err) {
      console.log(err);
    }
  };

  if (cookbook == null) return <></>;

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
          {isEditing && user != null ? (
            <Editor body={cookbook.about} onChange={handleSectionEdit} />
          ) : (
            <Markdown body={cookbook?.about} />
          )}
        </div>
      </>
    </div>
  );
};
