import { BuidlerConfig, usePlugin } from "@nomiclabs/buidler/config";
import waffleDefaultAccounts from "ethereum-waffle/dist/config/defaultAccounts";

usePlugin("@nomiclabs/buidler-ethers");
usePlugin("buidler-typechain");

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
      accounts: waffleDefaultAccounts.map(acc => ({
        balance: acc.balance,
        privateKey: acc.secretKey,
      })),
    },
  },
  typechain: {
    target: "ethers",
    outDir: "build/typechain"
  }
};

export default config;
