"use client";

import { User } from "@/lib/modules/users/UserTypes";
import { SetStore } from "./store";

export interface UserStore {
  user: User | null | undefined;
  setUser: (user: User | null | undefined) => void;
}

export function createUserStore(set: SetStore): UserStore {
  function handleSetUser(user: User | null | undefined) {
    set(() => ({ user }));
  }

  return {
    user: undefined,
    setUser: handleSetUser,
  };
}
