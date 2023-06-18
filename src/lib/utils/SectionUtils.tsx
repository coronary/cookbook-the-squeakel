export function titleToUrl(title: string): string {
  return title
    .replaceAll(/\s/g, "-")
    .replaceAll(/[^a-zA-Z\d-]/g, "")
    .toLowerCase();
}

export function itemFromUrl(items: any, url: string) {
  for (const item of items) {
    const title = titleToUrl(item.title ?? item.name);
    if (title === url) return item;
  }
}
