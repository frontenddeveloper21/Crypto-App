import { FaWallet, FaCoins, FaArrowUp, FaEthereum } from 'react-icons/fa';
import { MdOutlineUpdate } from 'react-icons/md';
import { AiOutlineTransaction } from 'react-icons/ai';

const summaryCards = [
  {
    title: "Total Transactions",
    value: "1,234",
    icon: <AiOutlineTransaction className="text-blue-500 text-3xl" />,
    bg: "bg-blue-50",
  },
  {
    title: "Total Volume",
    value: "12.4 BTC",
    icon: <FaCoins className="text-yellow-500 text-3xl" />,
    bg: "bg-yellow-50",
  },
  {
    title: "Average Txn Value",
    value: "0.01 BTC",
    icon: <FaArrowUp className="text-green-500 text-3xl" />,
    bg: "bg-green-50",
  },
  {
    title: "Active Wallets",
    value: "452",
    icon: <FaWallet className="text-purple-500 text-3xl" />,
    bg: "bg-purple-50",
  },
  {
    title: "Top Token",
    value: "USDT",
    icon: <FaEthereum className="text-indigo-500 text-3xl" />,
    bg: "bg-indigo-50",
  },
  {
    title: "Last Updated",
    value: "2025-10-03",
    icon: <MdOutlineUpdate className="text-gray-500 text-3xl" />,
    bg: "bg-gray-100",
  },
];


const CryptoSummary = () => {
  return (
  <div>
  <h2 className="text-[#1A3B5D] text-[16px] font-semibold mb-6">Crypto Summary</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {summaryCards.map((card, index) => (
      <div
        key={index}
        className={`flex items-center gap-4 p-5 rounded-lg shadow-md ${card.bg}`}
      >
        <div className="p-3 bg-white rounded-full shadow">{card.icon}</div>
        <div>
          <p className="text-sm text-gray-600">{card.title}</p>
          <p className="text-xl font-semibold text-[#1A3B5D]">{card.value}</p>
        </div>
      </div>
    ))}
  </div>
</div>


  )
}

export default CryptoSummary