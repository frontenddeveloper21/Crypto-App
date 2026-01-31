import React, { useState } from 'react';


const InvestmentPlan = () => {


  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1A3B5D] mb-6">Investment History</h2>
      
      <div className='table__container mt-5'>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Investment ID</th>
              <th>customer count</th>
              <th>total investment</th>
              <th>active purchase count</th>
              <th>non active purchase count</th>
              <th>status</th>
              <th>closed date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>1</td>
                <td>070HUYH6596</td>
                <td>10</td>
                <td>10000</td>
                <td>100</td>
                <td>20</td>
                <td>success</td>
                <td>00/00/0000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvestmentPlan;
