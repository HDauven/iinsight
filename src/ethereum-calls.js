import { ethers, Contract } from "ethers";
import ERC20ABI from "./ERC20ABI.json";

const nahmiiTokenAddress = "0x7c8155909cd385F120A56eF90728dD50F9CcbE52";
const nahmiiAirdriipAddress = "0x4fa70e4143cc38dca0a2101e522d8c0d3f040128";
const nahmiiClientFundAddress = "0xcc8d82f6ba952966e63001c7b320eef2ae729099";
const billion = ethers.BigNumber.from(10 ** 9);
const tokenDecimals = ethers.BigNumber.from(10 ** 15);
const nahmiiTotalNumberOfTokens = ethers.BigNumber.from(120 * 10 ** 9);
let provider;

const getProvider = async () => {
  // TODO proper web3 provider handling:
  // TODO 1. If no Ethereum provider detected -> Please install Metamask
  // TODO 2. warn user if they're not on Ethereum mainnet -> Please change network
  if (provider) {
    return provider;
  }
  provider = new ethers.providers.Web3Provider(window.ethereum);
  return provider;
}

const getBalance = async (targetAddress, provider) => {
  const contract = new Contract(nahmiiTokenAddress, ERC20ABI, provider);
  const balance = await contract.balanceOf(targetAddress);
  return balance;
}

const getClientFundBalance = async (provider) => {
  return await getBalance(nahmiiClientFundAddress, provider);
}

const getAirdriipBalance = async (provider) => {
  return await getBalance(nahmiiAirdriipAddress, provider);
}

export const getNahmiiBalances = async () => {
  const provider = await getProvider();
  const airdriipBalance = (await getAirdriipBalance(provider)).div(tokenDecimals);
  const clientFundBalance = (await getClientFundBalance(provider)).div(tokenDecimals);
  const nahmiiL1 = nahmiiTotalNumberOfTokens.sub(airdriipBalance.add(clientFundBalance));
  const airdriipsRemaining = Math.floor(airdriipBalance.div(billion));

  return {
    airdriipsRemaining: airdriipsRemaining,
    nahmiiL1: nahmiiL1.toString(),
    nahmiiL2: clientFundBalance.toString(),
    nahmiiAirdriip: airdriipBalance.toString()
  }
}