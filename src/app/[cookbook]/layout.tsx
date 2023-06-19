import Sidebar from "@/lib/modules/sidebar/Sidebar";
import HttpService from "@/lib/utils/HttpService";
import { Routes } from "@/lib/constants/ApiRoutes";

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
    const cookbook = await HttpService.getFromUrl(
      params.cookbook,
      Routes.COOKBOOK_GET_ALL,
      {
        game: games[0]?._id,
      }
    );
    const guides = await HttpService.get(Routes.GUIDES_GET_ALL(cookbook?._id));

    content = (
      <>
        <Sidebar cookbook={cookbook} guides={guides} />
        {children}
      </>
    );
  } catch (err) {
    console.log(err);
    content = <>Error</>;
  }

  return <div className="flex flex-1">{content}</div>;
}
