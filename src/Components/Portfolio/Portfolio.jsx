import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

const Portfolio = () => {
  // ✅ Dummy portfolio data (replace with API data later)
  const [portfolios] = useState([
    {
      id: 1,
      username: "John Doe",
      portfolioName: "Retirement Fund",
      totalValue: "$25,000",
      createdDate: "25/09/2025",
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
      username: "Jane Smith",
      portfolioName: "Growth Portfolio",
      totalValue: "$18,000",
      createdDate: "24/09/2025",
      details: [
        {
          assetName: "Tesla",
          assetType: "Stock",
          quantity: 5,
          purchasePrice: "$700",
          currentPrice: "$800",
        },
        {
          assetName: "Ethereum",
          assetType: "Crypto",
          quantity: 2,
          purchasePrice: "$1,800",
          currentPrice: "$2,100",
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
      <h2 className="text-[#1A3B5D] text-[16px] font-semibold mb-4">
        Portfolio Overview
      </h2>

      <div className="table__container mt-5">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Username</th>
              <th>Portfolio Name</th>
              <th>Total Value</th>
              <th>Created Date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {portfolios.map((pf, index) => (
              <React.Fragment key={pf.id}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{pf.username}</td>
                  <td>{pf.portfolioName}</td>
                  <td>{pf.totalValue}</td>
                  <td>{pf.createdDate}</td>
                  <td>
                    <button onClick={() => toggleRow(pf.id)}>
                      {expandedRow === pf.id ? (
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

                {/* ✅ Expanded Asset Details */}
                {expandedRow === pf.id && (
                  <tr>
                    <td colSpan="5" className="p-4">
                      <div className="grid grid-cols-6 gap-x-5 gap-y-8 transition-all duration-500 ease-in-out">
                        {pf.details.map((asset, i) => (
                          <React.Fragment key={i}>
                            <DetailItem label="" value= {i + 1} />
                            <DetailItem label="Asset Name" value={asset.assetName} />
                            <DetailItem label="Asset Type" value={asset.assetType} />
                            <DetailItem label="Quantity" value={asset.quantity} />
                            <DetailItem
                              label="Purchase Price"
                              value={asset.purchasePrice}
                            />
                            <DetailItem
                              label="Current Price"
                              value={asset.currentPrice}
                            />
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

// ✅ Reusable component for asset detail items
const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-gray-800 font-semibold text-xs pb-2 uppercase">
      {label}
    </p>
    <p className="text-gray-500 text-[12px] break-words">{value}</p>
  </div>
);

export default Portfolio;
