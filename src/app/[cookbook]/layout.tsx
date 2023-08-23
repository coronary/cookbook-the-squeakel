import HttpService from "@/lib/utils/HttpService";
import { Routes } from "@/lib/constants/ApiRoutes";
import { CookbookLayout } from "@/lib/modules/cookbooks/CookbookLayout";

export default async function Layout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const { cookbook: cookbookName } = params;
  let content = <></>;
  try {
    const games = await HttpService.get(Routes.GAMES_GET_ALL, {
      filters: { name: "melee" },
    });
    const cookbooks = await HttpService.get(Routes.COOKBOOK_GET_ALL, {
      filters: { game: games[0].id, preview: false },
    });
    const cookbook = await HttpService.get(
      Routes.COOKBOOK_GET_FROM_NAME(cookbookName),
      { filters: { game: games[0].id } }
    );
    const guides = cookbook.guides;

    content = (
      <CookbookLayout
        cookbookName={cookbookName}
        cookbook={cookbook}
        cookbooks={cookbooks}
        guides={guides}
      >
        {children}
      </CookbookLayout>
    );
  } catch (err) {
    console.log(err);
    content = <>Error</>;
  }

  return <div className="flex flex-1 relative">{content}</div>;
}
