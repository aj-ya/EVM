import Web3 from "web3";
import { contract_address } from "../../utility/addresses";
import type { NextApiRequest, NextApiResponse } from "next";
const web3 = new Web3("http://127.0.0.1:8545");
let abi = JSON.parse(
  '[{"inputs ":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"choice","type":"string"}],"name":"Vote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string[]","name":"_candidates","type":"string[]"}],"name":"addCandidates","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"}],"name":"checkVoted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"clearElection","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"commenceElection","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"concludeElection","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"electionStarted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCandidates","outputs":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"voteCount","type":"uint256"}],"internalType":"struct Election.Candidate[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"}]'
);
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
