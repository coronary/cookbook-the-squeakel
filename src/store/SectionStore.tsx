"use client";

import { Section } from "@/lib/modules/sections/SectionTypes";
import { SetStore, Store } from "./store";

export interface SectionStore {
  selectedSection: Section | null | undefined;
  addSection: (section: Section) => void;
  removeSection: (section: Section) => void;
  setSelectedSection: (section: Section) => void;
}

export function createSectionStore(set: SetStore): SectionStore {
  function handleAddSection(section: Section) {
    set((state: Store) => {
      const guides = state.guides.map((guide) => {
        if (guide.id === section.guide) {
          guide.sections = [...guide.sections, section];
        }

        return guide;
      });
      return { guides };
    });
  }

  function handleRemoveSection(section: Section) {
    set((state: Store) => {
      const guides = state.guides.map((guide) => {
        if (guide.id === section.guide) {
          guide.sections = guide.sections.filter((s) => s.id !== section.id);
        }

        return guide;
      });
      return { guides };
    });
  }

  function handleSetSelectedSection(section: Section) {
    set(() => ({ selectedSection: section }));
  }

  return {
    selectedSection: null,
    addSection: handleAddSection,
    removeSection: handleRemoveSection,
    setSelectedSection: handleSetSelectedSection,
  };
}
