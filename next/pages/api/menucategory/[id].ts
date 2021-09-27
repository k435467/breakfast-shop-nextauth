import type { NextApiRequest, NextApiResponse } from "next";
import IMenu from "../../../lib/model/IMenu";
import axios from "../../../lib/axios";
import { AxiosResponse } from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse<IMenu>) {
  const { id } = req.query;
  if (req.method === "GET") {
    await axios
      .get("http://localhost:8080/menucategory/" + id)
      .then((apiserverRes: AxiosResponse) => {
        res.status(apiserverRes.status).json(apiserverRes.data);
      });
  } else if (req.method === "PUT") {
    await axios
      .put("http://localhost:8080/menucategory/" + id, req.body)
      .then((apiserverRes: AxiosResponse) => {
        res.status(apiserverRes.status).json(apiserverRes.data);
      });
  } else if (req.method === "DELETE") {
    await axios
      .delete("http://localhost:8080/menucategory/" + id)
      .then((apiserverRes: AxiosResponse) => {
        res.status(apiserverRes.status).json(apiserverRes.data);
      });
  }
}
