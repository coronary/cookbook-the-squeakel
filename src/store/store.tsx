"use client";

import { Cookbook } from "@/lib/modules/cookbooks/CookbookTypes";
import { Guide } from "@/lib/modules/guides/GuideTypes";
import { Section } from "@/lib/modules/sections/SectionTypes";
import {
  ContextMenuPosition,
  SideBarContextMenuType,
  SideBarModalType,
} from "@/lib/modules/sidebar/context-menu/SideBarContextMenu";
import { User } from "@/lib/modules/users/UserTypes";
import { create } from "zustand";

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

export interface CookbookStore {
  cookbook: Cookbook | null | undefined;
  setCookbook: (cookbook: Cookbook) => void;
  cookbooks: Cookbook[];
  setCookbooks: (cookbooks: Cookbook[]) => void;
  guides: Guide[];
  addSection: (section: Section) => void;
  removeSection: (section: Section) => void;
  setGuides: (guides: Guide[]) => void;
  addGuide: (guide: Guide) => void;
  removeGuide: (guide: Guide) => void;
  user: User | null | undefined;
  setUser: (user: User | null | undefined) => void;
  contextMenuData: null | SideBarContextMenuData;
  setContextMenuData: (data: SideBarContextMenuData | null) => void;
  modal: SideBarModalData;
  setModal: (data: SideBarModalData) => void;
  selectedGuide: Guide | null | undefined;
  setSelectedGuide: (guide: Guide) => void;
  selectedSection: Section | null | undefined;
  setSelectedSection: (section: Section) => void;
  setInitialState: (
    user: User | null | undefined,
    cookbook: Cookbook,
    cookbooks: Cookbook[],
    guides: Guide[]
  ) => void;
}

export const useCookbookStore = create<CookbookStore>((set) => ({
  cookbook: null,
  setCookbook: (cookbook) => {
    set((state) => ({ ...state, cookbook }));
  },
  cookbooks: [],
  setCookbooks: (cookbooks) => {
    set((state) => ({ ...state, cookbooks }));
  },
  guides: [],
  addSection: (section) =>
    set((state) => {
      const guides = state.guides.map((guide) => {
        if (guide.id === section.guide) {
          guide.sections = [...guide.sections, section];
        }

        return guide;
      });
      return { ...state, guides };
    }),
  removeSection: (section) => {
    set((state) => {
      const guides = state.guides.map((guide) => {
        if (guide.id === section.guide) {
          guide.sections = guide.sections.filter((s) => s.id !== section.id);
        }

        return guide;
      });
      return { ...state, guides };
    });
  },
  setGuides: () => {},
  addGuide: (guide) => {
    set((state) => {
      const guides = [...state.guides, guide];
      return { ...state, guides };
    });
  },
  removeGuide: (guide) => {
    set((state) => {
      return {
        ...state,
        guides: state.guides.filter((g) => guide.id !== g.id),
      };
    });
  },
  user: undefined,
  setUser: (user) => {
    set((state) => ({ ...state, user }));
  },
  contextMenuData: null,
  setContextMenuData: (contextMenuData) => {
    set((state) => ({ ...state, contextMenuData }));
  },
  modal: {
    open: false,
    type: null,
  },
  setModal: (modal) => {
    set((state) => ({ ...state, modal }));
  },
  selectedGuide: null,
  setSelectedGuide: (selectedGuide) => {
    set((state) => ({ ...state, selectedGuide }));
  },
  selectedSection: null,
  setSelectedSection: (selectedSection) => {
    set((state) => ({ ...state, selectedSection }));
  },
  setInitialState: (user, cookbook, cookbooks, guides) => {
    set((state) => ({ ...state, user, cookbook, cookbooks, guides }));
  },
}));
