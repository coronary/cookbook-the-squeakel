import classNames from "classnames";
import * as React from "react";

interface SectionToolbarItemProps {
  icon: any;
  text: string;
  setIsEditing: () => void;
}

export default function SectionToolbarItem(
  { icon: Icon, text, setIsEditing }: SectionToolbarItemProps,
) {
  return (
    <button
      className={classNames("flex items-center gap-2 cursor-pointer border-solid")}
      onClick={setIsEditing}
    >
      <Icon
        className={classNames(
          "font-bold",
          "text-indigo-200 group-hover:text-white",
          "h-4 w-4 shrink-0",
        )}
      />
      <span className="font-bold antialiased text-indigo-200">{text}</span>
    </button>
  );
}
