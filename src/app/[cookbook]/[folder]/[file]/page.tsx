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
      url: `https://cookbook.gg/${cookbook}/${folder}/${file}`,
    },
  };
}
