"use client";

import { Section } from "@/lib/modules/sections/SectionTypes";

export interface SectionStore {
  selectedSection: Section | null | undefined;
  addSection: (section: Section) => void;
  removeSection: (section: Section) => void;
  setSelectedSection: (section: Section) => void;
}

export function createSectionStore(set): SectionStore {
  function handleAddSection(section: Section) {
    set((state) => {
      const guides = state.guides.map((guide) => {
        if (guide.id === section.guide) {
          guide.sections = [...guide.sections, section];
        }

        return guide;
      });
      return { ...state, guides };
    });
  }

  function handleRemoveSection(section: Section) {
    set((state) => {
      const guides = state.guides.map((guide) => {
        if (guide.id === section.guide) {
          guide.sections = guide.sections.filter((s) => s.id !== section.id);
        }

        return guide;
      });
      return { ...state, guides };
    });
  }

  function handleSetSelectedSection(section: Section) {
    set((state) => ({ ...state, selectedSection: section }));
  }

  return {
    selectedSection: null,
    addSection: handleAddSection,
    removeSection: handleRemoveSection,
    setSelectedSection: handleSetSelectedSection,
  };
}
