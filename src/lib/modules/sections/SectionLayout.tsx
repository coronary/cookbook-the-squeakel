"use client";

import * as React from "react";
import { CookbookContext } from "../cookbooks/CookbookLayout";
import { Markdown } from "@/lib/ui/markdown/Markdown";
import { itemFromUrl } from "@/lib/utils/SectionUtils";
import { Editor } from "@/lib/ui/editor/editor";
import classNames from "classnames";
import SectionToolbar from "./SectionToolbar";
import useEditing from "@/lib/ui/editor/useEditing";

export const SectionLayout = ({
  guideUrl,
  sectionUrl,
}: {
  guideUrl: string;
  sectionUrl: string;
}) => {
  const { guides, user } = React.useContext(CookbookContext);
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

  const handleSave = () => {
    section.body = body;
  };

  return (
    <div
      className={classNames(
        "flex flex-1 flex-col h-full overflow-x-hidden",
      )}
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
            },
          )}
        >
          {isEditing && user != null
            ? (
              <Editor
                body={section.body}
                onChange={handleSectionEdit}
              />
            )
            : <Markdown body={section?.body} />}
        </div>
      </>
      <div></div>
    </div>
  );
};
