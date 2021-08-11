import { Contract } from "@ethersproject/contracts";
import { JsonRpcProvider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { USDTToken, LHCToken, LHCStaking, wEthToken, pairLHCEth, pairEthUSDT } from '../config/contractConfig'
import networkConfig from '../config/networkConfig'

const provider = new JsonRpcProvider(networkConfig[networkConfig.defaultNetwork].httpProvider);

export const LHCContract = new Contract(
  LHCToken.address[networkConfig.defaultNetwork],
  LHCToken.abi,
  provider
);

export const wEthContract = new Contract(
  wEthToken.address[networkConfig.defaultNetwork],
  wEthToken.abi,
  provider
);

export const USDTContract = new Contract(
  USDTToken.address[networkConfig.defaultNetwork],
  USDTToken.abi,
  provider
);

export const getLHCPoolAmount = async (address: string) => {
  return await LHCContract.functions["balanceOf"](address);
};

export const getEthPoolAmount = async (address: string) => {
  return await wEthContract.functions["balanceOf"](address);
};

export const getUSDTPoolAmount = async (address: string) => {
  return await USDTContract.functions["balanceOf"](address);
};

export const getUsdtBalance = async (_singer: any, address: string) => {
  const usdtContract = new ethers.Contract(USDTToken.address[networkConfig.defaultNetwork], USDTToken.abi, _singer)
  return await usdtContract.balanceOf(address);
}

export const getLHCBalance = async (_singer: any, address: string) => {
  const lhcContract = new ethers.Contract(LHCToken.address[networkConfig.defaultNetwork], LHCToken.abi, _singer)
  return await lhcContract.balanceOf(address);
}

// export const getLHCAmount = async (_singer: any, amountCryto: any) => {
//   const lhcStakingContract = new ethers.Contract(LHCStaking.address[networkConfig.defaultNetwork], LHCStaking.abi, _singer)
//   const lhcAmount =  await lhcStakingContract.tokenPriceOut(amountCryto);
//   console.log("lhcAmount : ", lhcAmount);
//   return lhcAmount.toNumber();
// }

// export const getLHCAmountByUSDT = async (_singer: any, amountCryto: any) => {
//   const lhcStakingContract = new ethers.Contract(LHCStaking.address[networkConfig.defaultNetwork], LHCStaking.abi, _singer)
//   const lhcAmount = await lhcStakingContract.tokenPriceOutUsdt(amountCryto);
//   return lhcAmount.toNumber();
// }

export const getEthLHCRate = async () => {

  const lhcAmount = await getLHCPoolAmount(pairLHCEth.address[networkConfig.defaultNetwork])
  const etherAmount = await getEthPoolAmount(pairLHCEth.address[networkConfig.defaultNetwork])

  return  ethers.BigNumber.from(etherAmount[0].div(lhcAmount[0])) ;
}

export const getEthUSDTRate = async () => {

  const usdtOnUSDTPoolAmount = await getUSDTPoolAmount(pairEthUSDT.address[networkConfig.defaultNetwork])
  const etherOnUSDTPoolAmount = await getEthPoolAmount(pairEthUSDT.address[networkConfig.defaultNetwork])

  return  ethers.BigNumber.from(etherOnUSDTPoolAmount[0].div(usdtOnUSDTPoolAmount[0])) ;
}

export const buyByEth = async (_singer: any, amountCryto: any) => {
  const overrides = {
    value: ethers.utils.parseEther(amountCryto), //sending one ether  
    gasLimit: 300000 //optional
  }
  const lhcStakingContract = new ethers.Contract(LHCStaking.address[networkConfig.defaultNetwork], LHCStaking.abi, _singer)
  const resp = await lhcStakingContract.buy(overrides)
  return await resp.wait().then(
    receipt => {
      console.log("success: ", receipt)
      return true;
    },
    error => {
      console.log("error: ", error)
      return false;
    }
  );
}


export const lockBuyEth = async (_singer: any, amountCryto: any, step: number) => {
  const overrides = {
    value: ethers.utils.parseEther(amountCryto), //sending one ether  
    gasLimit: 300000 //optional
  }
  const lhcStakingContract = new ethers.Contract(LHCStaking.address[networkConfig.defaultNetwork], LHCStaking.abi, _singer)
  const resp = await lhcStakingContract.buyforstakingwithexactEHTforToken(step-1, overrides)
  return await resp.wait().then(
    receipt => {
      console.log("success: ", receipt)
      return true;
    },
    error => {
      console.log("error: ", error)
      return false;
    }
  );
}

export const buyByUSDT = async (_singer: any, amountCryto: any) => {
  const overrides = {
    gasLimit: 300000 //optional
  }
  console.log('amountCryto', ethers.utils.parseUnits(amountCryto, 6))
  const usdtContract = new ethers.Contract(USDTToken.address[networkConfig.defaultNetwork], USDTToken.abi, _singer)
  const respApprove = await usdtContract.approve(LHCStaking.address[networkConfig.defaultNetwork], ethers.utils.parseUnits(amountCryto, 6), overrides)
  const isApproved = await respApprove.wait().then(
    receipt => {
      console.log("success: ", receipt)
      return true;
    },
    error => {
      console.log("error: ", error)
      return false;
    }
  );

  if (isApproved) {
    console.log('buy the lhc via USDT')
    const lhcStakingContract = new ethers.Contract(LHCStaking.address[networkConfig.defaultNetwork], LHCStaking.abi, _singer)
    const respLhcStaking = await lhcStakingContract.buyforUsdt(ethers.utils.parseUnits(amountCryto, 6), overrides);
    await respLhcStaking.wait().then(
      receipt => {
        console.log("success: ", receipt)
        return true;
      },
      error => {
        console.log("error: ", error)
        return false;
      }
    )
  }
}

export const lockBuyUSDT = async (_singer: any, amountCryto: any, step: number) => {
  const overrides = {
    gasLimit: 300000 //optional
  }
  console.log('amountCryto', ethers.utils.parseUnits(amountCryto, 6))
  const usdtContract = new ethers.Contract(USDTToken.address[networkConfig.defaultNetwork], USDTToken.abi, _singer)
  const respApprove = await usdtContract.approve(LHCStaking.address[networkConfig.defaultNetwork], ethers.utils.parseUnits(amountCryto, 6), overrides)
  const isApproved = await respApprove.wait().then(
    receipt => {
      console.log("success: ", receipt)
      return true;
    },
    error => {
      console.log("error: ", error)
      return false;
    }
  );

  if (!isApproved) {
    console.log('buy the lhc via USDT')
    const lhcStakingContract = new ethers.Contract(LHCStaking.address[networkConfig.defaultNetwork], LHCStaking.abi, _singer)
    const respLhcStaking = await lhcStakingContract.buyforstakingwithexactUsdtforToken(ethers.utils.parseUnits(amountCryto, 6), step-1, overrides);
    await respLhcStaking.wait().then(
      receipt => {
        console.log("success: ", receipt)
        return true;
      },
      error => {
        console.log("error: ", error)
        return false;
      }
    )
  }
}