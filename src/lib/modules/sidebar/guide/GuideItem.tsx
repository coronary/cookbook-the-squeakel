import { FolderIcon, FolderOpenIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import * as React from "react";
import SectionList from "../section/SectionList";
import { Cookbook } from "../../cookbooks/CookbookTypes";
import { Guide } from "../../guides/GuideTypes";

export default function GuideItem({
  cookbook,
  guide,
  initialIsOpen = false,
}: {
  cookbook: Cookbook;
  guide: Guide;
  initialIsOpen: boolean;
}) {
  const [isOpen, setIsOpen] = React.useState<boolean>(initialIsOpen);

  function handleToggleOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <li>
      <button
        className={classNames(
          "text-indigo-200 hover:text-white hover:bg-teal-500",
          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full"
        )}
        onClick={handleToggleOpen}
      >
        {isOpen && (
          <FolderOpenIcon
            className={classNames(
              "text-indigo-200 group-hover:text-white",
              "h-6 w-6 shrink-0"
            )}
            aria-hidden="true"
          />
        )}
        {!isOpen && (
          <FolderIcon
            className={classNames(
              "text-indigo-200 group-hover:text-white",
              "h-6 w-6 shrink-0"
            )}
            aria-hidden="true"
          />
        )}
        {guide.name}
      </button>
      <ul className="ml-4">
        {isOpen && (
          <SectionList
            cookbook={cookbook}
            guide={guide}
            sections={guide.sections}
          />
        )}
      </ul>
    </li>
  );
}
