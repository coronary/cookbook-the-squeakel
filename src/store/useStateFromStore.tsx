import { useShallow } from "zustand/react/shallow";
import { Store, useCookbookStore } from "./store";

export function useStateFromStore<T>(getState: (state: Store) => T): T {
  return useCookbookStore(useShallow(getState));
}
