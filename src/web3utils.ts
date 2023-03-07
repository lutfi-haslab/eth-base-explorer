import Web3 from "web3";

// const provider = new Web3.providers.HttpProvider('http://103.179.57.215:8545')
const provider = new Web3.providers.HttpProvider('http://27.112.78.177:8545') //prifa-node
// const provider = new Web3.providers.HttpProvider('https://rpc-mumbai.maticvigil.com')
// const providerWs = new Web3.providers.WebsocketProvider('ws://27.112.78.177:8545/ws')

export const web3 = new Web3(provider)
// export const web3ws = new Web3(providerWs)