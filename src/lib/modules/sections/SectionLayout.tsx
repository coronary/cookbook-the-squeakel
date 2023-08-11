"use client";

import * as React from "react";
import { CookbookContext } from "../cookbooks/CookbookLayout";
import { Markdown } from "@/lib/ui/markdown/Markdown";
import { itemFromUrl } from "@/lib/utils/SectionUtils";

export const SectionLayout = ({
  guideUrl,
  sectionUrl,
}: {
  guideUrl: string;
  sectionUrl: string;
}) => {
  const { guides } = React.useContext(CookbookContext);
  const guide = itemFromUrl(guides, guideUrl);
  const section = itemFromUrl(guide.sections, sectionUrl);

  return (
    <div className="scrollbar overflow-y-scroll flex flex-1 flex-col h-full overflow-x-hidden p-8 pl-16 pb-32">
      <Markdown body={section?.body} />
    </div>
  );
};
