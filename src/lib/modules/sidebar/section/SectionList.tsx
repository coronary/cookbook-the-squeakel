import * as React from "react";
import { v4 as uuid } from "uuid";
import SectionItem from "./SectionItem";
import { Cookbook } from "../../cookbooks/CookbookTypes";
import { Guide } from "../../guides/GuideTypes";
import { Section } from "../../sections/SectionTypes";

export default function Sections({
  cookbook,
  guide,
  sections,
}: {
  cookbook: Cookbook;
  guide: Guide;
  sections: Section[];
}) {
  return (
    <>
      {sections.map((section: any) => {
        return (
          <SectionItem
            key={uuid()}
            cookbook={cookbook}
            guide={guide}
            section={section}
          />
        );
      })}
    </>
  );
}
