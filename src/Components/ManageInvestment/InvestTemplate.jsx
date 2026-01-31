import React from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'

const InvestTemplate = () => {
    return (
        <div>
            <div className='flex justify-between items-center'>
                <span className='text-[#1A3B5D] text-[16px] font-semibold'>Invest Template</span>
                <div>
                    <button className="profile__btn mt-5">Add Invester</button>
                </div>
            </div>
            <div className='table__container mt-5'>
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>date</th>
                            <th>Investment ID</th>
                            <th>List of coins</th>
                            <th>mini investment</th>
                            <th>invester count</th>
                            <th>Status </th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>00/00/0000</td>
                            <td>UYY6586TR6R</td>
                            <td>10</td>
                            <td>100</td>
                            <td>5</td>
                            <td>inprogress</td>
                            <td className='flex items-center justify-center gap-3'>
                                <span className='AiFillEdit grid place-content-center'> <AiFillEdit /> </span>
                                <span className='MdDelete grid place-content-center'> <MdDelete /> </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default InvestTemplate