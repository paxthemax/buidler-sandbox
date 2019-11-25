import { writeDeployedAddress } from "./util/artifact-writer";
import { deployContract } from "./util/ethers-helper";

import { closeSync, existsSync, mkdirSync, openSync, writeFileSync } from "fs";
import { ethers } from "@nomiclabs/buidler";

async function deployCounterContract() {
  const counter = await deployContract("Counter");
  await writeDeployedAddress("Counter", counter);
}

async function main() {
  await deployCounterContract();
}

// Run main(), log any errors and exit.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
