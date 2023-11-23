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

export const SectionLayout = ({
  guideUrl,
  sectionUrl,
}: {
  guideUrl: string;
  sectionUrl: string;
}) => {
  const { cookbook, guides, user } = useCookbookStore((state) => state);
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
        section
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
              "p-8": !isEditing && !canEdit,
              "md:pl-16": !isEditing,
              "pb-32": !isEditing,
              "pb-8": isEditing,
            }
          )}
        >
          {isEditing && user != null ? (
            <Editor body={section.body} onChange={handleSectionEdit} />
          ) : (
            <Markdown body={section?.body} />
          )}
        </div>
      </>
    </div>
  );
};
