import axios from "axios";
import qs from "qs";

const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
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

  async post(route: string, body: any = {}) {
    const res = await axiosInstance.post(route, body);
    return res.data;
  }
}

const httpService = new HttpService();

export default httpService;
