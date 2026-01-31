import React, { useState } from 'react';
import { BiNotification } from 'react-icons/bi';
import { MdWhatsapp } from 'react-icons/md';
import { MdEmail } from 'react-icons/md';
import { IoMdNotificationsOutline } from 'react-icons/io';

const Remarketing = () => {
  const [activeTab, setActiveTab] = useState('whatsapp');

  const tabs = [
    { key: 'whatsapp', label: 'WhatsApp', icon: <MdWhatsapp /> },
    { key: 'email', label: 'Email', icon: <MdEmail /> },
    { key: 'system', label: 'System Notifications', icon: <IoMdNotificationsOutline /> },
  ];

  const renderTableContent = () => {
    switch (activeTab) {
      case 'whatsapp':
        return (
          <tbody>
            <tr>
              <td>1</td>
              <td>WA123456</td>
              <td>John Doe</td>
              <td>Pending</td>
              <td>
                <span className='grid place-content-center text-green-600'>
                  <MdWhatsapp size={20} />
                </span>
              </td>
            </tr>
          </tbody>
        );
      case 'email':
        return (
          <tbody>
            <tr>
              <td>1</td>
              <td>EM987654</td>
              <td>Jane Smith</td>
              <td>Sent</td>
              <td>
                <span className='grid place-content-center text-blue-600'>
                  <MdEmail size={20} />
                </span>
              </td>
            </tr>
          </tbody>
        );
      case 'system':
        return (
          <tbody>
            <tr>
              <td>1</td>
              <td>SYS332211</td>
              <td>Alex Johnson</td>
              <td>In Progress</td>
              <td>
                <span className='grid place-content-center text-yellow-600'>
                  <BiNotification size={20} />
                </span>
              </td>
            </tr>
          </tbody>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <span className='text-[#1A3B5D] text-[16px] font-semibold'>Remarketing</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-5">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-md border text-sm flex items-center gap-2
              ${activeTab === tab.key
                ? 'bg-[#1A3B5D] text-white'
                : 'bg-white text-[#1A3B5D] border-gray-300'}`}
          >
            {tab.icon}
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
              <th>Customer Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {renderTableContent()}
        </table>
      </div>
    </div>
  );
};

export default Remarketing;
