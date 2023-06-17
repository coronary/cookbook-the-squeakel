import axios, { AxiosResponse } from "axios";

const API_URL = process.env.API_URL ?? "localhost:3001";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

class HttpService {
  async get(route: string) {
    const res = await axiosInstance.get(route);
    return res.data;
  }
}

const httpService = new HttpService();

export default httpService;
