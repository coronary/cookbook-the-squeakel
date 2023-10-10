"use client";

import { SwipeView } from "@/lib/ui/SwipeView/SwipeView";
import * as React from "react";
import { Cookbook } from "./CookbookTypes";
import CookbookSidebar from "../sidebar/CookbookSidebar";
import Sidebar from "../sidebar/Sidebar";
import classNames from "classnames";
import HttpService from "@/lib/utils/HttpService";
import { Routes } from "@/lib/constants/ApiRoutes";
import { Guide } from "../guides/GuideTypes";
import { User } from "../users/UserTypes";

export const CookbookContext = React.createContext<{
  cookbook: undefined | Cookbook;
  guides: Guide[];
  user: User | undefined | null;
}>({
  cookbook: undefined,
  guides: [],
  user: undefined,
});

export const CookbookLayout = ({
  cookbookName,
  cookbook,
  cookbooks,
  guides,
  children,
}: {
  cookbookName;
  cookbook: Cookbook;
  cookbooks: Cookbook[];
  guides: any;
  children: any;
}) => {
  const [user, setUser] = React.useState<User | null | undefined>(undefined);

  async function fetchUser() {
    try {
      const user = await HttpService.get(Routes.LOGIN_SUCCESS);
      setUser({ ...user } ?? null);
    } catch (err) {
      console.log("Error fetching user ", err);
      setUser(null);
    }
  }

  React.useEffect(() => {
    fetchUser();
  }, []);

  return (
    <SwipeView>
      {(isOpen) => {
        return (
          <>
            {user !== undefined && (
              <>
                <CookbookSidebar
                  cookbookName={cookbookName}
                  cookbooks={cookbooks}
                />
                <Sidebar cookbook={cookbook} guides={guides} />

                <div
                  className={classNames(
                    "transition-all absolute left-0 bg-gray-900 w-screen h-screen md:h-full md:w-full md:relative md:left-0",
                    {
                      "left-80": isOpen,
                    },
                  )}
                >
                  <CookbookContext.Provider value={{ cookbook, guides, user }}>
                    {children}
                  </CookbookContext.Provider>
                </div>
              </>
            )}
          </>
        );
      }}
    </SwipeView>
  );
};
