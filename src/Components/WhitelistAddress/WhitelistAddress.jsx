import React, { useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { FaEye } from 'react-icons/fa6'
import { IoCloseSharp } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'
import { Search } from "lucide-react";
import { TiPlus } from "react-icons/ti"

const WhitelistAddress = () => {
    const [popup, setPopup] = useState(false)
    const [popupUpdate, setPopupUpdate] = useState(false)
    const [popupView, setPopupView] = useState(false)
    const [type, setType] = useState("Internal");
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState(null);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [addAddressPopup, setAddAddressPopup] = useState(false)

    const handleClose = () => {
        setSelectedAsset(null);
    };

    const handleCloseAddAddress = () => {
        setAddAddressPopup(false);
        setSelectedAsset(null);
    };

    const handlePopup = () => {
        setPopup(!popup)
    }

    const handleUpdatePopup = () => {
        setPopupUpdate(!popupUpdate)
    }

    const handleViewPopup = () => {
        setPopupView(!popupView)
    }

    const assets = [
        { id: "BTC_TEST", name: "Bitcoin Test", icon: "₿", color: "text-orange-500" },
        { id: "XRP_TEST", name: "XRP Test", icon: "◉", color: "text-blue-500" },
        { id: "LTC_TEST", name: "Litecoin Test", icon: "Ł", color: "text-gray-500" },
        { id: "EOS_TEST", name: "EOS Test", icon: "⬢", color: "text-black" },
        { id: "BCH_TEST", name: "Bitcoin Cash Test", icon: "Ƀ", color: "text-green-500" },
        { id: "ETC_TEST", name: "Ethereum Classic Test", icon: "Ξ", color: "text-green-600" },
        { id: "XLM_TEST", name: "Stellar Test", icon: "*", color: "text-gray-600" },
        { id: "BSV_TEST", name: "Bitcoin SV Test", icon: "Ƀ", color: "text-yellow-500" },
    ];

    const filteredAssets = assets.filter(
        (a) =>
            a.id.toLowerCase().includes(search.toLowerCase()) ||
            a.name.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <div>
            <div className='flex justify-between mt-5 items-center'>
                <span className='text-[#1A3B5D] text-[16px] font-semibold'>Whitelisted addresses</span>
                <div>
                    <button onClick={handlePopup} className="profile__btn">Create Wallet</button>
                </div>
            </div>
            <div className='table__container mt-5'>
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Created At</th>
                            <th>Wallet</th>
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
                                <span className='TiPlus grid place-content-center' onClick={() => handleUpdatePopup()}> <TiPlus /> </span>
                                <span className='FaEye grid place-content-center' onClick={() => handleViewPopup()}> <FaEye /> </span>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

            <div className={`popup__container ${popup ? "open" : ""} flex justify-center`}>
                <div className='popup__content h-fit w-3/5 lg:w-1/3 px-5 py-7'>
                    <div className='flex items-center'>
                        <span className='add__departName block'>Create whitelisted wallet</span>
                        <div className='close__container grid place-content-center ml-auto cursor-pointer' onClick={handlePopup}>
                            <span> <IoCloseSharp className='close__icon' /> </span>
                        </div>
                    </div>
                    <form className='mt-10'>
                        <div className=" pt-4 pb-2">
                            {/* Type Selection */}
                            <label className="block text-sm font-medium mb-2">Type</label>
                            <div className="flex gap-2 mb-4">
                                {["Internal", "External", "Contract"].map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => setType(option)}
                                        className={`px-4 py-2 rounded-md border text-sm font-medium ${type === option
                                            ? "bg-blue-50 border-[#1A3B5D] text-[#1A3B5D]"
                                            : "border-gray-300 text-gray-600 hover:bg-gray-50"
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <span className='input__label mb-2 block'>Account Name</span>
                            <input placeholder='Enter Account Name' className='popup__input px-4' />
                            {/* {departmentError && <span className='block error__msg'> {departmentError} </span>} */}
                        </div>
                        <div className='mt-10 grid place-content-center'>
                            {/* {addLoader ? <button className='popup__btn grid place-content-center'> <ResLoader /> </button> :
                                      <button className='popup__btn' type='submit'>Submit</button>} */}
                            <button className='profile__btn w-[180px]' type='submit'>Create Wallet</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className={`popup__container ${popupUpdate ? "open" : ""} flex justify-center`}>
                <div className='popup__content h-fit w-3/5 lg:w-1/3 px-5 py-7'>
                    <div className='flex py-5 items-center'>
                        <span className='add__departName block'>Add whitelisted address</span>
                        <div className='close__container grid place-content-center ml-auto cursor-pointer' onClick={handleUpdatePopup}>
                            <span> <IoCloseSharp className='close__icon' /> </span>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="px-6 py-3">
                        <div className="flex items-center gap-2 border rounded-md px-3 py-2 bg-gray-50">
                            <Search size={18} className="text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search for an asset or contract"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-transparent outline-none text-sm"
                            />
                        </div>
                    </div>

                    {/* Asset List */}
                    {/* Asset List */}
                    <div className="flex-1 overflow-y-auto px-2 pb-4">
                        {filteredAssets.map((asset) => (
                            <div
                                key={asset.id}
                                onClick={() => {
                                    setSelected(asset.id);
                                    setSelectedAsset(asset);   // store clicked asset details
                                    setAddAddressPopup(true);  // open AddAddressModal
                                    setPopupUpdate(false);     // close update modal
                                }}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition 
        ${selected === asset.id
                                        ? "bg-[#D2E9EA] border border-blue-200 shadow-sm"
                                        : "hover:bg-gray-50"
                                    }`}
                            >
                                {/* Icon */}
                                <div className={`w-8 h-8 flex items-center justify-center text-lg ${asset.color}`}>
                                    {asset.icon}
                                </div>
                                {/* Info */}
                                <div>
                                    <p className="text-sm font-medium">{asset.id}</p>
                                    <p className="text-xs text-gray-500">{asset.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Add Address Modal */}
            {addAddressPopup && selectedAsset && (
                <div className={`popup__container ${addAddressPopup ? "open" : ""} flex justify-center`}>
                    <div className="popup__content h-fit w-3/5 lg:w-1/3 px-5 py-7">
                        <div className="flex items-center">
                            <span className="add__departName block">Add whitelisted address</span>
                            <div className='close__container grid place-content-center ml-auto cursor-pointer' onClick={handleCloseAddAddress}>
                                <span> <IoCloseSharp className='close__icon' /> </span>
                            </div>
                        </div>

                        {/* Asset Header */}
                        <div className="flex items-center gap-2 mt-4 mb-6">
                            <div className={`w-8 h-8 flex items-center justify-center text-lg ${selectedAsset.color}`}>
                                {selectedAsset.icon}
                            </div>
                            <span className="text-gray-800 font-medium">{selectedAsset.name}</span>
                        </div>

                        {/* Address Input */}
                        <div>
                            <label className="input__label mb-2 block">Address</label>
                            <input
                                placeholder="Enter Address"
                                className="popup__input px-4"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                className="white__btn w-[100px]"
                                onClick={handleCloseAddAddress}
                            >
                                Cancel
                            </button>
                            <button className="profile__btn w-[100px]">
                                Add address
                            </button>
                        </div>
                    </div>
                </div>
            )}


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

export default WhitelistAddress