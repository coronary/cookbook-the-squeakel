import * as React from "react";
import ReactMarkdown from "react-markdown";
import { initialDoc } from "../editor/initialDoc";
import markdownComponents from "./components";
import rehypeRaw from "rehype-raw";
import styles from "./Markdown.module.css";
import { GifPlugin } from "./plugins/GifPlugin";
import remarkGfm from "./plugins/GFM";
import { VidPlugin } from "./plugins/VidPlugin";

export const Markdown = ({ body }: { body?: string }) => {
  return (
    <ReactMarkdown
      components={markdownComponents}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[GifPlugin, VidPlugin, rehypeRaw as any]}
    >
      {body ?? initialDoc}
    </ReactMarkdown>
  );
};
