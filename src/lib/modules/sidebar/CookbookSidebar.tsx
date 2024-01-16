import { Cookbook } from "@/lib/modules/cookbooks/CookbookTypes";
import Image from "next/image";
import Logo from "../../../app/logo.svg";
import Link from "next/link";
import classNames from "classnames";
import { User } from "../users/UserTypes";
import { Routes } from "@/lib/constants/ApiRoutes";

const CookbookList = ({
  cookbookName,
  cookbooks,
}: {
  cookbookName: string;
  cookbooks: Cookbook[];
}) => {
  return (
    <>
      {cookbooks.map((cookbook: Cookbook) => {
        const { avatarUrl, name } = cookbook;
        return (
          <li key={name}>
            <Link href={`/${name}`}>
              <Image
                className={classNames("w-10 h-10 my-4", {
                  ["grayscale"]: cookbookName !== name,
                  ["opacity-50"]: cookbookName !== name,
                })}
                src={avatarUrl}
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

export default function Sidebar({
  cookbookName,
  cookbooks,
  user,
}: {
  cookbookName: string;
  cookbooks: Cookbook[];
  user: User | null | undefined;
}) {
  return (
    <div className="h-screen min-w-fit flex flex-col overflow-y-auto bg-slate-900 justify-center items-center py-3 px-1">
      <div className="flex items-center">
        <Image
          className="w-10 h-10"
          src={Logo}
          alt="Cookbook.gg"
          width={0}
          height={0}
        />
      </div>
      <nav className="flex flex-1 flex-col px-4 pb-4 relative">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              <CookbookList cookbookName={cookbookName} cookbooks={cookbooks} />
            </ul>
          </li>
        </ul>
        {user != null && typeof user !== "string" && (
          <Image
            className={classNames(
              "absolute bottom-0 left-0 right-0 mx-auto w-10 h-10 my-4 rounded",
            )}
            src={Routes.DISCORD_AVATAR(
              user.discordId,
              user.discordAvatar,
            )}
            alt="Cookbook.gg"
            width={64}
            height={64}
          />
        )}
      </nav>
    </div>
  );
}
