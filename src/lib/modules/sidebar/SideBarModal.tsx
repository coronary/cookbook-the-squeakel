import * as React from "react";
import Modal from "@/lib/ui/modal/Modal";
import { SideBarModalType } from "./context-menu/SideBarContextMenu";
import { Guide } from "../guides/GuideTypes";
import { Section } from "../sections/SectionTypes";
import { Cookbook } from "../cookbooks/CookbookTypes";
import { AddSectionModal } from "./modals/AddSectionModal";
import { AddGuideModal } from "./modals/AddGuideModal";
import { DeleteGuideModal } from "./modals/DeleteGuideModal";
import { DeleteSectionModal } from "./modals/DeleteSectionModal";
import { User } from "../users/UserTypes";

interface SideBarModalProps {
  user: User | null | undefined;
  open: boolean;
  type: SideBarModalType | null;
  cookbook: Cookbook;
  guide: Guide | null | undefined;
  section: Section | null | undefined;
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
  let children: React.ReactNode;

  switch (type) {
    case SideBarModalType.ADD_SECTION: {
      if (guide == null) return null;
      children = <AddSectionModal guide={guide} setOpen={setOpen} />;
      break;
    }

    case SideBarModalType.DELETE_SECTION: {
      if (guide == null || section == null) return null;
      children = (
        <DeleteSectionModal
          cookbook={cookbook}
          guide={guide}
          section={section}
          setOpen={setOpen}
        />
      );
      break;
    }

    case SideBarModalType.ADD_GUIDE: {
      children = <AddGuideModal cookbook={cookbook} setOpen={setOpen} />;
      break;
    }

    case SideBarModalType.DELETE_GUIDE: {
      if (guide == null) return null;
      children = (
        <DeleteGuideModal cookbook={cookbook} guide={guide} setOpen={setOpen} />
      );
      break;
    }
  }

  return (
    <Modal open={open} setOpen={setOpen}>
      {children}
    </Modal>
  );
}
