"use client";

import * as React from "react";
import { Cookbook } from "../../cookbooks/CookbookTypes";
import { useCookbookStore } from "@/store/store";
import HttpService from "@/lib/utils/HttpService";
import { Routes } from "@/lib/constants/ApiRoutes";
import { TrashIcon, DocumentMinusIcon } from "@heroicons/react/24/outline";
import { Guide } from "../../guides/GuideTypes";
import { FolderMinusIcon } from "@heroicons/react/24/solid";
import { Spinner } from "@/lib/ui/loading/Spinner";

export function DeleteGuideModal({
  guide,
  cookbook,
  setOpen,
}: {
  guide: Guide;
  cookbook: Cookbook;
  setOpen: (value: boolean) => void;
}) {
  const [loading, setLoading] = React.useState(false);
  const { removeGuide } = useCookbookStore((state) => state);

  async function handleDeleteGuide() {
    setLoading(true);
    removeGuide(guide);
    await HttpService.delete(Routes.GUIDES_DELETE(cookbook.id, guide.id));
    setOpen(false);
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex gap-x-2 items-center">
        <FolderMinusIcon className="text-rose-500 w-6 h-6 shrink-0" />
        <div className="text-2xl font-bold overflow-x-hidden whitespace-nowrap text-ellipsis">
          {guide.name}
        </div>
      </div>
      <div>
        Are you sure you want to delete <strong>{guide.name}</strong> and all of
        its sections?
        <ul className="my-4">
          {guide.sections.map((section) => {
            return (
              <li className="ml-4 flex gap-x-2 items-center">
                <DocumentMinusIcon className="text-rose-500 w-4 h-4 shrink-0" />
                {section.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex gap-x-4 items-center">
        <button
          className="p-2 flex-1 rounded text-white"
          onClick={() => setOpen(false)}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          className="bg-rose-500 p-2 flex-1 rounded text-white flex items-center justify-center gap-x-2"
          onClick={handleDeleteGuide}
          disabled={loading}
        >
          {loading && <Spinner />}
          {!loading && <TrashIcon className="w-6 h-6 shrink-0" />} Delete
        </button>
      </div>
    </div>
  );
}
