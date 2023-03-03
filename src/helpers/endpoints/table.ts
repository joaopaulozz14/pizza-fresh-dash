import { endpoint } from "./index";

export const product = {
  createTable: () => {
    `${endpoint.baseUrl}/table`;
  },
  listTable: () => {
    `${endpoint.baseUrl}/table`;
  },
  tableById: (id: string) => {
    `${endpoint.baseUrl}/table/${id}`;
  },
};
