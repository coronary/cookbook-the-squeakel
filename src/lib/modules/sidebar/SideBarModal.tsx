import * as React from "react";
import Modal from "@/lib/ui/modal/Modal";
import { SideBarModalType } from "./context-menu/SideBarContextMenu";
import { Guide } from "../guides/GuideTypes";
import { Section } from "../sections/SectionTypes";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";

function AddSectionModal({ guide }: { guide: Guide }) {
  const [sectionName, setSectionName] = React.useState("");

  function handleSetSectionName(event) {
    const value = event.target.value.replace(/\s/g, "-").toLowerCase();
    setSectionName(value);
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
        <button className="bg-teal-500 p-2 w-20 rounded text-white">Add</button>
      </div>
    </div>
  );
}

function RenameSection(
  { guide, section }: { guide: Guide; section: Section },
) {
}

interface SideBarModalProps {
  open: boolean;
  type: SideBarModalType | null;
  guide?: Guide;
  section?: Section;
  setOpen: (value: boolean) => void;
}

export function SideBarModal(
  { open, type, setOpen, guide, section }: SideBarModalProps,
) {
  let children;

  switch (type) {
    case SideBarModalType.ADD_SECTION: {
      if (guide == null) return null;
      children = <AddSectionModal guide={guide} />;
    }
  }

  return <Modal open={open} setOpen={setOpen}>{children}</Modal>;
}
