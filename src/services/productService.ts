import { productType } from "../types";
import httpService from "./httpService";

const productEndPoint = "products/";

const productService = {
  getAll: async () => {
    const { data } = await httpService.get(productEndPoint);
    return data;
  },
  create: async (payload: productType) => {
    const { data } = await httpService.post(productEndPoint, payload);
    return data;
  },
  remove: async (id: string) => {
    await httpService.delete(productEndPoint + id);
    return id;
  },
  update: async (id: string, payload: productType) => {
    const { data } = await httpService.get(productEndPoint + id, payload);
    return data;
  },
};

export default productService;
