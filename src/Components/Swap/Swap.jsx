import React, { useState } from 'react'
import "../Style/Style.css"

import { ChevronDown, ChevronUp } from "lucide-react";

// Select library
import Select from 'react-select';

const Swap = () => {
    const [open, setOpen] = useState(true);
    return (
        <div className='flex justify-center'>
            <div className='w-2/4 border border-gray-200 p-10 rounded-lg'>
                <div>
                    <span className='input__label font-semibold mb-2 block'>Vault account</span>
                    <Select
                        isClearable={true}
                        className="select__option"
                        styles={{
                            control: (base) => ({
                                ...base,
                                minHeight: "48px",
                                borderRadius: "6px",
                                border: "1px solid #DADADA",
                                fontSize: "14px",
                                fontWeight: 500,
                                color: "#000",
                                boxShadow: "none",
                                outline: "none",
                            }),
                            valueContainer: (base) => ({
                                ...base,
                                padding: "0px 12px",
                            }),
                        }}
                        value=""
                        placeholder="Select a Account"
                    />
                </div>
                <div className='p-5 border bg-[#D2E9EA] mt-4 border-gray-200 rounded-lg'>
                    <span className='input__label text-lg font-semibold mb-2 mt-5 block'>Amount</span>
                    <div className='flex items-center justify-between'>
                        <div>
                            <span className='font-semibold block mb-2'>Swap from</span>
                            <Select
                                isClearable={true}
                                className="select__option w-[300px]"
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        minHeight: "48px",
                                        borderRadius: "6px",
                                        border: "1px solid #DADADA",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        color: "#000",
                                        boxShadow: "none",
                                        outline: "none",
                                    }),
                                    valueContainer: (base) => ({
                                        ...base,
                                        padding: "0px 12px",
                                    }),
                                }}
                                value=""
                                placeholder="Select a Account"
                            />
                        </div>
                        <div>
                            <div><span>Balance:</span><span>00.928546</span></div>
                            <span className='text-5xl font-extrabold text-gray-700'>100</span>
                            <span className='block'>$435,371.29</span>
                        </div>
                    </div>
                </div>

                <div className='p-5 border bg-[#D2E9EA]  mt-4 border-gray-200 rounded-lg'>
                    <span className='input__label text-lg font-semibold mb-2 mt-5 block'>Amount</span>
                    <div className='flex items-center justify-between'>
                        <div>
                            <span className='font-semibold block mb-2'>Swap from</span>
                            <Select
                                isClearable={true}
                                className="select__option w-[300px]"
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        minHeight: "48px",
                                        borderRadius: "6px",
                                        border: "1px solid #DADADA",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        color: "#000",
                                        boxShadow: "none",
                                        outline: "none",
                                    }),
                                    valueContainer: (base) => ({
                                        ...base,
                                        padding: "0px 12px",
                                    }),
                                }}
                                value=""
                                placeholder="Select a Account"
                            />
                        </div>
                        <div>
                            <div><span>Balance:</span><span>00.928546</span></div>
                            <span className='text-5xl font-extrabold text-gray-700'>10008</span>
                            <span className='block'>$435,371.29</span>
                        </div>
                    </div>
                </div>

                <div className="w-full mt-5 mx-auto rounded-lg border border-gray-200 shadow-sm bg-white">
                    {/* Header */}
                    <button
                        className="w-full flex items-center justify-between px-4 py-5 border-b border-gray-200 bg-gray-50 rounded-t-lg"
                        onClick={() => setOpen(!open)}
                    >
                        <span className="font-medium text-gray-800">Options and fees</span>
                        {open ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                    </button>

                    {/* Content */}
                    {open && (
                        <div className="divide-y font-semibold divide-gray-100">
                            {[
                                "Route",
                                "Slippage tolerance",
                                "Price impact",
                                "Uniswap fee",
                                "Network fee",
                            ].map((label, idx) => (
                                <div
                                    key={idx}
                                    className="flex justify-between items-center px-4 py-3 text-sm"
                                >
                                    <span className="text-gray-700">{label}</span>
                                    <span className="h-2.5 w-28 rounded-full bg-gray-100 animate-pulse"></span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Swap