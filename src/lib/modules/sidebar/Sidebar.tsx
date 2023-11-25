"use client";
import * as React from "react";
import classNames from "classnames";
import Link from "next/link";
import Divider from "@/lib/ui/divider/Divider";
import GuideList from "./guide/GuideList";
import { Cookbook } from "@/lib/modules/cookbooks/CookbookTypes";
import { FilmIcon } from "@heroicons/react/24/outline";
import { SibdeBarBanner } from "./SideBarBanner";
import { Guide } from "../guides/GuideTypes";
import {
  SidebarContextMenu,
  SideBarContextMenuType,
} from "./context-menu/SideBarContextMenu";
import { SideBarModal } from "./SideBarModal";
import { useCookbookStore } from "@/store/store";
import { canEdit } from "@/lib/utils/canEdit";

export default function Sidebar({
  cookbook,
  guides,
}: {
  cookbook: Cookbook;
  guides: Guide[];
}) {
  const {
    user,
    contextMenuData,
    setContextMenuData,
    modal,
    setModal,
    selectedGuide,
    selectedSection,
  } = useCookbookStore();

  React.useEffect(() => {
    window.addEventListener("click", handleOnClick);
    return () => {
      window.removeEventListener("click", handleOnClick);
    };
  }, []);

  function handleOnClick() {
    setContextMenuData(null);
  }

  return (
    <div className="min-h-screen shrink-0 w-64 flex flex-col overflow-hidden bg-slate-800">
      <SideBarModal
        type={modal.type}
        open={modal.open}
        setOpen={(isOpen) => setModal({ ...modal, open: isOpen })}
        cookbook={cookbook}
        guide={selectedGuide}
        section={selectedSection}
      />
      {contextMenuData != null &&
        contextMenuData.position != null &&
        contextMenuData.type != null &&
        canEdit(user, cookbook) && (
          <SidebarContextMenu
            type={contextMenuData.type}
            position={contextMenuData.position}
          />
        )}
      <div className="flex items-center p-2">
        {cookbook.bannerUrl != null && (
          <SibdeBarBanner bannerUrl={cookbook.bannerUrl} name={cookbook.name} />
        )}
      </div>
      <nav
        className="scrollbar flex flex-1 flex-col px-4 pb-4 overflow-y-auto overflow-x-hidden"
        onContextMenu={(e) => {
          e.preventDefault();
          setContextMenuData({
            position: {
              x: e.pageX,
              y: e.pageY,
            },
            type: SideBarContextMenuType.DEFAULT,
          });
        }}
      >
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {/* <li>
                <Link
                  href={`/${cookbook.name}`}
                  className={classNames(
                    "text-indigo-200 hover:text-white hover:bg-teal-500",
                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  )}
                >
                  <HomeIcon
                    className={classNames(
                      "text-indigo-200 group-hover:text-white",
                      "h-6 w-6 shrink-0"
                    )}
                    aria-hidden="true"
                  />
                  Home
                </Link>
              </li> */}
              <li>
                <Link
                  href={`/${cookbook.name}/clips`}
                  className={classNames(
                    "text-indigo-200 hover:text-white hover:bg-teal-500",
                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  )}
                >
                  <FilmIcon
                    className={classNames(
                      "text-indigo-200 group-hover:text-white",
                      "h-6 w-6 shrink-0"
                    )}
                    aria-hidden="true"
                  />
                  Clips
                </Link>
              </li>
              <Divider />
              <GuideList cookbook={cookbook} guides={guides} />
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
