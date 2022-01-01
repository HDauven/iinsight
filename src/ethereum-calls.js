import { ethers, Contract } from "ethers";
import ERC20ABI from "./ERC20ABI.json";

const nahmiiTokenAddress = "0x7c8155909cd385F120A56eF90728dD50F9CcbE52";
const nahmiiAirdriipAddress = "0x4fa70e4143cc38dca0a2101e522d8c0d3f040128";
const nahmiiClientFundAddress = "0xcc8d82f6ba952966e63001c7b320eef2ae729099";
const nahmiiTwoBridgeAddress = "0x2fCE9b92a64c1DDf14a1A9E5Ec6D4e4C7C9F4Fdd";
const billion = ethers.BigNumber.from(10 ** 9);
const tokenDecimals = ethers.BigNumber.from(10 ** 15);
const nahmiiTotalNumberOfTokens = ethers.BigNumber.from(120 * 10 ** 9);
let provider;

const getProvider = async () => {
  if (provider) {
    return provider;
  }
  provider = new ethers.providers.InfuraProvider();
  return provider;
};

const getBalance = async (targetAddress, provider) => {
  const contract = new Contract(nahmiiTokenAddress, ERC20ABI, provider);
  const balance = await contract.balanceOf(targetAddress);
  return balance;
};

const getClientFundBalance = async (provider) => {
  return await getBalance(nahmiiClientFundAddress, provider);
};

const getStandardBridgeBalance = async (provider) => {
  return await getBalance(nahmiiTwoBridgeAddress, provider);
}

const getAirdriipBalance = async (provider) => {
  return await getBalance(nahmiiAirdriipAddress, provider);
};

export const getNahmiiBalances = async () => {
  const provider = await getProvider();
  const airdriipBalance = (await getAirdriipBalance(provider)).div(
    tokenDecimals
  );
  const clientFundBalance = (await getClientFundBalance(provider)).div(
    tokenDecimals
  );
  const standardBridgeBalance = (await getStandardBridgeBalance(provider)).div(
    tokenDecimals
  );
  const L2Balance = clientFundBalance.add(standardBridgeBalance);
  const nahmiiL1 = nahmiiTotalNumberOfTokens.sub(
    airdriipBalance.add(clientFundBalance)
  );
  const airdriipsRemaining = Math.floor(airdriipBalance.div(billion));

  return {
    airdriipsRemaining: airdriipsRemaining,
    nahmiiL1: nahmiiL1.toString(),
    nahmiiL2: L2Balance.toString(),
    nahmiiAirdriip: airdriipBalance.toString(),
  };
};
