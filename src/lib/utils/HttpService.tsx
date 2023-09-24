import axios from "axios";
import qs from "qs";
import { itemFromUrl } from "./SectionUtils";

const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

class HttpService {
  async get(route: string, params: any = {}) {
    const res = await axiosInstance.get(route, {
      params,
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      },
    });
    return res.data;
  }

  async getFromUrl(routeParam: string, route: string, params: any = {}) {
    const res = await axiosInstance.get(route, {
      params,
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      },
    });

    return itemFromUrl(res.data, routeParam);
  }

  async post(route: string, body: any = {}) {
    const res = await axiosInstance.post(route, body);
    return res.data;
  }
}

const httpService = new HttpService();

export default httpService;
