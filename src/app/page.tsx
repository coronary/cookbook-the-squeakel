import { create } from "zustand";
import { Editor } from "../lib/ui/editor/editor";
import { Markdown } from "@/lib/ui/markdown/Markdown";

export const useStore = create(() => ({
  cookbooks: [],
  guides: [],
}));

export default function Home() {
  return (
    <main className={"scrollbar flex-1 overflow-y-auto"}>
      {/* <Editor /> */}
      <Markdown />
    </main>
  );
}
