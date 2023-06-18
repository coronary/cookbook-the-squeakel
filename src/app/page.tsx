import { Markdown } from "@/lib/ui/markdown/Markdown";

export default function Home() {
  return (
    <main className={"scrollbar flex-1 overflow-y-auto"}>
      {/* <Editor /> */}
      <Markdown />
    </main>
  );
}
