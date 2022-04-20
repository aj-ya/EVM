import type { NextApiRequest, NextApiResponse } from "next";
import Web3 from "web3";
import { abi, admin_address, contract_address, rpcLink } from "../../utility/addresses";
type Data = {
  updated: boolean;
};
export default function voter(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {
    body: { id, choice },
    method,
  } = req;
  const web3 = new Web3(rpcLink);
  let admin = admin_address;
  var contract = new web3.eth.Contract(abi, contract_address);
  console.log(id, method);
  contract.methods.Vote(choice).send({ from: id }).then(console.log);
  //console.log(req);
  switch (method) {
    // case "GET":
    //   // Get data from your database
    //   res.status(200).json({  name: `${id}` });
    //   break;
    case "POST":
      res.status(200).json({ updated: true });
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
