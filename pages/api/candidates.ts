import { NextApiRequest, NextApiResponse } from "next";
import Web3 from "web3";
import { abi, admin_address, contract_address, rpcLink } from "../../utility/addresses";
type Data = {
  results: string[];
};
let admin = admin_address;
export default async function candidtes(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const {
  //     body: {id}
  //    }= req;
  const web3 = new Web3(rpcLink);
  var contract = new web3.eth.Contract(abi, contract_address);
  let k = await contract.methods
    .getCandidates()
    .call({ from: admin })
    .then((d: any) => d);
  res.status(200).json({ results: k });
}
