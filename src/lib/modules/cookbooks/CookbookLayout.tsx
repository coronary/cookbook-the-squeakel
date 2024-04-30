"use client";

import * as React from "react";
import classNames from "classnames";
import { SwipeView } from "@/lib/ui/SwipeView/SwipeView";
import { Cookbook } from "./CookbookTypes";
import CookbookSidebar from "../sidebar/CookbookSidebar";
import Sidebar from "../sidebar/Sidebar";
import HttpService from "@/lib/utils/HttpService";
import { Routes } from "@/lib/constants/ApiRoutes";
import { useCookbookStore } from "@/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const COOKBOOK_ORDER = [
  "captain-falcon",
  "fox",
  "donkey-kong",
  "mewtwo",
  "sheik",
  "peach",
  "samus",
  "dr-mario",
  "game-and-watch",
];

const queryClient = new QueryClient();

function sortCookbooks(cookbooks: Cookbook[]): Cookbook[] {
  const sortedCookbooks: Cookbook[] = [];

  // Push ordered cookbooks first
  for (const cookbookName of COOKBOOK_ORDER) {
    const cookbook = cookbooks.find((c) => c.name === cookbookName);
    if (cookbook != null) {
      sortedCookbooks.push(cookbook);
    }
  }

  // Push the rest to the end
  for (const cookbook of cookbooks) {
    if (!sortedCookbooks.find((c) => c.name === cookbook.name)) {
      sortedCookbooks.push(cookbook);
    }
  }

  return sortedCookbooks;
}

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
        setInitialState(user, cookbook, sortCookbooks(cookbooks), guides);
      } catch (err) {
        console.log("Error fetching user ", err);
        setInitialState(null, cookbook, cookbooks, guides);
      }
    }

    fetchUser();
  }, [cookbook, cookbooks, guides, setInitialState]);

  return (
    <QueryClientProvider client={queryClient}>
      <SwipeView>
        {(isOpen: boolean) => {
          return (
            <>
              {user !== undefined && (
                <>
                  <CookbookSidebar
                    cookbookName={cookbookName}
                    cookbooks={storeCookbooks}
                    user={user}
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
    </QueryClientProvider>
  );
};
