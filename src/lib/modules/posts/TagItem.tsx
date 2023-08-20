import * as React from "react";
import { Tag } from "./PostTypes";

export default function TagItem({ tag }: { tag: Tag }) {
  return (
    <div className="text-sm tracking-wide leading-relaxed">
      #{tag.name.toLowerCase()}
    </div>
  );
}
