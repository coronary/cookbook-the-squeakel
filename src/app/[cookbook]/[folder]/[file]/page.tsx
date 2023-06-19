import { Routes } from "@/lib/constants/ApiRoutes";
import HttpService from "@/lib/utils/HttpService";
import * as React from "react";
import { Markdown } from "@/lib/ui/markdown/Markdown";
import { itemFromUrl, parseBody } from "@/lib/utils/SectionUtils";

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

  const { gifs, body } = parseBody(section.body);

  return (
    <div className="scrollbar overflow-y-scroll flex flex-1">
      <head>
        <title>{section.title}</title>
        <meta name="description" content={`${body?.slice(0, 150)}...`} />
        {gifs != null && <meta name="og:image" content={gifs} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="og:url"
          content={`https://cookbook.gg/${cookbookParam}/${folder}/${file}`}
        />
        <meta property="og:title" content={section.title} />
        <meta name="theme-color" content="#77d1cc" />
      </head>
      <Markdown body={section.body} />
    </div>
  );
}
