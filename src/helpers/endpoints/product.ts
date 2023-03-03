import { endpoint } from "./index";

export const product = {
  createProduct: () => {
    `${endpoint.baseUrl}/product`;
  },
  listProduct: () => {
    `${endpoint.baseUrl}/product`;
  },
  productById: (id: string) => {
    `${endpoint.baseUrl}/product/${id}`;
  },
};
