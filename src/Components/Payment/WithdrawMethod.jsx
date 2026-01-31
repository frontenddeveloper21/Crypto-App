import React, { useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { IoCloseSharp } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'
import "../Style/Style.css"
import LoadingButton from '../../Auth/LoadingButton'


const WithdrawMethod = () => {

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
                <span className='text-[#1A3B5D] text-[16px] font-semibold'>Withdraw Method</span>
               
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
                            <td>Completed</td>
                        </tr>

                    </tbody>
                </table>
            </div>

            <div className={`popup__container ${popup ? "open" : ""} flex justify-center`}>
                <div className='popup__content h-fit w-3/5 lg:w-1/3 px-5 py-7'>
                    <div className='flex items-center'>
                        <span className='add__departName block'>Add Withdraw Method</span>
                        <div className='close__container grid place-content-center ml-auto cursor-pointer' onClick={handlePopup}>
                            <span> <IoCloseSharp className='close__icon' /> </span>
                        </div>
                    </div>
                    <form onSubmit={handleAddModule} className='mt-10'>
                        <div>
                            <span className='input__label mt-5 block'>Customer Name</span>
                            <input placeholder='Enter Customer Name' className='popup__input mt-2 px-4' />
                        </div>
                        {/* {departmentError && <span className='block error__msg'> {departmentError} </span>} */}

                        <div>
                            <span className='input__label mt-5 block'>Payment Type</span>
                            <input placeholder='Enter Payment Type' className='popup__input mt-2 px-4' />
                        </div>
                        <div className='mt-10 grid place-content-center'>
                            <button
                                className='profile__btn w-[180px] flex items-center justify-center'
                                type='submit'
                                disabled={addLoader}
                            >
                                {addLoader ? (
                                    <>
                                        Loading...
                                        <LoadingButton />
                                    </>
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        </div>

                    </form>
                </div>
            </div>

            
        </div>
    )
}

export default WithdrawMethod