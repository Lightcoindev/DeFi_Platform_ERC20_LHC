import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      // options: {
      //   infuraId: "27e484dcd9e3efcfd25a83a78777cdf1", // required
      //   rpc: {
      //     56: "https://bsc-dataseed.binance.org/",
      //   },
      //   network: "binance",
      //   chainId: 56,
      // },
      options: {
        rpc: {
          97: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
          },
        network: 'binance',
        chainId: 97,
        infuraId: 'T6NPT88TA4V7YMSFATCQZR31VU96KMA7ZP'
      }
    },
};



const web3Provider = async () => {
  
  const _web3Modal = new Web3Modal({
      network: "binance", // optional
      cacheProvider: true, // optional
      providerOptions, // required
  });

  return await _web3Modal.connect();

}

export default web3Provider;