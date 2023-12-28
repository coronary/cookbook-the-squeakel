import { Routes } from "@/lib/constants/ApiRoutes";
import HttpService from "@/lib/utils/HttpService";
import { useCookbookStore } from "@/store/store";

export async function addGuide(cookbookId: string, guideName: string) {
  const { addGuide } = useCookbookStore.getState();
  try {
    const guide = await HttpService.post(Routes.GUIDES_ADD(cookbookId), {
      name: guideName,
    });
    addGuide(guide);
  } catch (err) {
    console.log(err);
  }
}
