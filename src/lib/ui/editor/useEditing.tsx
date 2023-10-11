import * as React from "react";
import { CookbookContext } from "@/lib/modules/cookbooks/CookbookLayout";

export default function useEditing({ initialBody }) {
  const { cookbook, user } = React.useContext(CookbookContext);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [body, setBody] = React.useState<string>(initialBody);
  const canEdit = user != null && cookbook != null
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
