import * as React from "react";
import Modal from "@/lib/ui/modal/Modal";
import { SideBarModalType } from "./context-menu/SideBarContextMenu";
import { Guide } from "../guides/GuideTypes";
import { Section } from "../sections/SectionTypes";
import { Cookbook } from "../cookbooks/CookbookTypes";
import { AddSectionModal } from "./modals/AddSectionModal";
import { AddGuideModal } from "./modals/AddGuideModal";

interface SideBarModalProps {
  open: boolean;
  type: SideBarModalType | null;
  cookbook: Cookbook;
  guide: Guide | null | undefined;
  section?: Section;
  setOpen: (value: boolean) => void;
}

export function SideBarModal({
  open,
  type,
  setOpen,
  cookbook,
  guide,
  section,
}: SideBarModalProps) {
  let children;

  switch (type) {
    case SideBarModalType.ADD_SECTION: {
      if (guide == null) return null;
      children = <AddSectionModal guide={guide} setOpen={setOpen} />;
      break;
    }
    case SideBarModalType.ADD_GUIDE: {
      children = <AddGuideModal cookbook={cookbook} setOpen={setOpen} />;
      break;
    }
  }

  return (
    <Modal open={open} setOpen={setOpen}>
      {children}
    </Modal>
  );
}
