"use client";

import * as React from "react";
import { Cookbook } from "../../cookbooks/CookbookTypes";
import { useCookbookStore } from "@/store/store";
import HttpService from "@/lib/utils/HttpService";
import { Routes } from "@/lib/constants/ApiRoutes";
import { TrashIcon } from "@heroicons/react/24/outline";
import { DocumentMinusIcon } from "@heroicons/react/24/solid";
import { Spinner } from "@/lib/ui/loading/Spinner";
import { Section } from "../../sections/SectionTypes";
import { Guide } from "../../guides/GuideTypes";

export function DeleteSectionModal({
  guide,
  section,
  cookbook,
  setOpen,
}: {
  guide: Guide;
  section: Section;
  cookbook: Cookbook;
  setOpen: (value: boolean) => void;
}) {
  const [loading, setLoading] = React.useState(false);
  const { removeSection } = useCookbookStore((state) => state);

  async function handleDeleteSection() {
    setLoading(true);
    removeSection(section);
    await HttpService.delete(
      Routes.SECTION_DELETE(cookbook.id, section.guide, section.id)
    );
    setOpen(false);
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex gap-x-2 items-center">
        <DocumentMinusIcon className="text-rose-500 w-6 h-6 shrink-0" />
        <div className="text-2xl font-bold overflow-x-hidden whitespace-nowrap text-ellipsis">
          {guide.name} / {section.name}
        </div>
      </div>
      <div>
        Are you sure you want to delete "<strong>{section.name}</strong>"?
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
          onClick={handleDeleteSection}
          disabled={loading}
        >
          {loading && <Spinner />}
          {!loading && <TrashIcon className="w-6 h-6 shrink-0" />} Delete
        </button>
      </div>
    </div>
  );
}
