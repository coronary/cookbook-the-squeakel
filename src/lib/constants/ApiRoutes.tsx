export const Routes = {
  LOGIN: "/login",
  GAMES_GET_ALL: "/games",
  COOKBOOK_GET_ALL: `/cookbooks`,
  GUIDES_GET_ALL: (cookbookId) => `/cookbooks/${cookbookId}/guides`,
  SECTIONS_GET_ALL: (cookbookId, guideId) =>
    `/cookbooks/${cookbookId}/guides/${guideId}/sections`,
  COOKBOOK_GET_FROM_NAME: (cookbookName) => `/cookbookName/${cookbookName}`,
  GUIDE_GET_FROM_NAME: (cookbookName, guideName) =>
    `/cookbookName/${cookbookName}/guideName/${guideName}`,
  SECTION_GET_FROM_NAME: (cookbookName, guideName, sectionName) =>
    `/cookbookName/${cookbookName}/guideName/${guideName}/sectionName/${sectionName}`,

  GFYCAT: "/gfycat",
  POSTS_GET_ALL: (cookbookId) => `/cookbooks/${cookbookId}/posts`,
  DISCORD_AVATAR: (discordId, discordAvatar) =>
    `https://cdn.discordapp.com/avatars/${discordId}/${discordAvatar}`,
};

export const MediaRoutes = {
  CHARACTER_ICON: (game: string, character: string) =>
    `https://media.cookbook.gg/${game}/${character}.png`,
};
