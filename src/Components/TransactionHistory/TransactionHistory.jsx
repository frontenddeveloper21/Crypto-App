import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

const TransactionHistory = () => {
  // ✅ Dummy data (replace with API later)
  const [transactions] = useState([
    {
      id: 1,
      date: "25/09/2025",
      source: "External",
      destination: "USDC",
      amount: "59,730",
      asset: "Bitcoin Test",
      status: "Completed",
      initiator: "Krish",
      details: {
        transactionType: "Transfer",
        sourceAddress: "0xB44fhdggfty5486tbbr67tc91",
        destinationAddress: "0xA22chgfuegyftt3757658gfeF4",
        tokenName: "Ethereum Test (Sepolia)",
        transactionHash: "0x7da2fkjhyu4t76764bct6t7het4t7676cbt64rcd2",
        fireblocks: "0x7da2fkjhyu4t76764bct6t7het4t7676cbt64rcd2",
        networkFee: "0.00012 ETH",
        valueUSD: "$12,000.00",
        subStatus: "Waiting for Confirmation",
        lastUpdated: "24/09/2025 04:15 PM",
      },
    },
    {
      id: 2,
      date: "24/09/2025",
      source: "Internal",
      destination: "ETH",
      amount: "12,000",
      asset: "Ethereum",
      status: "Pending",
      initiator: "Admin",
      details: {
        transactionType: "Transfer",
        sourceAddress: "0xB44fhdggfty5486tbbr67tc91",
        destinationAddress: "0xA22chgfuegyftt3757658gfeF4",
        tokenName: "Ethereum Test (Sepolia)",
        transactionHash: "0x7da2fkjhyu4t76764bct6t7het4t7676cbt64rcd2",
        fireblocks: "0x7da2fkjhyu4t76764bct6t7het4t7676cbt64rcd2",
        networkFee: "0.00012 ETH",
        valueUSD: "$12,000.00",
        subStatus: "Waiting for Confirmation",
        lastUpdated: "24/09/2025 04:15 PM",
      },
    },
  ]);

  // ✅ Only one expanded row at a time
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleRow = (id) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <h2 className="text-[#1A3B5D] text-[16px] font-semibold mb-4">
        Transaction History
      </h2>

      <div className="table__container mt-5">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Date</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Amount</th>
              <th>Asset</th>
              <th>Status</th>
              <th>Initiator</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
  {transactions.map((tx, index) => (
    <React.Fragment key={tx.id}>
      <tr>
        <td>{index + 1}</td>
        <td>{tx.date}</td>
        <td>{tx.source}</td>
        <td>{tx.destination}</td>
        <td>{tx.amount}</td>
        <td>{tx.asset}</td>
        <td>{tx.status}</td>
        <td>{tx.initiator}</td>
        <td>
          <button onClick={() => toggleRow(tx.id)}>
            {expandedRow === tx.id ? <span className="grid MdKeyboardArrowDown font-bold place-content-center"><MdKeyboardArrowDown /></span> : <span className="grid place-content-center MdKeyboardArrowDown"><MdKeyboardArrowRight /></span>}
          </button>
        </td>
      </tr>

      {expandedRow === tx.id && (
        <tr>
          <td colSpan="9" className="p-4">
            <div className="grid grid-cols-5 gap-x-5 gap-y-8 ease-in-out transition-all duration-500">
              <DetailItem label="Transaction Type" value={tx.details.transactionType} />
              <DetailItem label="Source Address" value={tx.details.sourceAddress} />
              <DetailItem label="Destination Address" value={tx.details.destinationAddress} />
              <DetailItem label="Token Name" value={tx.details.tokenName} />
              <DetailItem label="Transaction Hash" value={tx.details.transactionHash} />
              <DetailItem label="Fireblocks Transaction ID" value={tx.details.fireblocks} />
              <DetailItem label="Network Fee" value={tx.details.networkFee} />
              <DetailItem label="Value (USD)" value={tx.details.valueUSD} />
              <DetailItem label="Sub-status" value={tx.details.subStatus} />
              <DetailItem label="Last Updated" value={tx.details.lastUpdated} />
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
};

// ✅ Reusable component for detail items
const DetailItem = ({ label, value }) => (
  <div>
    <p className=" text-gray-800 font-semibold text-xs pb-2 uppercase">{label}</p>
    <p className="text-gray-500 text-[12px] break-words">{value}</p>
  </div>
);

export default TransactionHistory;
