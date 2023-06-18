import { Cookbook } from "@/lib/modules/cookbooks/CookbookTypes";
import { FolderIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const buildCookbooks = (cookbooks: Cookbook[]) => {
  return cookbooks.map((cookbook) => {
    return {
      name: cookbook.name,
      href: "#",
      icon: FolderIcon,
      current: false,
      count: undefined,
    };
  });
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const GuideList = ({ guides }: any) => {
  return guides.map((guide: any) => {
    return (
      <li key={guide.title}>
        <a
          href={"#"}
          className={classNames(
            guide.current
              ? "bg-indigo-700 text-white"
              : "text-indigo-200 hover:text-white hover:bg-teal-500",
            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
          )}
        >
          <FolderIcon
            className={classNames(
              guide.current
                ? "text-white"
                : "text-indigo-200 group-hover:text-white",
              "h-6 w-6 shrink-0"
            )}
            aria-hidden="true"
          />
          {guide.title}
          {guide.sections.lenght ? (
            <span
              className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-indigo-600 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-indigo-500"
              aria-hidden="true"
            >
              {guide.count}
            </span>
          ) : null}
        </a>
      </li>
    );
  });
};

export default function Sidebar({
  cookbook,
  guides,
}: {
  cookbook: Cookbook;
  guides: any[];
}) {
  return (
    <div className="h-screen w-64 flex flex-col gap-y-5 overflow-y-auto bg-slate-800">
      <div className="flex items-center p-2">
        <Image
          className="w-auto rounded"
          src={cookbook.banner_url}
          alt="Your Company"
          width={0}
          height={0}
        />
      </div>
      <nav className="flex flex-1 flex-col px-4 pb-4">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              <GuideList guides={guides} />
            </ul>
          </li>
          {/* <li className="mt-auto w-full">
            <a
              href="#"
              className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-indigo-700"
            >
              <img
                className="h-8 w-8 rounded-full bg-indigo-700"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">Tom Cook</span>
            </a>
          </li> */}
        </ul>
      </nav>
    </div>
  );
}
