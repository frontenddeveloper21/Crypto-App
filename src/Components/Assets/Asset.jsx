import React, { useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { FaEye } from 'react-icons/fa6'
import { IoCloseSharp } from 'react-icons/io5'

const Asset = () => {
   const [popup, setPopup] = useState(false)
   const [popupUpdate, setPopupUpdate] = useState(false)
   const [popupView, setPopupView] = useState(false)
 
   const handlePopup = () => {
     setPopup(!popup)
   }
 
   const handleUpdatePopup = () => {
     setPopupUpdate(!popupUpdate)
   }
 
   const handleViewPopup = () => {
     setPopupView(!popupView)
   }
   return (
     <div>
       <div className='flex justify-between mt-5 items-center'>
         <span className='text-[#1A3B5D] text-[16px] font-semibold'>Bitcoin Test accounts</span>
         <div>
           <button onClick={handlePopup} className="profile__btn">Add Vault Account</button>
         </div>
       </div>
       <div className='table__container mt-5'>
         <table>
           <thead>
             <tr>
               <th>S.No</th>
               <th>Created At</th>
               <th>Account</th>
               <th>Amount</th>
               <th>Action</th>
             </tr>
           </thead>
           <tbody>
             <tr>
               <td>1</td>
               <td>00/00/0000</td>
               <td>My Account</td>
               <td>59730</td>
               <td className='flex items-center justify-center gap-3'>
                 <span className='AiFillEdit grid place-content-center' onClick={() => handleUpdatePopup()}> <AiFillEdit /> </span>
                 <span className='FaEye grid place-content-center' onClick={() => handleViewPopup()}> <FaEye /> </span>
               </td>
             </tr>
 
           </tbody>
         </table>
       </div>
 
       <div className={`popup__container ${popup ? "open" : ""} flex justify-center`}>
         <div className='popup__content h-fit w-3/5 lg:w-1/3 px-5 py-7'>
           <div className='flex items-center'>
             <span className='add__departName block'>Create Vault Account</span>
             <div className='close__container grid place-content-center ml-auto cursor-pointer' onClick={handlePopup}>
               <span> <IoCloseSharp className='close__icon' /> </span>
             </div>
           </div>
           <form className='mt-10'>
             <span className='input__label mb-2 block'>Account Name</span>
             <input placeholder='Enter Account Name' className='popup__input px-4' />
             {/* {departmentError && <span className='block error__msg'> {departmentError} </span>} */}
             <div className='mt-10 grid place-content-center'>
               {/* {addLoader ? <button className='popup__btn grid place-content-center'> <ResLoader /> </button> :
                                       <button className='popup__btn' type='submit'>Submit</button>} */}
               <button className='profile__btn w-[180px]' type='submit'>Submit</button>
             </div>
           </form>
         </div>
       </div>
 
       <div className={`popup__container ${popupUpdate ? "open" : ""} flex justify-center`}>
         <div className='popup__content h-fit w-3/5 lg:w-1/3 px-5 py-7'>
           <div className='flex items-center'>
             <span className='add__departName block'>Update Vault Account</span>
             <div className='close__container grid place-content-center ml-auto cursor-pointer' onClick={handleUpdatePopup}>
               <span> <IoCloseSharp className='close__icon' /> </span>
             </div>
           </div>
           <form className='mt-10'>
             <span className='input__label mb-2 block'>Account Name</span>
             <input placeholder='Enter Account Name' className='popup__input px-4' />
             {/* {updateDepartError && <span className='block error__msg'> {updateDepartError} </span>} */}
             <div className='mt-10 grid place-content-center'>
               {/* {updateLoader ? <span className='popup__btn grid place-content-center'><ResLoader /></span> :
                                       <button className='popup__btn' type='submit'>Submit</button>} */}
               <button className='profile__btn w-[180px]' type='submit'>Submit</button>
             </div>
           </form>
         </div>
       </div>
 
       <div className={`popup__container ${popupView ? "open" : ""} flex justify-center`}>
         <div className='popup__content h-fit w-3/5 lg:w-1/3 px-5 py-7'>
           <div className='flex items-center'>
             <span className='add__departName block'>Bitcoin Test addresses</span>
             <div className='close__container grid place-content-center ml-auto cursor-pointer' onClick={handleViewPopup}>
               <span> <IoCloseSharp className='close__icon' /> </span>
             </div>
           </div>
           <div>
               <div className='text-[14px] flex flex-col gap-2 p-2 border-[1px] border-gray-200 my-5'>
                   <span className='font-bold'>Permanent Address</span>
                   <div className='flex items-center gap-5'><span className='font-bold'>Segwit:</span> <span className='text-gray-700 text-[12px] font-semibold'>tb1qku5k65hm2jyyh7f4auxpy2258ykhed4w2t769q</span></div>
                   <div className='flex items-center gap-5'><span className='font-bold'>Segwit:</span> <span className='text-gray-700 text-[12px] font-semibold'>tb1qku5k65hm2jyyh7f4auxpy2258ykhed4w2t769q</span></div>
               </div>
           </div>

            <div>
               <div className='text-[14px] pt-40 flex flex-col gap-2 p-2 border-[1px] border-gray-200 my-5'>
                   <span className='font-bold text-center'>Add BTC_TEST addresses</span>
                   <span className='text-gray-700 text-[12px] text-center font-semibold'>Create multiple deposit addresses with their own descriptions.</span>
                   <div className='flex justify-center gap-5'><button className='text-[12px] font-semibold bg-[#1A3B5D] text-[#DADADA] px-4 py-2 rounded-md'>Add Address</button></div>
               </div>
           </div>
         </div>
       </div>
     </div>
  )
}

export default Asset