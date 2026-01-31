import React from 'react'

const BonusSetting = () => {
  return (
      <div>
      <div className='flex justify-between items-center'>
        <span className='text-[#1A3B5D] text-[16px] font-semibold'>Bonus Settings</span>
      </div>
      <div className='table__container mt-5'>
        <table>
          <thead>
            <tr>
              <th>Create</th>
              <th>S.No</th>
              <th>bonus ID</th>
              <th>purpose</th>
              <th>percentage</th>
              <th>count</th>
              <th>Copy Link</th>
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
              <td>
                 copy
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BonusSetting