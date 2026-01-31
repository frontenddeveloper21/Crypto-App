import React, { useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { IoCloseSharp } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'
import "../Style/Style.css"
import LoadingButton from '../../Auth/LoadingButton'


const PendingDeposit = () => {

    const [popup, setPopup] = useState(false)
    const [addLoader, setAddLoader] = useState(false);

    const [popupUpdate, setPopupUpdate] = useState(false)
    const handlePopup = () => {
        setPopup(!popup)
    }

    const handleUpdatePopup = () => {
        setPopupUpdate(!popupUpdate)
    }

    const handleAddModule = (e) => {
        e.preventDefault();
        setAddLoader(true);

        // Simulate API call
        setTimeout(() => {
            setAddLoader(false);
            setPopup(false); // close popup after submission
        }, 2000);
    };

    return (
        <div>
            <div className='flex justify-between items-center'>
                <span className='text-[#1A3B5D] text-[16px] font-semibold'>Pending Deposit</span>
                
            </div>
            <div className='table__container mt-8'>
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Customer ID</th>
                            <th>Customer Name</th>
                            <th>Payment Type</th>
                            <th>Updated At</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>CY178</td>
                            <td>Santhosh</td>
                            <td>Google Pay</td>
                            <td>00/00/0000</td>
                            <td>Internal</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PendingDeposit