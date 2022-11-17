import Web3 from "web3";
import { TransactionReceipt } from "web3-core";
import * as fs from "fs";

const net = require("net");
const BASEDIR: string = "/Users/buymemerona/Desktop/Programming/geth-for-study";
var web3 = new Web3(`${BASEDIR}/data/geth.ipc`, net); // mac os path

let transactionHash: string = fs.readFileSync(
  `${BASEDIR}/contracts/test/_transactionHash.txt`,
  "utf-8"
);

// 트랜잭션 불러옴 -> 컨트랙트 주소 가져와서 -> 컨트랙트의 getText() 호출.
web3.eth
  .getTransactionReceipt(transactionHash)
  .then((result: TransactionReceipt) => {
    let CA: string = result.contractAddress;
    console.log(`CA: ${CA}`);
    fs.writeFileSync(`${BASEDIR}/contracts/test/_contractAddress.txt`, CA);
    process.exit(0);
  });
