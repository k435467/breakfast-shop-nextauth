import type { NextApiRequest, NextApiResponse } from "next";
import axios from "../../../lib/axios";
import { AxiosResponse } from "axios";
import IMenuItem from "../../../lib/model/IMenuItem";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IMenuItem>
) {
  if (req.method === "POST") {
    await axios
      .post("http://localhost:8080/menuitem", req.body)
      .then((apiserverRes: AxiosResponse) => {
        res.status(apiserverRes.status).json(apiserverRes.data);
      });
  }
}
