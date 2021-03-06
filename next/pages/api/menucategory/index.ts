import type { NextApiRequest, NextApiResponse } from "next";
import IMenu from "../../../lib/model/IMenu";
import axios from "../../../lib/axios";
import { AxiosResponse } from "axios";
import jwt from "next-auth/jwt";
import { apiserverURL } from "../../../lib/envVariable";

const secret = process.env.SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IMenu[] | IMenu>
) {
  if (req.method === "GET") {
    const apiserverRes = await fetch(apiserverURL + "/menucategory");
    const data: IMenu[] = await apiserverRes.json();
    res.status(apiserverRes.status).json(data);
  } else if (req.method === "POST") {
    const token = await jwt.getToken({ req, secret });
    if (token) {
      await axios
        .post(apiserverURL + "/menucategory", req.body)
        .then((apiserverRes: AxiosResponse) => {
          res.status(apiserverRes.status).json(apiserverRes.data);
        });
    } else {
      res.status(401).end();
    }
  }
}
