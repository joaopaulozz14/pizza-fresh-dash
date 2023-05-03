import { endpoint } from "./index";

export const table = {
  createTable: () => `${endpoint.baseUrl}/table`,
  listTable: () => `${endpoint.baseUrl}/table`,
  tableById: (id: string) => `${endpoint.baseUrl}/table/${id}`,
};
