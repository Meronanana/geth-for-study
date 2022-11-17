import Web3 from "web3";
import { TransactionReceipt, TransactionConfig } from "web3-core";
import { AbiItem } from "web3-utils";
import { Contract } from "web3-eth-contract";
import * as fs from "fs";

const net = require("net");
const BASEDIR: string = "/Users/buymemerona/Desktop/Programming/geth-for-study";
var web3 = new Web3(`${BASEDIR}/data/geth.ipc`, net); // mac os path

export class TestContract {
  public contract: Contract;

  constructor() {
    let abi: AbiItem = JSON.parse(
      fs.readFileSync(
        `${BASEDIR}/contracts/test/testContract_sol_HelloWorld.abi`,
        "utf-8"
      )
    );
    let CA: string = fs.readFileSync(
      `${BASEDIR}/contracts/test/_contractAddress.txt`,
      "utf-8"
    );

    this.contract = new web3.eth.Contract(abi, CA);
  }

  async getText(): Promise<string> {
    if (this.contract == undefined) {
      console.error("Contract not fetched.");
      return null;
    }
    let text: string = await this.contract.methods
      .getText()
      .call((err: Error, result: string) => {
        if (err) return null;
        return result;
      });
    return text;
  }

  async setText(txObject: TransactionConfig, text: string): Promise<boolean> {
    let result = await this.contract.methods
      .setText(text)
      .send(txObject, (hash: string) => {
        if ((typeof hash).toString() == "Error") return false;
        return true;
      });
    return result;
  }
}
