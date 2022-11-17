import Web3 from "web3";
import { TransactionConfig } from "web3-core";
import { AbiItem } from "web3-utils";
import * as fs from "fs";

const net = require("net");
const BASEDIR: string = "/Users/buymemerona/Desktop/Programming/geth-for-study";
var web3 = new Web3(`${BASEDIR}/data/geth.ipc`, net); // mac os path

// .bin 파일 안에 있는 바이트 코드를 bytecode 변수에 할당
let bytecode: string =
  "0x" +
  fs.readFileSync(
    `${BASEDIR}/contracts/test/testContract_sol_HelloWorld.bin`,
    "utf-8"
  );

// .abi 파일 안에 있는 값을 abi 변수에 할당
let abi: AbiItem = JSON.parse(
  fs.readFileSync(
    `${BASEDIR}/contracts/test/testContract_sol_HelloWorld.abi`,
    "utf-8"
  )
);

// 트랜잭션 객체 생성
let txObject: TransactionConfig = {
  from: "0x0a6854a58dcd5df349df2ab47dc3113c64937823",
  data: bytecode,
};

// 컨트랙트 배포.
web3.eth.sendTransaction(txObject, (err: Error, result: string) => {
  if (err) console.log(err);
  else {
    console.log(`RESULT: ${result}`);
    fs.writeFileSync(`${BASEDIR}/contracts/test/transactionHash.txt`, result);
    console.log("Success!");
  }
});
