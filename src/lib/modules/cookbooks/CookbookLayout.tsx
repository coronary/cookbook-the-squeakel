"use client";

import { SwipeView } from "@/lib/ui/SwipeView/SwipeView";
import * as React from "react";
import { Cookbook } from "./CookbookTypes";
import CookbookSidebar from "../sidebar/CookbookSidebar";
import Sidebar from "../sidebar/Sidebar";
import classNames from "classnames";
import HttpService from "@/lib/utils/HttpService";
import { Routes } from "@/lib/constants/ApiRoutes";
import { useCookbookStore } from "@/store/store";

export const CookbookLayout = ({
  cookbookName,
  cookbook,
  cookbooks,
  guides,
  children,
}: {
  cookbookName: string;
  cookbook: Cookbook;
  cookbooks: Cookbook[];
  guides: any;
  children: any;
}) => {
  const {
    user,
    guides: storeGuides,
    cookbook: storeCookbook,
    cookbooks: storeCookbooks,
    setInitialState,
  } = useCookbookStore((state) => state);

  React.useEffect(() => {
    async function fetchUser() {
      try {
        const user = await HttpService.get(Routes.LOGIN_SUCCESS);
        setInitialState(user, cookbook, cookbooks, guides);
      } catch (err) {
        console.log("Error fetching user ", err);
        setInitialState(null, cookbook, cookbooks, guides);
      }
    }

    fetchUser();
  }, [cookbook, cookbooks, guides, setInitialState]);

  return (
    <SwipeView>
      {(isOpen: boolean) => {
        return (
          <>
            {user !== undefined && (
              <>
                <CookbookSidebar
                  cookbookName={cookbookName}
                  cookbooks={storeCookbooks}
                />

                {storeCookbook && (
                  <Sidebar guides={storeGuides} cookbook={storeCookbook} />
                )}

                <div
                  className={classNames(
                    "transition-all absolute left-0 bg-gray-900 w-screen h-screen md:h-full md:w-full md:relative md:left-0",
                    {
                      "left-80": isOpen,
                    },
                  )}
                >
                  {children}
                </div>
              </>
            )}
          </>
        );
      }}
    </SwipeView>
  );
};
