
import React from 'react';

// Dummy investment history data
const investmentHistory = [
  {
    id: 'INV001',
    planName: 'Fixed Plan',
    type: 'fixed',
    amount: 1000,
    interestEarned: 30,
    totalReturn: 1030,
    startDate: '2025-09-01',
    endDate: '2025-10-01',
    status: 'Completed',
  },
  {
    id: 'INV002',
    planName: 'Daily Return Plan',
    type: 'daily',
    amount: 500,
    interestEarned: 112.5,
    totalReturn: 612.5,
    startDate: '2025-09-20',
    endDate: '2025-10-05',
    status: 'Active',
  },
  {
    id: 'INV003',
    planName: 'Flexible Plan',
    type: 'flexible',
    amount: 300,
    interestEarned: 24,
    totalReturn: 324,
    startDate: '2025-08-10',
    endDate: '2025-09-10',
    status: 'Completed',
  }
];

const statusColors = {
  Active: 'text-green-600 bg-green-100',
  Completed: 'text-blue-600 bg-blue-100',
  Cancelled: 'text-red-600 bg-red-100'
};

const ReturnHistory = () => {
  return (
    <div>
      <h2 className='text-[#1A3B5D] text-[18px] font-semibold'>Return History</h2>

      <div className='table__container mt-5'>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Investment ID</th>
              <th>Customer name</th>
              <th>payment type</th>
              <th>bank account</th>
              <th>commisions</th>
              <th>Status </th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>1</td>
                <td>UYY6586TR6R</td>
                <td>Krishnaveni</td>
                <td>Online IMPS</td>
                <td>TT768TYU675756TR5</td>
                <td>10,000</td>
                <td>Active</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReturnHistory;
