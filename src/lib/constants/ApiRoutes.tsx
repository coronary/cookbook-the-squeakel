export const Routes = {
  GAMES_GET_ALL: "/games",
  COOKBOOK_GET_ALL: `/cookbooks`,
  GUIDES_GET_ALL: (cookbookId) => `/cookbooks/${cookbookId}/guides`,
  GFYCAT: "/gfycat",
};

export const MediaRoutes = {
  CHARACTER_ICON: (game: string, character: string) =>
    `https://media.cookbook.gg/${game}/${character}.png`,
};
