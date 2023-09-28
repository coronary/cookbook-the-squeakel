import * as React from "react";
import {
  DocumentCheckIcon,
  PencilIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

export default function PostItemToolbar(
  { isEditing, setIsEditing, onSave }: {
    isEditing: boolean;
    setIsEditing: (value: boolean) => void;
    onSave: () => void;
  },
) {
  return (
    <div>
      {isEditing
        ? (
          <div className="absolute right-0 top-0 flex gap-x-2">
            <button
              className="w-4 h-4"
              onClick={() => setIsEditing(false)}
            >
              <XMarkIcon />
            </button>
            <button
              className="w-4 h-4"
              onClick={onSave}
            >
              <DocumentCheckIcon />
            </button>
          </div>
        )
        : (
          <button
            className="absolute w-4 h-4 right-0 top-0"
            onClick={() => setIsEditing(true)}
          >
            <PencilIcon />
          </button>
        )}
    </div>
  );
}
