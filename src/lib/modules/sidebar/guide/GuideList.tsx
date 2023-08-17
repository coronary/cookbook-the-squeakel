import * as React from "react";
import { Guide } from "../../guides/GuideTypes";
import GuideItem from "./GuideItem";
import { Cookbook } from "../../cookbooks/CookbookTypes";

export default function GuideList({
  cookbook,
  guides,
}: {
  cookbook: Cookbook;
  guides: Guide[];
}) {
  return (
    <>
      {guides.map((guide: any, index) => {
        const initialIsOpen = guides.length < 5 || index === 0;
        return (
          <GuideItem
            cookbook={cookbook}
            guide={guide}
            initialIsOpen={initialIsOpen}
          />
        );
      })}
    </>
  );
}
