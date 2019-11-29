import { Wallet } from "ethers";
import { Provider } from "ethers/providers";

/**
 * HD path used to sequentially derrive wallets and accounts.
 */
export const ETHERS_WALLET_HDPATH = "m/44'/60'/0'/0/";

/**
 * Default mnemonic to use if none is present in the env.
 */
export const DEFAULT_MNEMONIC:string = 
  "gentle leisure predict alpha margin wisdom lucky kitten define define damage badge";

/**
 * Default ether balance (in wei) to use if none is present in the env.
 */
export const DEFAULT_BALANCE_ETHER = "10000000000000000000";

/**
 * Default number of accounts to generate if none is present in the env.
 */
export const DEFAULT_ACCOUNT_CNT = 21;

/**
 * Get the default mnemonic. Reads mnemonic from the env (if present).
 * @returns Default mnemonic phrase.
 */
export function getMnemonic() {
  return process.env.MNEMONIC ? String(process.env.MNEMONIC) : DEFAULT_MNEMONIC;
}

/**
 * Create a single wallet instance and connect it to a given ethers Provider.
 * @param mnemonic Mnemonic seed string to use.
 * @param provider Instance of an ethers Provider.
 * @returns A single wallet instance.
 */
export function generateWallet(mnemonic:string, provider:Provider) {
  return Wallet.fromMnemonic(mnemonic).connect(provider);
}

/**
 * Create a single wallet instance and connect it to a given ethers Provider.
 * @param provider Instance of an ethers provider.
 * @returns Default wallet instance.
 */
export function defaultWallet(provider:Provider) {
  return Wallet.fromMnemonic(getMnemonic()).connect(provider);
}

/**
 * Generate a given number of wallet instances, and connect each one to a given ethers Provider.
 * @param count Number of wallets to generate.
 * @param mnemonic Mnemonic seed phrase to use.
 * @param provider Instance of an ethers Provider.
 * @returns An array of wallet instances.
 */
export function generateWallets(count:number, mnemonic:string, provider:Provider) {
  let ret = [];
  for (let i = 0; i < count; i++) {
    const wallet = Wallet.fromMnemonic(mnemonic, `${ETHERS_WALLET_HDPATH}${i}`);
    ret.push(wallet.connect(provider));
  }
  return ret;
}

/**
 * Generate default wallet instances, and connect each one to a given ethers Provider.
 * @param provider Instance of an ethers Provider.
 * @returns An array of wallet instances.
 */
export function defaultWallets(provider:Provider) : Wallet[] {
  return generateWallets(DEFAULT_ACCOUNT_CNT, getMnemonic(), provider);
}

/**
 * Generate a given number of accounts (private key and starting balance pair).
 * @param mnemonic Mnemonic seed phrase to use.
 * @param count Number of accounts to generate.
 * @param defaultBalance Starting balance of each account (in wei).
 * @returns An array of accounts.
 */
export function generateAccounts(
  mnemonic:string,
  count:number,
  defaultBalance:string
) {
  let ret = [];
  for (let i = 0; i < count; i++) {
    const wallet = Wallet.fromMnemonic(mnemonic, `${ETHERS_WALLET_HDPATH}${i}`);
    ret.push({
      privateKey: wallet.privateKey,
      balance: defaultBalance
    });
  }
  return ret;
}

/**
 * Generate default accounts (private key and starting balance pair).
 * @returns An array of accounts.
 */
export function defaultAccounts() {
  return generateAccounts(getMnemonic(), DEFAULT_ACCOUNT_CNT, DEFAULT_BALANCE_ETHER);
}
