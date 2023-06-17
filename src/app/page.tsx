import { create } from "zustand";
import { Editor } from "../lib/ui/editor/editor";
import styles from "./page.module.css";

export const useStore = create(() => ({
  cookbooks: [],
}));

export default function Home() {
  return (
    <main className={"flex-1 overflow-y-auto"}>
      <Editor />
    </main>
  );
}
