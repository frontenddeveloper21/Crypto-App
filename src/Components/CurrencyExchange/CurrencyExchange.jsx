// import React, { useState } from 'react';
// import Select from 'react-select';

// // Dummy currency data
// const currencies = [
//   { symbol: 'BTC', name: 'Bitcoin', rateToUSD: 27845 },
//   { symbol: 'ETH', name: 'Ethereum', rateToUSD: 1732 },
//   { symbol: 'USDT', name: 'Tether', rateToUSD: 1 },
//   { symbol: 'BNB', name: 'BNB', rateToUSD: 215.45 },
//   { symbol: 'SOL', name: 'Solana', rateToUSD: 21.75 },
// ];

// // Convert currencies to react-select format
// const currencyOptions = currencies.map(c => ({
//   value: c.symbol,
//   label: `${c.name} (${c.symbol})`
// }));

// const CurrencyExchange = () => {
//   const [from, setFrom] = useState('BTC');
//   const [to, setTo] = useState('ETH');
//   const [amount, setAmount] = useState(1);

//   const fromCurrency = currencies.find(c => c.symbol === from);
//   const toCurrency = currencies.find(c => c.symbol === to);

//   const rate = fromCurrency.rateToUSD / toCurrency.rateToUSD;
//   const converted = amount * rate;

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
//       <h2 className="text-2xl font-bold text-[#1A3B5D] mb-6">Currency Exchange</h2>

//       {/* FROM */}
//       <div className="mb-4">
//         <label className="block mb-1 font-medium text-gray-700">From</label>
//         <Select
//           className="select__option"
//           options={currencyOptions}
//           value={currencyOptions.find(opt => opt.value === from)}
//           onChange={(selected) => setFrom(selected.value)}
//         />
//       </div>

//       {/* TO */}
//       <div className="mb-4">
//         <label className="block mb-1 font-medium text-gray-700">To</label>
//         <Select
//           className="select__option"
//           options={currencyOptions}
//           value={currencyOptions.find(opt => opt.value === to)}
//           onChange={(selected) => setTo(selected.value)}
//         />
//       </div>

//       {/* Amount Input */}
//       <div className="mb-4">
//         <label className="block mb-1 font-medium text-gray-700">Amount</label>
//         <input
//           type="number"
//           className="w-full border border-gray-300 p-2 rounded"
//           value={amount}
//           onChange={(e) => setAmount(Number(e.target.value))}
//         />
//       </div>

//       {/* Swap Button */}
//       {/* <div className="flex justify-end mb-4">
//         <button
//           className="text-sm text-blue-500 underline"
//           onClick={() => {
//             setFrom(to);
//             setTo(from);
//           }}
//         >
//           🔄 Swap Currencies
//         </button>
//       </div> */}

//       {/* Result */}
//       <div className="bg-gray-100 p-4 rounded">
//         <p className="text-lg font-semibold text-[#1A3B5D]">
//           {amount} {from} ≈ {converted.toFixed(6)} {to}
//         </p>
//         <p className="text-sm text-gray-600 mt-1">
//           Exchange Rate: 1 {from} = {rate.toFixed(6)} {to}
//         </p>
//       </div>

//       {/* Exchange Action (Optional) */}
//       <div className="mt-6">
//         <button className="w-full bg-[#004D61] text-white py-3 rounded transition">
//           Exchange
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CurrencyExchange;

import React, { useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { FaEye } from 'react-icons/fa6'
import { IoCloseSharp } from 'react-icons/io5'

const CurrencyExchange = () => {
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
         <span className='text-[#1A3B5D] text-[16px] font-semibold'>Currency Exchange</span>
         {/* <div>
           <button onClick={handlePopup} className="profile__btn">Add Vault Account</button>
         </div> */}
       </div>
       <div className='table__container mt-5'>
         <table>
           <thead>
             <tr>
               <th>S.No</th>
               <th>coin id</th>
               <th>coin name</th>
               <th>opening Amount</th>
               <th>Amount</th>
               <th>total purchase</th>
               <th>View Details</th>
             </tr>
           </thead>
           <tbody>
             <tr>
               <td>1</td>
               <td>6766T</td>
               <td> Bit coin</td>
               <td>59730</td>
               <td>202O0O</td>
               <td>50000</td>
               <td className='flex items-center justify-center gap-3'>
                 {/* <span className='AiFillEdit grid place-content-center' onClick={() => handleUpdatePopup()}> <AiFillEdit /> </span> */}
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
         <div className='popup__content h-fit w-3/5 lg:w-2/3 px-5 py-7'>
           <div className='flex items-center'>
             <span className='add__departName block'>My Account</span>
             <div className='close__container grid place-content-center ml-auto cursor-pointer' onClick={handleViewPopup}>
               <span> <IoCloseSharp className='close__icon' /> </span>
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
             </tr>
           </thead>
           <tbody>
             <tr>
               <td>1</td>
               <td>00/00/0000</td>
               <td>UDSC</td>
               <td>59730</td>
             </tr>
           </tbody>
         </table>
         </div>
         </div>
       </div>
     </div>
  )
}

export default CurrencyExchange