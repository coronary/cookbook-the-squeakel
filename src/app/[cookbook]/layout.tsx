"use client";
import Sidebar from "@/lib/modules/sidebar/Sidebar";
import HttpService from "@/lib/utils/HttpService";
import { Routes } from "@/lib/constants/ApiRoutes";
import { SwipeView } from "@/lib/ui/SwipeView/SwipeView";
import classNames from "classnames";
import CookbookSidebar from "@/lib/modules/sidebar/CookbookSidebar";

export default async function Layout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: any;
}) {
  let content = <></>;

  try {
    const games = await HttpService.get(Routes.GAMES_GET_ALL, {
      name: "melee",
    });
    const cookbooks = await HttpService.get(Routes.COOKBOOK_GET_ALL, {
      game: games[0]._id,
    });
    const cookbook = await HttpService.getFromUrl(
      params.cookbook,
      Routes.COOKBOOK_GET_ALL,
      {
        game: games[0]?._id,
      }
    );
    const guides = await HttpService.get(Routes.GUIDES_GET_ALL(cookbook?._id));

    content = (
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
                {children}
              </div>
            </>
          );
        }}
      </SwipeView>
    );
  } catch (err) {
    console.log(err);
    content = <>Error</>;
  }

  return <div className="flex flex-1 relative">{content}</div>;
}
