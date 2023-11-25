"use client";

import { Guide } from "@/lib/modules/guides/GuideTypes";

export interface GuideStore {
  guides: Guide[];
  selectedGuide: Guide | null | undefined;
  addGuide: (guide: Guide) => void;
  removeGuide: (guide: Guide) => void;
  setSelectedGuide: (guide: Guide) => void;
}

export function createGuideStore(set): GuideStore {
  function handleAddGuide(guide: Guide) {
    set((state) => {
      const guides = [...state.guides, guide];
      return { ...state, guides };
    });
  }

  function handleRemoveGuide(guide: Guide) {
    set((state) => {
      return {
        ...state,
        guides: state.guides.filter((g) => guide.id !== g.id),
      };
    });
  }

  function handleSetSelectedGuide(guide: Guide) {
    set((state) => ({ ...state, selectedGuide: guide }));
  }

  return {
    guides: [],
    addGuide: handleAddGuide,
    removeGuide: handleRemoveGuide,
    selectedGuide: null,
    setSelectedGuide: handleSetSelectedGuide,
  };
}
