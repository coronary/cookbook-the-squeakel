import { Routes } from "@/lib/constants/ApiRoutes";
import HttpService from "@/lib/utils/HttpService";
import * as React from "react";
import { Markdown } from "@/lib/ui/markdown/Markdown";
import { itemFromUrl } from "@/lib/utils/SectionUtils";

export default async function Section({ params }) {
  const { cookbook, folder, file } = params;
  const games = await HttpService.get(Routes.GAMES_GET_ALL, {
    name: "melee",
  });
  const cookbooks = await HttpService.get(Routes.COOKBOOK_GET_ALL, {
    game: games[0]?._id,
    name: cookbook,
  });
  const guides = await HttpService.get(
    Routes.GUIDES_GET_ALL(cookbooks[0]?._id)
  );

  const guide = itemFromUrl(guides, folder);
  const section = itemFromUrl(guide.sections, file);

  return (
    <div className="scrollbar overflow-y-scroll flex flex-1">
      <Markdown body={section.body} />
    </div>
  );
}
