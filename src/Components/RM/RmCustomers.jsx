import React, { useState } from 'react';

const RmCustomers = () => {
  const [activeTab, setActiveTab] = useState('customerlist');

  const tabs = [
    { key: 'customerlist', label: 'Customer List' },
    { key: 'customerstatus', label: 'Customer Status' },
    { key: 'customerdetails', label: 'Customer Details' },
  ];

  const renderTableRows = () => {
    switch (activeTab) {
      case 'customerlist':
        return (
          <tbody>
            <tr>
              <td>1</td>
              <td>CUS092</td>
              <td>Krish</td>
              <td>04/10/2025</td>
              <td>fb</td>
            </tr>
            <tr>
              <td>2</td>
              <td>CUS093</td>
              <td>03/10/2025</td>
              <td>priya</td>
              <td>9876543210</td>
            </tr>
          </tbody>
        );

      case 'customerstatus':
        return (
          <tbody>
            <tr>
              <td>1</td>
              <td>02/10/2025</td>
              <td>Rahul</td>
              <td>rahul@haodapayments.com</td>
              <td>9123456789</td>
            </tr>
            <tr>
              <td>2</td>
              <td>01/10/2025</td>
              <td>Anjali</td>
              <td>anjali@haodapayments.com</td>
              <td>9988776655</td>
            </tr>
          </tbody>
        );

      case 'customerdetails':
        return (
          <tbody>
            <tr>
              <td>1</td>
              <td>30/09/2025</td>
              <td>Deepak</td>
              <td>deepak@haodapayments.com</td>
              <td>9001122334</td>
            </tr>
            <tr>
              <td>2</td>
              <td>29/09/2025</td>
              <td>Kavya</td>
              <td>kavya@haodapayments.com</td>
              <td>9112233445</td>
            </tr>
          </tbody>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <div className='flex justify-between items-center mt-5 mb-4'>
        <span className='text-[#1A3B5D] text-[16px] font-semibold'>Call Log</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-5">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-md border text-sm font-medium
              ${activeTab === tab.key
                ? 'bg-[#1A3B5D] text-white'
                : 'bg-white text-[#1A3B5D] border-gray-300'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className='table__container'>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Customer ID</th>
              <th>customer name</th>
              <th>date</th>
              <th>sources</th>
              <th>Assign</th>
              <th>call log count</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          {renderTableRows()}
        </table>
      </div>
    </div>
  );
};

export default RmCustomers;
