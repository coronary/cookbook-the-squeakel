"use client";

import * as React from "react";
import { Cookbook } from "../../cookbooks/CookbookTypes";
import { useCookbookStore } from "@/store/store";
import HttpService from "@/lib/utils/HttpService";
import { Routes } from "@/lib/constants/ApiRoutes";
import { FolderPlusIcon } from "@heroicons/react/24/outline";

export function AddGuideModal({
  cookbook,
  setOpen,
}: {
  cookbook: Cookbook;
  setOpen: (value: boolean) => void;
}) {
  const [guideName, setGuideName] = React.useState("");
  const { addGuide } = useCookbookStore((state) => state);

  function handleSetGuideName(event) {
    const value = event.target.value.replace(/\s/g, "-").toLowerCase();
    setGuideName(value);
  }

  async function handleAddGuide() {
    const guide = await HttpService.post(Routes.GUIDES_ADD(cookbook.id), {
      name: guideName,
    });
    addGuide(guide);
    setOpen(false);
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex gap-x-2 items-center">
        <FolderPlusIcon className="w-6 h-6 shrink-0" />
        <div className="text-2xl font-bold overflow-x-hidden whitespace-nowrap text-ellipsis">
          {guideName}
        </div>
      </div>
      <div className="flex gap-x-4 items-center">
        <input
          className="rounded bg-slate-700 ring-none border-none flex-1 focus:ring-teal-500 focus:ring-2"
          onChange={handleSetGuideName}
          value={guideName}
        />
        <button
          className="bg-teal-500 p-2 w-20 rounded text-white"
          onClick={handleAddGuide}
        >
          Add
        </button>
      </div>
    </div>
  );
}
