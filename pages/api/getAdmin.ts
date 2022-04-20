import { NextApiRequest, NextApiResponse } from "next";
import Web3 from "web3";

import { abi, admin_address, contract_address, rpcLink } from "../../utility/addresses";
type Data = {
  admin: string;
};
export default async function pollResults(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //geth
  const web3 = new Web3(rpcLink);
  var accounts = await web3.eth.getAccounts();
  var admin= accounts[0];
  var contract = new web3.eth.Contract(abi, contract_address);
  let x = await contract.methods.admin().call({ from: admin });
  res.status(200).json({ admin: x });
}
