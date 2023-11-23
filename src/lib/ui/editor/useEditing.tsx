import { useCookbookStore } from "@/store/store";
import * as React from "react";

export default function useEditing({ initialBody }) {
  const { cookbook, user } = useCookbookStore((state) => state);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [body, setBody] = React.useState<string>(initialBody);
  const canEdit =
    user != null && cookbook != null
      ? cookbook.roles[user.id] || user.superAdmin
      : false;

  return {
    isEditing,
    setIsEditing,
    body,
    setBody,
    canEdit,
  };
}
