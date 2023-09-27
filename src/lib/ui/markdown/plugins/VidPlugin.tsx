import { visit } from "unist-util-visit";
import { v4 as uuid } from "uuid";
import { VidElement } from "./VidElement.tsx";

export const VidPlugin = () => {
  return (markdownAST) => {
    visit(markdownAST, "text", (node) => {
      if (node.value.includes("vid:") && node.value.includes("http")) {
        const value = node.value.substring(node.value.indexOf("vid:") + 4);
        const srcs = value.split(",");
        node.value = srcs.map((src) => <VidElement src={src} key={uuid()} />);
      }
    });
    return markdownAST;
  };
};
