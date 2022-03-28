import type { NextApiRequest, NextApiResponse } from "next";
let voters = ["1", "2", "3"];
type Data = {
  voted: boolean;
};
export default function voted(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {
    query: { id },
  } = req;

  res
    .status(200)
    .json(voters.includes(id as string) ? { voted: true } : { voted: false });
}
