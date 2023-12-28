import * as React from "react";
import { Cookbook } from "../../cookbooks/CookbookTypes";
import { FolderPlusIcon } from "@heroicons/react/24/outline";
import { Spinner } from "@/lib/ui/loading/Spinner";
import { addGuide } from "../../guides/GuideActionCreators";

function formatGuideName(name: string): string {
  return name
    .replace(/\s/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .toLowerCase();
}

export function AddGuideModal({
  cookbook,
  setOpen,
}: {
  cookbook: Cookbook;
  setOpen: (value: boolean) => void;
}) {
  const [loading, setLoading] = React.useState(false);
  const [guideName, setGuideName] = React.useState("");

  function handleSetGuideName(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setGuideName(formatGuideName(value));
  }

  async function handleAddGuide() {
    setLoading(true);
    await addGuide(cookbook.id, guideName);
    setOpen(false);
  }

  return (
    <div className="flex flex-col gap-y-4 p-6">
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
          className="bg-teal-500 p-2 w-20 rounded text-white flex items-center justify-center"
          onClick={handleAddGuide}
          disabled={loading || guideName.length < 1}
        >
          {loading && <Spinner />}
          Add
        </button>
      </div>
    </div>
  );
}
