export interface Cookbook {
  id: string;
  name: string;
  bannerUrl: string;
  avatarUrl: string;
  roles: { [key: string]: string };
  features: Record<string, boolean>;
}
