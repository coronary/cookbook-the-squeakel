import * as React from "react";
import { parseBody } from "@/lib/utils/SectionUtils";
import { Metadata } from "next";
import { SectionLayout } from "@/lib/modules/sections/SectionLayout";
import HttpService from "@/lib/utils/HttpService";
import { Routes } from "@/lib/constants/ApiRoutes";

export default async function Section({ params }) {
  return <SectionLayout guideUrl={params.folder} sectionUrl={params.file} />;
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const { cookbook, folder, file } = params;
  const section = await HttpService.get(
    Routes.SECTION_GET_FROM_NAME(cookbook, folder, file)
  );
  const { gif, body, video } = parseBody(section?.body ?? "");

  return {
    title: section?.name,
    twitter: { card: "summary_large_image" },
    description: `${body?.slice(0, 1000)}...`,
    authors: [{ name: cookbook.name }],
    themeColor: "#77d1cc",
    openGraph: {
      ...(gif != null && { images: [gif] }),
      ...(video != null && { videos: [video] }),
      title: section?.name,
      description: `${body?.slice(0, 1000)}...`,
      url: `https://cookbook.gg/${cookbook}/${folder}/${file}`,
      siteName: "cookbook.gg",
      authors: [cookbook.name],
    },
  };
}
