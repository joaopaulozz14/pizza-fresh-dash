import { endpoint } from "./index";

export const order = {
  createOrder: () => `${endpoint.baseUrl}/order`,
};
