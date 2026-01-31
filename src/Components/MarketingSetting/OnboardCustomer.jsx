import React from 'react'

const OnboardCustomer = () => {
  return (
        <div>
      <div className='flex justify-between items-center'>
        <span className='text-[#1A3B5D] text-[16px] font-semibold'>Onboarded Customer</span>
      </div>
      <div className='table__container mt-5'>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>customer ID</th>
              <th>customer name</th>
              <th>location</th>
              <th>assign to</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>UYY6586TR6R</td>
              <td>John Doe</td>
              <td>chennai</td>
              <td>santhosh</td>
              <td>
                 Active
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OnboardCustomer