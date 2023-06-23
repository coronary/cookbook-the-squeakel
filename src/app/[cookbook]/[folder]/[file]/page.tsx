import * as React from "react";
import { Markdown } from "@/lib/ui/markdown/Markdown";
import { parseBody } from "@/lib/utils/SectionUtils";
import { Metadata } from "next";
import { getSectionFromUrl } from "@/lib/modules/guides/SectionUtils";

export default async function Section({ params }) {
  const section = await getSectionFromUrl(params);

  return (
    <div className="scrollbar overflow-y-scroll flex flex-1 h-full overflow-x-hidden p-8">
      <Markdown body={section?.body} />
    </div>
  );
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const { cookbook, folder, file } = params;
  const section = await getSectionFromUrl(params);
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
