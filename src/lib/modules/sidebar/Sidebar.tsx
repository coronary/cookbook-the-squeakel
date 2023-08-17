import { Cookbook } from "@/lib/modules/cookbooks/CookbookTypes";
import { FilmIcon, HomeIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import Link from "next/link";
import { SibdeBarBanner } from "./SideBarBanner";
import Divider from "@/lib/ui/divider/Divider";
import GuideList from "./guide/GuideList";
import { Guide } from "../guides/GuideTypes";

export default function Sidebar({
  cookbook,
  guides,
}: {
  cookbook: Cookbook;
  guides: Guide[];
}) {
  return (
    <div className="min-h-screen shrink-0 w-64 flex flex-col overflow-hidden bg-slate-800">
      <div className="flex items-center p-2">
        {cookbook.bannerUrl != null && (
          <SibdeBarBanner bannerUrl={cookbook.bannerUrl} name={cookbook.name} />
        )}
      </div>
      <nav className="scrollbar flex flex-1 flex-col px-4 pb-4 overflow-y-auto overflow-x-hidden">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              <li>
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
              </li>
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
