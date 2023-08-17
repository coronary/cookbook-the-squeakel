import { User } from "../users/UserTypes";

export interface Post {
  id: string;
  cookbook: string;
  user: User;
  body: string;
  tags: Tag[];
}

export interface Tag {
  id: string;
  name: string;
  cookbook: string;
  color?: string;
}
