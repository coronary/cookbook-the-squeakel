import { Section } from "../sections/SectionTypes";

export interface Guide {
  id: string;
  cookbook: string;
  name: string;
  sections: Section[];
}
