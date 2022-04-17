const fs = require("fs");
const net = require("net");
const solc = require("solc");
const ipcPath = "gethevm/geth.ipc";
let abi = JSON.parse(fs.readFileSync("contracts/Election.abi"));
let bytecode = "0x" + fs.readFileSync("contracts/Election.bin").toString();
let addy;
// console.log(abi);
const run = async () => {
  // Get web3
  const Web3 = require("web3");
  const web3 = new Web3(new Web3.providers.IpcProvider(ipcPath, net));

  // Get address
  const accounts = await web3.eth.getAccounts();
  console.dir(accounts);
  // get balance
  const balance = await web3.eth.getBalance(accounts[0]);
  console.log(`balance : ${balance}`);
  web3.eth.defaultAccount = accounts[0];
  var contract = new web3.eth.Contract(
    abi,
    "0x4c6e6e15f06b6346257eed4196d9f80f4254c81e"
  );
  contract.admin = accounts[0];
  contract.methods.addCandidates(["a", "b"]);
  console.log(contract.methods.getCandidates());
};
run();
