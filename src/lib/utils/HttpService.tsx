import axios from "axios";
import qs from "qs";

const API_URL = process.env.API_URL ?? "localhost:3001";

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
}

const httpService = new HttpService();

export default httpService;
