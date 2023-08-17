import * as React from "react";
import { Tag } from "./PostTypes";

export default function TagItem({ tag }: { tag: Tag }) {
  return <div>#{tag.name.toLowerCase()}</div>;
}
