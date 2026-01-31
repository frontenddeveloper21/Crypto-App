import React from 'react'

const marketCaps = [
  {
    rank: 1,
    name: "Bitcoin",
    symbol: "BTC",
    price: 27845, // USD
    outstandingShares: 19400000, // 19.4M
    change: "+2.34%",
  },
  {
    rank: 2,
    name: "Ethereum",
    symbol: "ETH",
    price: 1732,
    outstandingShares: 120200000,
    change: "+1.52%",
  },
  {
    rank: 3,
    name: "Tether",
    symbol: "USDT",
    price: 1.0,
    outstandingShares: 83000000000,
    change: "-0.02%",
  },
  {
    rank: 4,
    name: "BNB",
    symbol: "BNB",
    price: 215.45,
    outstandingShares: 153000000,
    change: "+0.25%",
  },
  {
    rank: 5,
    name: "Solana",
    symbol: "SOL",
    price: 21.75,
    outstandingShares: 420000000,
    change: "-1.12%",
  },
];


const MarketCapitalizations = () => {

    const formatCurrency = (num) =>
  `$${num.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

const formatShares = (num) =>
  num >= 1_000_000_000
    ? `${(num / 1_000_000_000).toFixed(1)}B`
    : num >= 1_000_000
    ? `${(num / 1_000_000).toFixed(1)}M`
    : num.toLocaleString();

  return (
  <div>
  <div className="flex justify-between items-center mb-4">
    <span className="text-[#1A3B5D] text-[16px] font-semibold">Market Capitalizations</span>
  </div>

  <div className="table__container mt-4 overflow-x-auto">
    <table>
      <thead>
  <tr>
    <th>S.No</th>
    <th>Token</th>
    <th>Symbol</th>
    <th>Share Price</th>
    <th>Outstanding Shares</th>
     <th>Market Cap</th>
    <th>24h Change</th>
  </tr>
</thead>
   <tbody>
  {marketCaps.map((coin, index) => {
    const marketCap = coin.price * coin.outstandingShares;

    return (
      <tr key={index}>
        <td>{coin.rank}</td>
        <td>{coin.name}</td>
        <td>{coin.symbol}</td>
        <td>{formatCurrency(coin.price)}</td>
        <td>{formatShares(coin.outstandingShares)}</td>
        <td>{formatCurrency(marketCap)}</td>
       <td className={coin.change < 0 ? "text-red-500 font-semibold" : "text-green-500 font-semibold"}>
  {coin.change > 0 ? "+"  : ""}{coin.change}
</td>


      </tr>
    );
  })}
</tbody>
    </table>
  </div>
</div>

  )
}

export default MarketCapitalizations