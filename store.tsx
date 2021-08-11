import {
  Context,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Web3Provider } from "@ethersproject/providers";
import { BigNumber, ethers } from 'ethers';
import dayjs from "dayjs";
import { hashMessage } from "@ethersproject/hash";
import web3Provider from "./services/web3Provider"
import { getUsdtBalance, getLHCBalance, buyByEth, lockBuyEth, buyByUSDT, lockBuyUSDT, getEthLHCRate, getEthUSDTRate } from "./lib/web3";
 
const StoreContext: Context<Partial<any>> = createContext({});

export const useStore = () => useContext(StoreContext);

export const StoreWrapper = ({ children, userAddress, token }: any) => {
  const [provider, setProvider] = useState(null);
  const [ethBalance, setEthBalance] = useState<any>(0.0);
  const [usdtBalance, setUsdtEthBalance] = useState<any>(0.0);
  const [lhcBalance, setLhcBalance] = useState<any>(0.0);
  const [lhcAmount, setLhcAmount] = useState<any>(0);
  const [cryptoAmount, setCryptoAmount] = useState<any>(0.0);
  const [network, setNetwork] = useState<any>(null);
  const [selectedAddress, setSelectedAddress] = useState<string>(null);
  const [web3, setWeb3] = useState<Web3Provider>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('ETH')
  const [lockPeriod, setLockPeriod] = useState<number>(0)
  const [etherLhcRate, setEtherLhcRate] = useState<BigNumber>()
  const [etherUsdtRate, setEtherUsdtRate] = useState<BigNumber>()

  const message = `Signing authentication request for CluCoin.com @ ${dayjs().format("MM/DD/YYYY @ H:mmA")}`;
  const hash = hashMessage(message + ":" + message.length.toString());

  useEffect(() => {
    // Verify Token and isLoggedIn
    // if(localStorage.getItem('isLogin') == "true"){
    //   console.log('-------reconnect to wallet-------')
    //   reconnect();
    // }
    setCryptoRate()
  }, []);

  const setCryptoRate = async () => {
    setEtherLhcRate(await getEthLHCRate())
    setEtherUsdtRate(await getEthUSDTRate())
  }

  const reconnect = async () => {
    await connectWallet();
  }

  const connectWallet = async () => {
    // Check if connection is already established
    console.log("----start wallet connection----");
    const _web3Provider = await web3Provider();
    const _provider = new ethers.providers.Web3Provider(_web3Provider);
    const signer = _provider.getSigner();
    const network = await _provider.getNetwork();
    const address = await signer.getAddress();
    const etherBalance = await _provider.getBalance(address);
    const usdtBalance = await getUsdtBalance(signer, address);
    const lhcBalance = await getLHCBalance(signer, address);

    await setProvider(_provider);
    await setEthBalance(ethers.utils.formatEther(etherBalance));
    await setUsdtEthBalance(ethers.utils.formatUnits(usdtBalance, 6));
    await setLhcBalance(ethers.utils.formatUnits(lhcBalance, 8));
    await setNetwork(network);
    await setSelectedAddress(address);
    await setIsLoggedIn(true);

    localStorage.setItem('isLogin', 'true');

    _web3Provider.on("disconnect", (error: { code: number; message: string }) => {
      console.log(error);
      disconnectWallet();
    });
    
    console.log(address, ethBalance, usdtBalance, network, lhcBalance, hash, etherLhcRate, etherUsdtRate);
    console.log('etherLhcRate: ', etherLhcRate)
    console.log('etherUsdtRate: ', etherUsdtRate)
  }

  const setTokenAmount = async (_amount, _paymentMethod) => {
    // setPaymentMethod(_paymentMethod)
    if(_amount>0){
      await setLhcAmount(_amount)
    }else{
      await setLhcAmount(0)
    }
   
    if(_amount > 0){
      if (_paymentMethod == 'ETH'){
        console.log("_amount: ", ethers.utils.parseUnits(_amount, 8))
        const cryptoEthValue = ethers.utils.parseUnits(_amount, 8).mul(etherLhcRate)
        setCryptoAmount(ethers.utils.formatEther(cryptoEthValue))
      }else{
        console.log('usdt selected')
        const cryptoEthValue = ethers.utils.parseUnits(_amount, 8).mul(etherLhcRate)
        const cryptoUSDTValue = cryptoEthValue.div(etherUsdtRate)
        setCryptoAmount(ethers.utils.formatUnits(cryptoUSDTValue, 6))
      }
    }
  }

  // const setPaymentOption = async (_option) => {
  //   await setPaymentMethod(_option);
  // }

  const buy = async () => {
    const signer = await provider.getSigner();
    let result;
    if (paymentMethod === 'ETH'){
      if (lockPeriod==0){
        result = await buyByEth(signer, cryptoAmount)
      }else{
        result = await lockBuyEth(signer, cryptoAmount, lockPeriod)
      }
    }else{
      if (lockPeriod==0){
        result = await buyByUSDT(signer, cryptoAmount)
      }else{
        result = await lockBuyUSDT(signer, cryptoAmount, lockPeriod)
      }
    }

    if (result){
      recalucateBalance()
    }
  }

  const recalucateBalance = async () => {
    const signer = await provider.getSigner();
    const etherBalance = await provider.getBalance(selectedAddress);
    const usdtBalance = await getUsdtBalance(signer, selectedAddress);
    const lhcBalance = await getLHCBalance(signer, selectedAddress);

    await setEthBalance(ethers.utils.formatEther(etherBalance));
    await setUsdtEthBalance(ethers.utils.formatUnits(usdtBalance, 6));
    await setLhcBalance(ethers.utils.formatUnits(lhcBalance, 8));
  }

  const disconnectWallet = () => {
    console.log("------start disconnect to wallet-------");
    setIsLoggedIn(false);
    setProvider(null);
    setEthBalance(null);
    setNetwork(null);
    setSelectedAddress(null);
    localStorage.setItem('isLogin', 'false');
  }

  const value = {
    selectedAddress,
    isLoggedIn,
    ethBalance,
    usdtBalance,
    lhcBalance,
    lhcAmount,
    cryptoAmount,
    paymentMethod,
    lockPeriod,
    buy,
    setLockPeriod,
    setPaymentMethod,
    setTokenAmount,
    connectWallet,
    disconnectWallet,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
