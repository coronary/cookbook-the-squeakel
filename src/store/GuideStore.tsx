"use client";

import { Guide } from "@/lib/modules/guides/GuideTypes";
import { SetStore, Store } from "./store";

export interface GuideStore {
  guides: Guide[];
  selectedGuide: Guide | null | undefined;
  addGuide: (guide: Guide) => void;
  removeGuide: (guide: Guide) => void;
  setSelectedGuide: (guide: Guide) => void;
}

export function createGuideStore(set: SetStore): GuideStore {
  function handleAddGuide(guide: Guide) {
    set((state: Store) => {
      const guides = [...state.guides, guide];
      return { guides };
    });
  }

  function handleRemoveGuide(guide: Guide) {
    set((state) => {
      return {
        guides: state.guides.filter((g) => guide.id !== g.id),
      };
    });
  }

  function handleSetSelectedGuide(guide: Guide) {
    set(() => ({ selectedGuide: guide }));
  }

  return {
    guides: [],
    addGuide: handleAddGuide,
    removeGuide: handleRemoveGuide,
    selectedGuide: null,
    setSelectedGuide: handleSetSelectedGuide,
  };
}
