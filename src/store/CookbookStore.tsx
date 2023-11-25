"use client";

import { Cookbook } from "@/lib/modules/cookbooks/CookbookTypes";

export interface CookbookStore {
  cookbook: Cookbook | null | undefined;
  cookbooks: Cookbook[];
  setCookbook: (cookbook: Cookbook) => void;
  setCookbooks: (cookbooks: Cookbook[]) => void;
}

export function createCookbookStore(set): CookbookStore {
  function handleSetCookbook(cookbook: Cookbook) {
    set((state) => ({ ...state, cookbook }));
  }

  function handleSetCookbooks(cookbooks: Cookbook[]) {
    set((state) => ({ ...state, cookbooks }));
  }

  return {
    cookbook: null,
    cookbooks: [],
    setCookbook: handleSetCookbook,
    setCookbooks: handleSetCookbooks,
  };
}
