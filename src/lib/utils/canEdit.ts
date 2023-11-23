import { Cookbook } from "../modules/cookbooks/CookbookTypes";
import { User } from "../modules/users/UserTypes";

export function canEdit(user: User | null | undefined, cookbook: Cookbook) {
  return user != null && cookbook != null
    ? cookbook.roles[user.id] || user.superAdmin
    : false;
}
