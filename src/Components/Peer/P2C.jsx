import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-gray-800 font-semibold text-xs pb-2 uppercase">
      {label}
    </p>
    <p className="text-gray-500 text-[12px] break-words">{value}</p>
  </div>
);


const P2C = () => {
  const [p2cData] = useState([
    {
      id: 1,
      date: "25/09/2025",
      sender: "0xA12b...9dF",
      company: "Amazon Inc.",
      amount: "120 USDT",
      asset: "USDT",
      status: "Completed",
      transactionHash: "0x93af...b91",
      purpose: "Subscription Payment",
      details: [
        {
          assetName: "Apple Inc.",
          assetType: "Stock",
          quantity: 15,
          purchasePrice: "$120",
          currentPrice: "$150",
        },
        {
          assetName: "Bitcoin",
          assetType: "Crypto",
          quantity: 0.5,
          purchasePrice: "$30,000",
          currentPrice: "$40,000",
        },
      ],
    },
    {
      id: 2,
      date: "24/09/2025",
      sender: "0xB44f...c91",
      company: "Netflix",
      amount: "15 USDT",
      asset: "USDT",
      status: "Pending",
      transactionHash: "0x7da2...cd2",
      purpose: "Monthly Plan",
      details: [
        {
          assetName: "Apple Inc.",
          assetType: "Stock",
          quantity: 15,
          purchasePrice: "$120",
          currentPrice: "$150",
        },
        {
          assetName: "Bitcoin",
          assetType: "Crypto",
          quantity: 0.5,
          purchasePrice: "$30,000",
          currentPrice: "$40,000",
        },
      ],
    },
  ]);

  const [expandedRow, setExpandedRow] = useState(null);

  const toggleRow = (id) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mt-5">
        <span className="text-[#1A3B5D] text-[18px] font-semibold">
          P2C Transaction History
        </span>
      </div>

      <div className="table__container mt-5">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Sender</th>
              <th>Company</th>
              <th>Amount</th>
              <th>Asset</th>
              <th>Status</th>
              <th>Tx Hash</th>
              <th>Purpose</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {p2cData.map((tx) => (
              <React.Fragment key={tx.id}>
                <tr>
                  <td>{tx.id}</td>
                  <td>{tx.date}</td>
                  <td>{tx.sender}</td>
                  <td>{tx.company}</td>
                  <td>{tx.amount}</td>
                  <td>{tx.asset}</td>
                  <td
                    className={`font-semibold ${
                      tx.status === "Completed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {tx.status}
                  </td>
                  <td>{tx.transactionHash}</td>
                  <td>{tx.purpose}</td>
                  <td>
                    <button onClick={() => toggleRow(tx.id)}>
                                          {expandedRow === tx.id ? (
                                            <span className="grid font-bold MdKeyboardArrowDown place-content-center">
                                              <MdKeyboardArrowDown />
                                            </span>
                                          ) : (
                                            <span className="grid MdKeyboardArrowDown place-content-center">
                                              <MdKeyboardArrowRight />
                                            </span>
                                          )}
                                        </button>
                  </td>
                </tr>

                {expandedRow === tx.id && (
                  <tr>
                    <td colSpan="10" className="p-4 bg-gray-50">
                      <div className="grid grid-cols-6 gap-x-5 gap-y-6 transition-all duration-300 ease-in-out">
                        {tx.details.map((asset, i) => (
                          <React.Fragment key={i}>
                            <DetailItem label="#" value={i + 1} />
                            <DetailItem label="Asset Name" value={asset.assetName} />
                            <DetailItem label="Asset Type" value={asset.assetType} />
                            <DetailItem label="Quantity" value={asset.quantity} />
                            <DetailItem label="Purchase Price" value={asset.purchasePrice} />
                            <DetailItem label="Current Price" value={asset.currentPrice} />
                          </React.Fragment>
                        ))}
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

export default P2C;
