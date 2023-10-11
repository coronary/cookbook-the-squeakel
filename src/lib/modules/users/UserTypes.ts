export interface SocialLinks {
  twitter?: string;
  discord?: string;
  youtube?: string;
  patreon?: string;
}

export interface User {
  id: string;
  discordId: string;
  discordUsername: string;
  discordAvatar: string;
  socialLinks?: SocialLinks;
  superAdmin?: boolean;
}
