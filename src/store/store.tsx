"use client";

import { Cookbook } from "@/lib/modules/cookbooks/CookbookTypes";
import { Guide } from "@/lib/modules/guides/GuideTypes";
import { User } from "@/lib/modules/users/UserTypes";
import { create } from "zustand";
import { GuideStore, createGuideStore } from "./GuideStore";
import { CookbookStore, createCookbookStore } from "./CookbookStore";
import { SectionStore, createSectionStore } from "./SectionStore";
import { UserStore, createUserStore } from "./UserStore";
import { ContextMenuStore, createContextMenuStore } from "./ContextMenuStore";

interface DefaultStore {
  setInitialState: (
    user: User | null | undefined,
    cookbook: Cookbook,
    cookbooks: Cookbook[],
    guides: Guide[]
  ) => void;
}
export type Store = DefaultStore &
  CookbookStore &
  GuideStore &
  SectionStore &
  UserStore &
  ContextMenuStore;

export const useCookbookStore = create<Store>((set) => ({
  setInitialState: (user, cookbook, cookbooks, guides) => {
    set((state) => ({ ...state, user, cookbook, cookbooks, guides }));
  },
  ...createCookbookStore(set),
  ...createGuideStore(set),
  ...createSectionStore(set),
  ...createUserStore(set),
  ...createContextMenuStore(set),
}));
