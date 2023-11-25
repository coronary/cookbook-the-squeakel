"use client";

import { User } from "@/lib/modules/users/UserTypes";

export interface UserStore {
  user: User | null | undefined;
  setUser: (user: User | null | undefined) => void;
}

export function createUserStore(set): UserStore {
  function handleSetUser(user: User | null | undefined) {
    set((state) => ({ ...state, user }));
  }

  return {
    user: undefined,
    setUser: handleSetUser,
  };
}
