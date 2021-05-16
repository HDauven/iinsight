import { createClient, gql } from "@urql/svelte";

const ethereumUSDCPair = '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc';
const nahmiiEthereumPair = '0xa0787e87b10c9b1b88d75915ac8ec5608ac6d054';

const uniswapClient = createClient({
  url: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
});

const pairsQuery = async (pairAddress) =>
  gql`
  {
    pair(id: "${pairAddress}") {
      reserveETH,
      reserveUSD,
      token0 {name},
      token0Price,
      token1 {name},
      token1Price
    }
  }
`;

const querySubgraph = async (query, client) => {
  if (!query) {
    throw new Error('No query given');
  }
  const data = await client.query(query).toPromise();
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
};

const queryUniswapSubgraph = async (query) => {
  return await querySubgraph(query, uniswapClient);
};

const getEthereumPrice = async () => {
  const query = await pairsQuery(ethereumUSDCPair);
  const { data } = await queryUniswapSubgraph(query);
  return data.pair.token0Price;
};

const getNahmiiPrice = async () => {
  const query = await pairsQuery(nahmiiEthereumPair);
  const { data } = await queryUniswapSubgraph(query);
  return data.pair.token0Price;
};

export const getNahmiiPriceUSD = async () => {
  const nahmiiETH = await getNahmiiPrice();
  const ethereumUSD = await getEthereumPrice();
  const nahmiiUSD = ethereumUSD / nahmiiETH;
  return {
    nahmiiPrice: nahmiiUSD
  }
}