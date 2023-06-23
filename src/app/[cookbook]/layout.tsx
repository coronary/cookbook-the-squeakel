import HttpService from "@/lib/utils/HttpService";
import { Routes } from "@/lib/constants/ApiRoutes";
import { CookbookLayout } from "@/lib/modules/cookbooks/CookbookLayout";
import { itemFromUrl } from "@/lib/utils/SectionUtils";

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
    const cookbook = itemFromUrl(cookbooks, params.cookbook);
    const guides = await HttpService.get(Routes.GUIDES_GET_ALL(cookbook?._id));

    content = (
      <CookbookLayout cookbook={cookbook} cookbooks={cookbooks} guides={guides}>
        {children}
      </CookbookLayout>
    );
  } catch (err) {
    console.log(err);
    content = <>Error</>;
  }

  return <div className="flex flex-1 relative">{content}</div>;
}
