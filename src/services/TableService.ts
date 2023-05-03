import { json } from "react-router-dom";
import { endpoint } from "../helpers/endpoints";
import { Api } from "../helpers/endpoints/Api";
import { Table, TableResponse } from "../types/api/table";

export const TableService = {
  getLista: () =>
    Api(endpoint.listTable(), {
      method: "GET",
    }).then((res) => res.json()),

  getByID: (id: string) =>
    Api(endpoint.tableById(id), {
      method: "GET",
    }).then((res) => res.json()),

  create: (table: Table) =>
    Api(endpoint.createTable(), {
      method: "POST",
      body: JSON.stringify(table),
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => res.json()),

  updateByID: ({ number, id }: TableResponse) =>
    Api(endpoint.tableById(id), {
      method: "PATCH",
      body: JSON.stringify(number),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json()),

  deleteByID: (id: string) =>
    Api(endpoint.tableById(id), {
      method: "DELETE",
    }).then((response) => response.json()),
};
