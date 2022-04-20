import type { NextApiRequest, NextApiResponse } from "next";
import Web3 from "web3";
import {
  abi,
  admin_address,
  contract_address,
  rpcLink,
} from "../../../utility/addresses";
type Data = {
  voted: boolean;
};
let admin = admin_address;
export default async function voted(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    query: { id },
  } = req;
  const web3 = new Web3(rpcLink);
  var contract = new web3.eth.Contract(abi, contract_address);

  let y = await contract.methods.checkVoted(id).call({ from: admin });
  res.status(200).json({ voted: y });
}
