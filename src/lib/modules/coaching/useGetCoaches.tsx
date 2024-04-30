import { Routes } from "@/lib/constants/ApiRoutes";
import HttpService from "@/lib/utils/HttpService";
import { useQuery } from "@tanstack/react-query";
import { User } from "../users/UserTypes";

export async function getCoaches(): Promise<User[]> {
  try {
    const users = await HttpService.get(Routes.COACHES_GET());
    return users;
  } catch {
    return [];
  }
}

export function useGetCoaches() {
  return useQuery({
    queryKey: ["coaches"],
    queryFn: getCoaches,
  });
}
