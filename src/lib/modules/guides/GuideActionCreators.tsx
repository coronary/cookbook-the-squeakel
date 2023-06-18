import { useStore } from "@/app/page";
import { Routes } from "@/lib/constants/ApiRoutes";
import HttpService from "@/lib/utils/HttpService";

export async function getGuidesByCookbookName(name: string) {
  try {
    const cookbooks = await HttpService.get(Routes.COOKBOOK_GET_ALL, {
      game: "60ae73e09113a40015ca98e3",
      name: name,
    });
    console.log("🚀 ~ file: page.tsx:13 ~ Cookbook ~ cookbooks:", cookbooks);
    const guides = await HttpService.get(
      Routes.GUIDES_GET_ALL(cookbooks[0]?._id)
    );
    useStore.setState({ guides });
  } catch (err) {
    // console.log("🚀 ~ file: page.tsx:17 ~ Cookbook ~ err:", err);
    useStore.setState({ guides: [] });
  }
}
