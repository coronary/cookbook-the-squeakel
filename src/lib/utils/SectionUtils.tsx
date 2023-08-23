import { gfyTransform } from "./GfycatUtils";

export function titleToUrl(title: string): string {
  return title
    .replaceAll(/\s/g, "-")
    .replaceAll(/[^a-zA-Z\d-]/g, "")
    .toLowerCase();
}

export function itemFromUrl(items: any, url: string) {
  for (const item of items) {
    const title = item.name ?? item.title;
    if (title === url) return item;
  }
}

export const parseBody = (string: string) => {
  const matches = string.match(/(gif:)\S*/g);
  if (matches == null || !matches.length) return {};
  const url = matches?.[0].split(",")?.[0].replace(/(gif:)/, "");
  const videos: string[] = [];
  const gifs: string[] = [];

  if (url.includes(".gif")) gifs.push(url);
  if (url.includes(".mp4")) videos.push(url);

  return {
    gifs,
    videos,
    body: string.replace(/(gif:)|(vid:)|(loop:)|(tweet:)|(#)/g, ""),
  };
};
