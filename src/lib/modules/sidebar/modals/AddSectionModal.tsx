"use client";

import * as React from "react";
import { useCookbookStore } from "@/store/store";
import { Guide } from "../../guides/GuideTypes";
import HttpService from "@/lib/utils/HttpService";
import { Routes } from "@/lib/constants/ApiRoutes";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";

export function AddSectionModal({
  guide,
  setOpen,
}: {
  guide: Guide;
  setOpen: (value: boolean) => void;
}) {
  const [sectionName, setSectionName] = React.useState("");
  const { addSection } = useCookbookStore((state) => state);

  function handleSetSectionName(event) {
    const value = event.target.value.replace(/\s/g, "-").toLowerCase();
    setSectionName(value);
  }

  async function handleAddSection() {
    const section = await HttpService.post(
      Routes.SECTIONS_ADD(guide.cookbook, guide.id),
      { name: sectionName }
    );
    addSection(section);
    setOpen(false);
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex gap-x-2 items-center">
        <DocumentPlusIcon className="w-6 h-6 shrink-0" />
        <div className="text-2xl font-bold overflow-x-hidden whitespace-nowrap text-ellipsis">
          {guide.name} / {sectionName}
        </div>
      </div>
      <div className="flex gap-x-4 items-center">
        <input
          className="rounded bg-slate-700 ring-none border-none flex-1 focus:ring-teal-500 focus:ring-2"
          onChange={handleSetSectionName}
          value={sectionName}
        />
        <button
          className="bg-teal-500 p-2 w-20 rounded text-white"
          onClick={handleAddSection}
        >
          Add
        </button>
      </div>
    </div>
  );
}
