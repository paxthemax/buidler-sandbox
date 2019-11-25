import { closeSync, existsSync, openSync, mkdirSync, writeFileSync } from "fs";
import { getNetworkID } from "./ethers-helper";
import { Contract } from "ethers";

export const ADDRESS_DIR = "build/address";

export async function writeDeployedAddress(name: string, contract:Contract) {
  const address = contract.address;
  const networkID = await getNetworkID(contract);
  
  if (!existsSync(ADDRESS_DIR)){
    mkdirSync(ADDRESS_DIR);
  }
  const fd = openSync(`${ADDRESS_DIR}/${name}.json`, "w");
  writeFileSync(fd, JSON.stringify({ 
    networkID: JSON.stringify(networkID),
    address 
  }, null, 2));
  closeSync(fd);
}

