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
  let currState = await contract.methods.electionStarted().call({ from: admin });
  //console.log(req);
  switch (method) {
    case "GET":
      break;
    case "POST":
      if (currState) {
        contract.methods
          .concludeElection()
          .send({ from: admin })
          .then(console.log);
        currState = false;
      } else {
        contract.methods
          .commenceElection()
          .send({ from: admin })
          .then(console.log);
        currState = true;
        //reset voters
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      return; //else will cause error since res.status() after this scope is called after?
  }
  res.status(200).json({ status: currState });
}
