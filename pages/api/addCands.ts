import Web3 from "web3";
import { abi, contract_address, rpcLink } from "../../utility/addresses";
import type { NextApiRequest, NextApiResponse } from "next";
const web3 = new Web3(rpcLink);
var contract = new web3.eth.Contract(abi, contract_address);
type Data = {
  updated: boolean;
};
let admin: string;
export default function voter(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {
    body: { id, cands },
    method,
  } = req;
  console.log(id, method);
  //console.log(req);
  switch (method) {
    case "POST":
      // Update or create data in your database
      //add cands
      //cast vote
      contract.methods
        .addCandidates(cands)
        .send({ from: id })
        .then(console.log);
      res.status(200).json({ updated: true });
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
