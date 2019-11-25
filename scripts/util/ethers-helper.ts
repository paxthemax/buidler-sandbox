import { ethers } from "@nomiclabs/buidler";
import { Contract } from "ethers";

export async function deployContract(name:string) {
  const contractFactory = await ethers.getContract(name);
  const contract = await contractFactory.deploy();
  await contract.deployed();

  return contract;
}

export async function getNetworkID(contract:Contract) {
  return (await contract.provider.getNetwork()).chainId;
}
