import {
  DocumentCheckIcon,
  PencilIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import classNames from "classnames";
import * as React from "react";
import styles from "./SectionToolbar.module.css";
import SectionToolbarItem from "./SectionToolbarItem";

interface SectionToolbarProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  onSave: () => void;
}

export default function SectionToolbar(
  { isEditing, setIsEditing, onSave }: SectionToolbarProps,
) {
  return (
    <div
      className={classNames(styles.toolbar, "py-4 flex gap-x-4 px-6", {
        "md:pl-16": !isEditing,
        "border-b border-slate-800": isEditing,
      })}
    >
      {isEditing
        ? (
          <div className="flex gap-x-4">
            <SectionToolbarItem
              icon={XMarkIcon}
              text={"Cancel"}
              setIsEditing={() => {
                setIsEditing(false);
              }}
            />
            <SectionToolbarItem
              icon={DocumentCheckIcon}
              text={"Save"}
              setIsEditing={() => {
                onSave();
                setIsEditing(false);
              }}
            />
          </div>
        )
        : (
          <SectionToolbarItem
            icon={PencilIcon}
            text={"Edit"}
            setIsEditing={() => setIsEditing(true)}
          />
        )}
    </div>
  );
}
