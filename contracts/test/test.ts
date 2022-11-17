import { TransactionConfig } from "web3-core";
import { TestContract } from "./contract";

const myContract = new TestContract();

let txObject: TransactionConfig = {
  from: "0x0a6854a58dcd5df349df2ab47dc3113c64937823",
};

async function foo() {
  let k = await myContract.getText();
  console.log(`K is? : ${k}`);
  // await myContract.setText(txObject, "Sure?");
}

foo();
// process.exit(0);
