import type { NextApiRequest, NextApiResponse } from "next";
import IMenu from "../../../lib/model/IMenu";
import axios from "../../../lib/axios";
import { AxiosResponse } from "axios";
import jwt from "next-auth/jwt";
import { apiserverURL } from "../../../lib/envVariable";

const secret = process.env.SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse<IMenu>) {
  const { id } = req.query;
  if (req.method === "GET") {
    await axios
      .get(apiserverURL + "/menucategory/" + id)
      .then((apiserverRes: AxiosResponse) => {
        res.status(apiserverRes.status).json(apiserverRes.data);
      });
  } else {
    const token = await jwt.getToken({ req, secret });
    if (token) {
      if (req.method === "PUT") {
        await axios
          .put(apiserverURL + "/menucategory/" + id, req.body)
          .then((apiserverRes: AxiosResponse) => {
            res.status(apiserverRes.status).json(apiserverRes.data);
          });
      } else if (req.method === "DELETE") {
        await axios
          .delete(apiserverURL + "/menucategory/" + id)
          .then((apiserverRes: AxiosResponse) => {
            res.status(apiserverRes.status).json(apiserverRes.data);
          });
      }
    } else {
      res.status(401).end();
    }
  }
}
