import dotenv from "dotenv";
import { BuidlerConfig, usePlugin } from "@nomiclabs/buidler/config";
import { defaultAccounts } from "./src/utils/wallet-utils";

usePlugin("@nomiclabs/buidler-ethers");
usePlugin("buidler-typechain");

import "./tasks/accounts";

dotenv.config();

const config: BuidlerConfig = {
  paths: {
    artifacts: "./build/artefacts"
  },
  solc: {
      version: "0.5.12",
  },
  defaultNetwork: "buidlerevm",
  networks: {
    buidlerevm: {
      chainId: 1337,
      accounts: defaultAccounts(),
    },
  },
  typechain: {
    target: "ethers",
    outDir: "build/typechain"
  }
};

export default config;
