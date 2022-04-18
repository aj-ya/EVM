const fs = require("fs");
const net = require("net");
const solc = require("solc");
// const ipcPath = "gethevm/geth.ipc";
let abi = JSON.parse(fs.readFileSync("Election.abi"));
let bytecode = "0x" + fs.readFileSync("Election.bin").toString();
let contract_address = "0x06a6A439fD67D847b1848e14AEfBf857F537FE51";
// console.log(abi);
const run = async () => {
  // Get web3
  const Web3 = require("web3");
  // const web3 = new Web3(new Web3.providers.IpcProvider(ipcPath, net));
  const web3 = new Web3("http://127.0.0.1:8545");
  // Get address
  const accounts = await web3.eth.getAccounts();
  console.dir(accounts);
  // get balance
  web3.eth.personal.unlockAccount(accounts[0], "admin", 600);
  const balance = await web3.eth.getBalance(accounts[0]);
  console.log(`balance : ${balance}`);
  web3.eth.defaultAccount = accounts[0];
  var contract = new web3.eth.Contract(abi, contract_address);
  // contract.methods.addCandidates(["a", "b"]);
  // contract.admin = accounts[0];

  // contract.methods
  //   .addCandidates(["a", "b"])
  //   .send({ from: accounts[0] })
  //   .then(console.log);

  // contract.methods.admin().call({ from: accounts[0] }).then(console.log);

  // contract.methods
  //   .electionStarted()
  //   .call({ from: accounts[0] })
  //   .then(console.log);

  contract.methods
    .commenceElection()
    .send({ from: accounts[0] })
    .then(console.log);

  // contract.methods
  //   .concludeElection()
  //   .send({ from: accounts[0] })
  //   .then(console.log);

  // contract.methods
  //   .clearElection()
  //   .send({ from: accounts[0] })
  //   .then(console.log);

  // contract.methods.Vote("b").send({ from: accounts[0] }).then(console.log);

  // contract.methods
  //   .checkVoted(accounts[0])
  //   .call({ from: accounts[0] })
  //   .then(console.log);

  // contract.methods
  //   .getCandidates()
  //   .call({ from: accounts[0] })
  //   .then(console.log);
};
run();
