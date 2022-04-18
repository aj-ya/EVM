import type { NextApiRequest, NextApiResponse } from "next";
import Web3 from "web3";
import { contract_address } from "../../utility/addresses";
let admin = "0x93fc465539d392af873fb501de703c3512a5f279";

export default async function electionStatus(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  // Get status from contract
  const web3 = new Web3("http://127.0.0.1:8545");
  let abi = JSON.parse(
    '[{"inputs ":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"choice","type":"string"}],"name":"Vote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string[]","name":"_candidates","type":"string[]"}],"name":"addCandidates","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"}],"name":"checkVoted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"clearElection","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"commenceElection","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"concludeElection","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"electionStarted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCandidates","outputs":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"voteCount","type":"uint256"}],"internalType":"struct Election.Candidate[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"}]'
  );
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
