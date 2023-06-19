import { Routes } from "@/lib/constants/ApiRoutes";
import HttpService from "@/lib/utils/HttpService";
import * as React from "react";
import { Markdown } from "@/lib/ui/markdown/Markdown";
import { itemFromUrl, parseBody } from "@/lib/utils/SectionUtils";
import { Metadata } from "next";

export default async function Section({ params }) {
  const { cookbook: cookbookParam, folder, file } = params;
  const games = await HttpService.get(Routes.GAMES_GET_ALL, {
    name: "melee",
  });
  const cookbooks = await HttpService.get(Routes.COOKBOOK_GET_ALL, {
    game: games[0]?._id,
  });
  const cookbook = itemFromUrl(cookbooks, cookbookParam);
  const guides = await HttpService.get(Routes.GUIDES_GET_ALL(cookbook._id));

  const guide = itemFromUrl(guides, folder);
  const section = itemFromUrl(guide.sections, file);

  return (
    <div className="scrollbar overflow-y-scroll flex flex-1">
      <Markdown body={section?.body} />
    </div>
  );
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const { cookbook: cookbookParam, folder, file } = params;
  const games = await HttpService.get(Routes.GAMES_GET_ALL, {
    name: "melee",
  });
  const cookbooks = await HttpService.get(Routes.COOKBOOK_GET_ALL, {
    game: games[0]?._id,
  });
  const cookbook = itemFromUrl(cookbooks, cookbookParam);
  const guides = await HttpService.get(Routes.GUIDES_GET_ALL(cookbook._id));

  const guide = itemFromUrl(guides, folder);
  const section = itemFromUrl(guide.sections, file);

  const { gifs, body } = parseBody(section?.body ?? "");

  return {
    title: section?.title,
    twitter: { card: "summary_large_image" },
    description: `${body?.slice(0, 150)}...`,
    themeColor: "#77d1cc",
    openGraph: {
      images: [gifs ?? ""],
      title: section?.title,
      description: `${body?.slice(0, 150)}...`,
      url: `https://cookbook.gg/${cookbookParam}/${folder}/${file}`,
    },
  };
}
