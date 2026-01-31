import React from 'react'

const History = () => {
  return (
      <div>
      <div className='flex justify-between items-center'>
        <span className='text-[#1A3B5D] text-[16px] font-semibold'>History</span>
      </div>
      <div className='table__container mt-5'>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Order</th>
              <th>Quantity</th>
              <th>Limit</th>
              <th>Stop Lose</th>
              <th>Coin Value</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>UYY6586TR6R</td>
              <td>John Doe</td>
              <td>Buy</td>
              <td>10</td>
              <td>100</td>
              <td>5</td>
              <td>$200</td>
              <td>$2000</td>
              <td>Active</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default History