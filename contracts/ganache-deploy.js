const { Contract } = require("ethers");
const Web3 = require("web3");

const web3 = new Web3("http://192.168.49.2:31787");

async function run() {
  var accounts = await web3.eth.getAccounts();
  var electionContract = new web3.eth.Contract(
    [
      { inputs: [], stateMutability: "nonpayable", type: "constructor" },
      {
        inputs: [{ internalType: "string", name: "choice", type: "string" }],
        name: "Vote",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "string[]", name: "_candidates", type: "string[]" },
        ],
        name: "addCandidates",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "admin",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "from", type: "address" }],
        name: "checkVoted",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "clearElection",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "commenceElection",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "concludeElection",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "electionStarted",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getCandidates",
        outputs: [
          {
            components: [
              { internalType: "string", name: "name", type: "string" },
              { internalType: "uint256", name: "voteCount", type: "uint256" },
            ],
            internalType: "struct Election.Candidate[]",
            name: "",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    "0x577c66469b5df2781b3a77a9dc825ec2de76c4a4"
  );
  let x = await electionContract.methods
    .electionStarted()
    .call({ from: accounts[0] });
  console.log(x);
}
run();
