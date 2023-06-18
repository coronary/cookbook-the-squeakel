import * as React from "react";
import ReactMarkdown from "react-markdown";
import { initialDoc } from "../editor/initialDoc";
import markdownComponents from "./components";
import remarkGfm from "remark-gfm";
import dynamic from "next/dynamic";

import styles from "./Markdown.module.css";
import { GifPlugin } from "./plugins/GifPlugin";

export const Markdown = () => {
  return (
    <ReactMarkdown
      className="m-12"
      components={markdownComponents}
      rehypePlugins={[GifPlugin]}
      remarkPlugins={[]}
    >
      {initialDoc}
    </ReactMarkdown>
  );
};
