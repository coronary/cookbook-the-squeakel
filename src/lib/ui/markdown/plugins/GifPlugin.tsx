import { visit } from "unist-util-visit";
import { v4 as uuid } from "uuid";
import { GifElement } from "./GifElement";

export const GifPlugin = () => {
  return (markdownAST) => {
    visit(markdownAST, "text", (node) => {
      if (node.value.includes("gif:http")) {
        const value = node.value.replace("gif:", "");
        const srcs = value.split(",");

        node.value = srcs.map((src) => (
          <GifElement value={node.value} src={src} key={uuid()} />
        ));
      }
    });
    return markdownAST;
  };
};
