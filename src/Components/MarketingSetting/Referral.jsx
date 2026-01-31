import React from 'react'

const Referral = () => {
  return (
        <div>
      <div className='flex justify-between items-center'>
        <span className='text-[#1A3B5D] text-[16px] font-semibold'>Referral</span>
      </div>
      <div className='table__container mt-5'>
        <table>
          <thead>
            <tr>
              <th>Create percentage</th>
              <th>S.No</th>
              <th>customer ID</th>
              <th>customer name</th>
              <th>count</th>
              <th>transactions</th>
              <th>commisions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
             <td></td>
              <td>1</td>
              <td>UYY6586TR6R</td>
              <td>John Doe</td>
              <td>10</td>
              <td>100</td>
              <td>10000
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Referral