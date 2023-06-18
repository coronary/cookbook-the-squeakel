import { Cookbook } from "@/lib/modules/cookbooks/CookbookTypes";
import Image from "next/image";
import Logo from "../../../app/logo.svg";
import { MediaRoutes } from "@/lib/constants/ApiRoutes";
import Link from "next/link";

const CookbookList = ({ cookbooks }: { cookbooks: Cookbook[] }) => {
  return (
    <>
      {cookbooks.map((cookbook: Cookbook) => {
        const { character, name } = cookbook;
        return (
          <li key={cookbook.name}>
            <Link href={`/${name}`}>
              <Image
                className="w-10 h-10 my-4"
                src={MediaRoutes.CHARACTER_ICON("melee", character.name)}
                alt="Cookbook.gg"
                width={64}
                height={64}
              />
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default function Sidebar({ cookbooks }: { cookbooks: Cookbook[] }) {
  return (
    <div className="h-screen min-w-fit w-18 flex flex-col overflow-y-auto bg-slate-900 justify-center items-center py-3 px-1">
      <div className="flex items-center">
        <Image
          className="w-10 h-10"
          src={Logo}
          alt="Cookbook.gg"
          width={0}
          height={0}
        />
      </div>
      <nav className="flex flex-1 flex-col px-4 pb-4">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              <CookbookList cookbooks={cookbooks} />
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
