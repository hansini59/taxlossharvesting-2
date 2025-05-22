import { CapitalGains, Holding } from '../types';

// Mock capital gains data
const mockCapitalGainsData = {
  capitalGains: {
    stcg: {
      profits: 70200.88,
      losses: 1548.53
    },
    ltcg: {
      profits: 5020,
      losses: 3050
    }
  }
};

// Mock holdings data
const mockHoldingsData = [
  {
    "coin": "USDC",
    "coinName": "USDC",
    "logo": "https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
    "currentPrice": 85.41,
    "totalHolding": 0.0015339999999994802,
    "averageBuyPrice": 1.5863185433764244,
    "stcg": {
      "balance": 0.0015339999999994802,
      "gain": 0.12858552735441697
    },
    "ltcg": {
      "balance": 0,
      "gain": 0
    }
  },
  {
    "coin": "WETH",
    "coinName": "Polygon PoS Bridged WETH (Polygon POS)",
    "logo": "https://coin-images.coingecko.com/coins/images/2518/large/weth.png?1696503332",
    "currentPrice": 211756,
    "totalHolding": 0.00023999998390319965,
    "averageBuyPrice": 3599.856066001555,
    "stcg": {
      "balance": 0.00023999998390319965,
      "gain": 49.957471193511736
    },
    "ltcg": {
      "balance": 0,
      "gain": 0
    }
  },
  {
    "coin": "SOL",
    "coinName": "SOL (Wormhole)",
    "logo": "https://coin-images.coingecko.com/coins/images/22876/large/SOL_wh_small.png?1696522175",
    "currentPrice": 14758.01,
    "totalHolding": 3.469446951953614e-17,
    "averageBuyPrice": 221.42847548590152,
    "stcg": {
      "balance": 3.469446951953614e-17,
      "gain": 5.043389846205066e-13
    },
    "ltcg": {
      "balance": 0,
      "gain": 0
    }
  },
  {
    "coin": "WPOL",
    "coinName": "Wrapped POL",
    "logo": "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg",
    "currentPrice": 22.08,
    "totalHolding": 2.3172764293128694,
    "averageBuyPrice": 0.5227311370876341,
    "stcg": {
      "balance": 1.3172764293128694,
      "gain": 49.954151016387065
    },
    "ltcg": {
      "balance": 1,
      "gain": 20
    }
  },
  {
    "coin": "MATIC",
    "coinName": "Polygon",
    "logo": "https://coin-images.coingecko.com/coins/images/4713/large/polygon.png?1698233745",
    "currentPrice": 22.22,
    "totalHolding": 2.75145540184285,
    "averageBuyPrice": 0.6880274617804887,
    "stcg": {
      "balance": 2.75145540184285,
      "gain": 59.244262152615974
    },
    "ltcg": {
      "balance": 0,
      "gain": 0
    }
  },
  {
    "coin": "GONE",
    "coinName": "Gone",
    "logo": "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg",
    "currentPrice": 0.0001462,
    "totalHolding": 696324.3075326696,
    "averageBuyPrice": 0.00001637624055112482,
    "stcg": {
      "balance": 696324.3075326696,
      "gain": 90.39943939952589
    },
    "ltcg": {
      "balance": 0,
      "gain": 0
    }
  },
  {
    "coin": "USDT",
    "coinName": "Arbitrum Bridged USDT (Arbitrum)",
    "logo": "https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661",
    "currentPrice": 85.42,
    "totalHolding": 0.0001580000000558357,
    "averageBuyPrice": 1.4988059369185402,
    "stcg": {
      "balance": 0.0001580000000558357,
      "gain": 0.01325954866665267
    },
    "ltcg": {
      "balance": 0,
      "gain": 0
    }
  },
  {
    "coin": "ETH",
    "coinName": "Ethereum",
    "logo": "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
    "currentPrice": 216182,
    "totalHolding": 0.0004211938732637162,
    "averageBuyPrice": 3909.792264648455,
    "stcg": {
      "balance": 0.0004211938732637162,
      "gain": 89.40775336229291
    },
    "ltcg": {
      "balance": 0,
      "gain": 0
    }
  },
  {
    "coin": "QUICK",
    "coinName": "Quickswap [OLD]",
    "logo": "https://coin-images.coingecko.com/coins/images/13970/large/quick.png?1696513704",
    "currentPrice": 2319.83,
    "totalHolding": 5.961538207532868e-11,
    "averageBuyPrice": 65.86759737193783,
    "stcg": {
      "balance": 5.961538207532868e-11,
      "gain": 1.3437082981609774e-7
    },
    "ltcg": {
      "balance": 0,
      "gain": 0
    }
  },
  {
    "coin": "DFYN",
    "coinName": "Dfyn Network",
    "logo": "https://coin-images.coingecko.com/coins/images/15368/large/SgqhfWz4_400x400_%281%29.jpg?1696515016",
    "currentPrice": 0.300613,
    "totalHolding": 3.1178615245153196e-11,
    "averageBuyPrice": 0.03486178524947315,
    "stcg": {
      "balance": 3.1178615245153196e-11,
      "gain": 8.285754875638759e-12
    },
    "ltcg": {
      "balance": 0,
      "gain": 0
    }
  },
  {
    "coin": "LINK",
    "coinName": "Chainlink",
    "logo": "https://coin-images.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1696502009",
    "currentPrice": 1450.14,
    "totalHolding": 0.000047233224826389,
    "averageBuyPrice": 9.172984515948809,
    "stcg": {
      "balance": 0.000047233224826389,
      "gain": 0.06806151900976895
    },
    "ltcg": {
      "balance": 0,
      "gain": 0
    }
  },
  {
    "coin": "FTM",
    "coinName": "Fantom",
    "logo": "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg",
    "currentPrice": 52.99,
    "totalHolding": 0.04265758808550148,
    "averageBuyPrice": 1.7040326829291739,
    "stcg": {
      "balance": 0.04265758808550148,
      "gain": 2.1877356683780986
    },
    "ltcg": {
      "balance": 0,
      "gain": 0
    }
  }
];

// Mock API calls with promises to simulate async requests
export const fetchCapitalGains = (): Promise<{ capitalGains: CapitalGains }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCapitalGainsData);
    }, 800);
  });
};

export const fetchHoldings = (): Promise<Holding[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockHoldingsData);
    }, 1000);
  });
};