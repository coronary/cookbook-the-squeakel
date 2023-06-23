"use client";

import { SwipeView } from "@/lib/ui/SwipeView/SwipeView";
import * as React from "react";
import { Cookbook } from "./CookbookTypes";
import CookbookSidebar from "../sidebar/CookbookSidebar";
import Sidebar from "../sidebar/Sidebar";
import classNames from "classnames";

export const CookbookContext = React.createContext<{
  cookbook: undefined | Cookbook;
  guides: any;
}>({
  cookbook: undefined,
  guides: undefined,
});

export const CookbookLayout = ({
  cookbook,
  cookbooks,
  guides,
  children,
}: {
  cookbook: Cookbook;
  cookbooks: Cookbook[];
  guides: any;
  children: any;
}) => {
  return (
    <SwipeView>
      {(isOpen) => {
        return (
          <>
            <CookbookSidebar cookbooks={cookbooks} />
            <Sidebar cookbook={cookbook} guides={guides} />
            <div
              className={classNames(
                "transition-all absolute left-0 bg-gray-900 w-screen h-screen md:h-full md:w-full md:relative md:left-0",
                {
                  "left-80": isOpen,
                }
              )}
            >
              <CookbookContext.Provider value={{ cookbook, guides }}>
                {children}
              </CookbookContext.Provider>
            </div>
          </>
        );
      }}
    </SwipeView>
  );
};
