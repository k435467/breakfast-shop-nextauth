import type { NextApiRequest, NextApiResponse } from "next";
import axios from "../../../lib/axios";
import { AxiosResponse } from "axios";
import IMenuItem from "../../../lib/model/IMenuItem";
import jwt from "next-auth/jwt";

const secret = process.env.SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IMenuItem>
) {
  if (req.method === "POST") {
    const token = await jwt.getToken({ req, secret });
    if (token) {
      await axios
        .post("http://localhost:8080/menuitem", req.body)
        .then((apiserverRes: AxiosResponse) => {
          res.status(apiserverRes.status).json(apiserverRes.data);
        });
    } else {
      res.status(401).end();
    }
  }
}
