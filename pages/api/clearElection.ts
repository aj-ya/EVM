import type { NextApiRequest, NextApiResponse } from "next";
import Web3 from "web3";
import { abi, admin_address, contract_address, rpcLink } from "../../utility/addresses";
let admin = admin_address;

export default async function electionStatus(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  // Get status from contract
  const web3 = new Web3(rpcLink);
  var contract = new web3.eth.Contract(abi, contract_address);
  //console.log(req);
  switch (method) {
    case "GET":
        contract.methods
        .clearElection()
        .send({ from: admin })
        .then(console.log);
        res.status(200).json({ cleared: true });
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
