import type { NextApiRequest, NextApiResponse } from "next";
import axios from "../../../lib/axios";
import { AxiosResponse } from "axios";
import IMenuItem from "../../../lib/model/IMenuItem";
import jwt from "next-auth/jwt";
import { apiserverURL } from "../../../lib/envVariable";

const secret = process.env.SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IMenuItem>
) {
  const { id } = req.query;
  if (req.method === "GET") {
    await axios
      .get(apiserverURL + "/menuitem/" + id)
      .then((apiserverRes: AxiosResponse) => {
        res.status(apiserverRes.status).json(apiserverRes.data);
      });
  } else {
    const token = await jwt.getToken({ req, secret });
    if (token) {
      if (req.method === "PUT") {
        await axios
          .put(apiserverURL + "/menuitem/" + id, req.body)
          .then((apiserverRes: AxiosResponse) => {
            res.status(apiserverRes.status).json(apiserverRes.data);
          });
      } else if (req.method === "DELETE") {
        await axios
          .delete(apiserverURL + "/menuitem/" + id)
          .then((apiserverRes: AxiosResponse) => {
            res.status(apiserverRes.status).json(apiserverRes.data);
          });
      }
    }
  }
}
