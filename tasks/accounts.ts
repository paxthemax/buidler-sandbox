import { task, usePlugin } from "@nomiclabs/buidler/config";
import { Wallet } from "ethers";
import { defaultWallets, defaultAccounts } from "../src/utils/wallet-utils";

usePlugin("@nomiclabs/buidler-ethers");

task(
  "accounts",
  "Print the list of default accounts",
  async ({}, { ethers }) => {
    const wallets = defaultWallets(ethers.provider);

    const accounts = await Promise.all(wallets.map(async (wallet:Wallet) => {
      return {
        address: wallet.address,
        privateKey: wallet.privateKey,
        balance: (await wallet.getBalance()).toString()
      }
    }));

    console.log(JSON.stringify(accounts, null, 2));

    return accounts;
  }
)
