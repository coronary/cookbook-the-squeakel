import * as React from "react";
import { Guide } from "../../guides/GuideTypes";
import GuideItem from "./GuideItem";
import { Cookbook } from "../../cookbooks/CookbookTypes";
import { v4 as uuid } from "uuid";

export default React.memo(function GuideList({
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
            key={uuid()}
            cookbook={cookbook}
            guide={guide}
            initialIsOpen={initialIsOpen}
          />
        );
      })}
    </>
  );
});
