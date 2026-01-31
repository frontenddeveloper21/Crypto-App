import React, { useState } from 'react'

const marketCaps = [
    {
        rank: 1,
        name: "Bitcoin",
        symbol: "BTC",
        price: 27845,
        outstandingShares: 19400000,
        change: 2.34,
    },
    {
        rank: 2,
        name: "Ethereum",
        symbol: "ETH",
        price: 1732,
        outstandingShares: 120200000,
        change: 1.52,
    },
    {
        rank: 3,
        name: "Tether",
        symbol: "USDT",
        price: 1.0,
        outstandingShares: 83000000000,
        change: -0.02,
    },
    {
        rank: 4,
        name: "BNB",
        symbol: "BNB",
        price: 215.45,
        outstandingShares: 153000000,
        change: 0.25,
    },
    {
        rank: 5,
        name: "Solana",
        symbol: "SOL",
        price: 21.75,
        outstandingShares: 420000000,
        change: -1.12,
    },
];

const TopGainerLoser = () => {

    const [filter, setFilter] = useState("gainers");

    const filteredCoins = [...marketCaps]
        .filter((coin) => filter === "gainers" ? coin.change > 0 : coin.change < 0)
        .sort((a, b) => filter === "gainers" ? b.change - a.change : a.change - b.change)
        .slice(0, 5); // Top 5


    const topGainers = [...marketCaps]
        .filter((coin) => coin.change > 0)
        .sort((a, b) => b.change - a.change)
        .slice(0, 3);

    const topLosers = [...marketCaps]
        .filter((coin) => coin.change < 0)
        .sort((a, b) => a.change - b.change)
        .slice(0, 3);

    return (
        <div>
            <div>
                <h2 className="text-[#1A3B5D] text-[16px] font-semibold mb-4">Top {filter} (24h)</h2>
                <div className="flex gap-4 items-center my-6">
                    {/* <span className="text-[#1A3B5D] font-semibold">Filter:</span> */}
                    <button
                        onClick={() => setFilter("gainers")}
                        className={`px-4 py-2 cursor-pointer text-sm font-semibold rounded ${filter === "gainers" ? "bg-[#004D61] text-white" : "bg-gray-200 text-gray-800"}`}
                    >
                        Top Gainers
                    </button>
                    <button
                        onClick={() => setFilter("losers")}
                        className={`px-4 py-2 text-sm cursor-pointer font-semibold rounded ${filter === "losers" ? "bg-[#004D61] text-white" : "bg-gray-200 text-gray-800"}`}
                    >
                        Top Losers
                    </button>
                </div>

                {/* <div className="mb-4">
  <label className="text-[#1A3B5D] font-semibold mr-2">Filter:</label>
  <select
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    className="border border-gray-300 rounded px-3 py-1 text-sm"
  >
    <option value="gainers">Top Gainers</option>
    <option value="losers">Top Losers</option>
  </select>
</div> */}

            </div>

            <div className="table__container overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Token</th>
                            <th>Symbol</th>
                            <th>Price</th>
                            <th>Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCoins.map((coin, index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{coin.name}</td>
                                <td>{coin.symbol}</td>
                                <td>${coin.price.toLocaleString()}</td>
                                <td className={coin.change < 0 ? "text-red-500 font-semibold" : "text-green-500 font-semibold"}>
                                    {coin.change > 0 ? "+" : ""}{coin.change.toFixed(2)}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>

    )
}

export default TopGainerLoser