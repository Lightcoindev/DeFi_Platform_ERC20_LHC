const infuraKey = '580126c4483c4259909abeb535467920'

module.exports = {
  rightNetworks: [1, 42],
  defaultNetwork: 42,
  nftNetwork: 42,
  1: {
    name: 'Ethereum Mainnet',
    isTest: false,
    hasExplorer: true,
    explorer: {
      root: 'https://etherscan.io/',
      address: 'address/',
      tx: 'tx/'
    },
    httpProvider: `https://mainnet.infura.io/v3/${infuraKey}`,
    wssProvider: `wss://mainnet.infura.io/ws/v3/${infuraKey}`
  },
  2: {
    name: 'Deprecated Morden test network',
    isTest: true,
    hasExplorer: false
  },
  3: {
    name: 'Ropsten test network',
    isTest: true,
    hasExplorer: true,
    explorer: {
      root: 'https://ropsten.etherscan.io/',
      address: 'address/',
      tx: 'tx/'
    },
    httpProvider: `https://ropsten.infura.io/v3/${infuraKey}`
  },
  4: {
    name: 'Rinkeby test network',
    isTest: true,
    hasExplorer: true,
    explorer: {
      root: 'https://rinkeby.etherscan.io/',
      address: 'address/',
      tx: 'tx/'
    },
    httpProvider: `https://rinkeby.infura.io/v3/${infuraKey}`
  },
  5: {
    name: 'Görli test network',
    isTest: true,
    hasExplorer: true,
    explorer: {
      root: 'https://goerli.etherscan.io/',
      address: 'address/',
      tx: 'tx/'
    },
    httpProvider: `https://goerli.infura.io/v3/${infuraKey}`
  },
  42: {
    name: ' Kovan test network',
    isTest: true,
    hasExplorer: true,
    explorer: {
      root: 'https://kovan.etherscan.io/',
      address: 'address/',
      tx: 'tx/'
    },
    httpProvider: `https://kovan.infura.io/v3/${infuraKey}`,
    wssProvider: `wss://kovan.infura.io/ws/v3/${infuraKey}`
  },
  56: {
    name: 'Binance Smart Chain network',
    isTest: false,
    hasExplorer: true,
    explorer: {
      root: 'https://bscscan.com/',
      address: 'address/',
      tx: 'tx/'
    },
    httpProvider: `https://bsc-mainnet.web3api.com/v1/T6NPT88TA4V7YMSFATCQZR31VU96KMA7ZP`,
    rpcURL: 'https://bsc-dataseed.binance.org/'
  },
  66: {
    name: 'Aldwych network',
    unit: 'ETH',
    isTest: true,
    hasExplorer: true,
    explorer: {
      root: 'https://explorer.aldwych.blaquetec.org/',
      address: 'account/',
      tx: 'tx/'
    }
  },
  97: {
    name: 'Binance Smart Chain - Testnet',
    isTest: true,
    hasExplorer: true,
    explorer: {
      root: 'https://testnet.bscscan.com/',
      address: 'address/',
      tx: 'tx/'
    },
    httpProvider: `https://bsc-testnet.web3api.com/v1/T6NPT88TA4V7YMSFATCQZR31VU96KMA7ZP`,
    rpcURL: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
  },
  137: {
    name: 'Matic Netowrk',
    isTest: true,
    hasExplorer: true,
    explorer: {
      root: 'https://polygonscan.com/',
      address: 'address/',
      tx: 'tx/'
    },
    httpProvider: `https://rpc-mainnet.maticvigil.com/v1/25026e942e1621c252f3e29cecd2e03f5ccf64d0`,
    rpcURL: 'https://rpc-mainnet.maticvigil.com/'
  },
  4447: {
    name: 'Truffle Develop Network',
    isTest: true,
    hasExplorer: false
  },
  5777: {
    name: 'Ganache Blockchain',
    isTest: true,
    hasExplorer: false
  }
}
