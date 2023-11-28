"use client";

import { Guide } from "@/lib/modules/guides/GuideTypes";
import { Section } from "@/lib/modules/sections/SectionTypes";
import {
  ContextMenuPosition,
  SideBarContextMenuType,
  SideBarModalType,
} from "@/lib/modules/sidebar/context-menu/SideBarContextMenu";
import { SetStore } from "./store";

export type SideBarContextMenuData = {
  position: ContextMenuPosition;
  type: SideBarContextMenuType;
  guide?: Guide;
  section?: Section;
};

export type SideBarModalData = {
  open: boolean;
  type: null | SideBarModalType;
};

export interface ContextMenuStore {
  contextMenuData: null | SideBarContextMenuData;
  modal: SideBarModalData;
  setContextMenuData: (data: SideBarContextMenuData | null) => void;
  setModal: (data: SideBarModalData) => void;
}

export function createContextMenuStore(set: SetStore): ContextMenuStore {
  function handleSetContextMenuData(
    contextMenuData: SideBarContextMenuData | null,
  ) {
    set(() => ({ contextMenuData }));
  }

  function handleSetModal(modal: SideBarModalData) {
    set(() => ({ modal }));
  }

  return {
    contextMenuData: null,
    modal: {
      open: false,
      type: null,
    },
    setContextMenuData: handleSetContextMenuData,
    setModal: handleSetModal,
  };
}
