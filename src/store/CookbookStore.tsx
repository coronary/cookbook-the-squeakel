"use client";

import { Cookbook } from "@/lib/modules/cookbooks/CookbookTypes";
import { SetStore } from "./store";

export interface CookbookStore {
  cookbook: Cookbook | null | undefined;
  cookbooks: Cookbook[];
  setCookbook: (cookbook: Cookbook) => void;
  setCookbooks: (cookbooks: Cookbook[]) => void;
}

export function createCookbookStore(set: SetStore): CookbookStore {
  function handleSetCookbook(cookbook: Cookbook) {
    set(() => ({ cookbook }));
  }

  function handleSetCookbooks(cookbooks: Cookbook[]) {
    set(() => ({ cookbooks }));
  }

  return {
    cookbook: null,
    cookbooks: [],
    setCookbook: handleSetCookbook,
    setCookbooks: handleSetCookbooks,
  };
}
