import { Routes } from "@/lib/constants/ApiRoutes";
import HttpService from "@/lib/utils/HttpService";
import { itemFromUrl } from "@/lib/utils/SectionUtils";

export async function getSectionFromUrl(params) {
  const { cookbook: cookbookParam, folder, file } = params;
  const games = await HttpService.get(Routes.GAMES_GET_ALL, {
    name: "melee",
  });
  const cookbook = await HttpService.getFromUrl(
    cookbookParam,
    Routes.COOKBOOK_GET_ALL,
    {
      game: games[0]?._id,
    }
  );
  const guide = await HttpService.getFromUrl(
    folder,
    Routes.GUIDES_GET_ALL(cookbook._id)
  );
  return itemFromUrl(guide.sections, file);
}
