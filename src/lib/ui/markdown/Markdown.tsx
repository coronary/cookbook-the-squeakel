import * as React from "react";
import ReactMarkdown from "react-markdown";
import { initialDoc } from "../editor/initialDoc";
import markdownComponents from "./components";

import styles from "./Markdown.module.css";
import { GifPlugin } from "./plugins/GifPlugin";

export const Markdown = ({ body }: { body?: string }) => {
  return (
    <ReactMarkdown
      className="m-12"
      components={markdownComponents}
      rehypePlugins={[GifPlugin]}
      remarkPlugins={[]}
    >
      {body ?? initialDoc}
    </ReactMarkdown>
  );
};
