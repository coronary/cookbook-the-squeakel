import { visit } from "unist-util-visit";
import { v4 as uuid } from "uuid";
import { GifElement } from "./GifElement";

export const GifPlugin = () => {
  return (markdownAST) => {
    visit(markdownAST, "text", (node) => {
      if (node.value.includes("gif:") && node.value.includes("http")) {
        const value = node.value.substring(node.value.indexOf("gif:") + 4);
        const srcs = value.split(",");
        node.value = srcs.map((src) => <GifElement src={src} key={uuid()} />);
      }
    });
    return markdownAST;
  };
};
