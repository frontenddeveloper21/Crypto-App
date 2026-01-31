import React from 'react'

const StakePlan = () => {
  return (
        <div>
             <div className='flex justify-between items-center'>
                 <span className='text-[#1A3B5D] text-[16px] font-semibold'>Stake Plan</span>
                 
             </div>
             <div className='table__container mt-5'>
                 <table>
                     <thead>
                         <tr>
                             <th>S.No</th>
                             <th>Coin name</th>
                             <th>Holding</th>
                         </tr>
                     </thead>
                     <tbody>
                         <tr>
                             <td>1</td>
                             <td>bit coin</td>
                             <td>UYY6586TR6R</td>
                         </tr>
                     </tbody>
                 </table>
             </div>
         </div>
  )
}

export default StakePlan