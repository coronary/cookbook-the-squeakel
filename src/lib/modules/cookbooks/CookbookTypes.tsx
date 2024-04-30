import { User } from "../users/UserTypes";

export interface Cookbook {
  id: string;
  name: string;
  bannerUrl: string;
  avatarUrl: string;
  roles: { [key: string]: string };
  coaches: User[];
  features: Record<string, boolean>;
}
