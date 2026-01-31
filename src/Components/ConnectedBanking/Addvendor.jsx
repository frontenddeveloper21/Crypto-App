import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from 'react-select';

const VendorDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("info");

    const [bankAccounts, setBankAccounts] = useState([
        {
            id: Date.now(),
            holder: "",
            number: "",
            ifsc: "",
            bank: "",
            branch: "",
            uan: "",
        },
    ]);

    const [billingAddress, setBillingAddress] = useState({
        line1: "",
        line2: "",
        city: "",
        state: "",
        pin: "",
        country: "",
    });

    const [shippingAddress, setShippingAddress] = useState({
        line1: "",
        line2: "",
        city: "",
        state: "",
        pin: "",
        country: "",
    });

    const [shippingSameAsBilling, setShippingSameAsBilling] = useState(false);


    return (
        <div className="py-5 flex flex-col items-center text-[#004D61] relative overflow-auto">
            {/* Header */}
            <div className='text-[#1A3B5D] text-[20px] text-left flex justify-start font-semibold'>
                <span>New Vendor</span>
            </div>
            <div className="w-full overflow-auto my-3 backdrop-blur-2xl border border-[#004D61]/20 rounded-md mt-5 p-5  transition-all duration-500">

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <span className='input__label font-semibold mb-2 block'>Vendor Name</span>
                        <input className='popup__input px-4' placeholder='Enter Vendor Name' name='firstName' />
                    </div>
                    <div>
                        <span className='input__label font-semibold mb-2 block'> Company Name</span>
                        <input className='popup__input px-4' placeholder='Enter Company Name' name='firstName' />
                    </div>
                    <div>
                        <span className='input__label font-semibold mb-2 block'> Email</span>
                        <input className='popup__input px-4' placeholder='Enter Email' name='firstName' />
                    </div>
                    <div>
                        <span className='input__label font-semibold mb-2 block'>Vendor Number</span>
                        <input className='popup__input px-4' placeholder='Enter Vendor Number' value="VEN-00016" name='firstName' />
                    </div>
                    <div>
                        <span className='input__label font-semibold mb-2 block'>Phone Number</span>
                        <input className='popup__input px-4' placeholder='Enter Phone Number' name='firstName' />
                    </div>
                    <div>
                        <span className='input__label font-semibold mb-2 block'>Mobile Number</span>
                        <input className='popup__input px-4' placeholder='Enter Mobile Number' name='firstName' />
                    </div>

                </div>
            </div>
            {/* Tabs */}
            <div className="w-full bg-[#004D61]/10 backdrop-blur-xl rounded-md shadow-md border border-[#DADADA] px-4 py-3 flex justify-between overflow-x-auto hide-scrollbar">
                {["info", "bank", "address", "documents", "settings"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}


                        className={`relative px-6 py-3 text-base font-medium transition-all duration-300 rounded-xl whitespace-nowrap
                ${activeTab === tab
                                ? " text-[#004D61]"
                                : "text-[#004D61]/70 hover:text-[#004D61]"}
              `}
                    >
                        {tab === "info"
                            ? "Other Details"
                            : tab === "bank"
                                ? "Bank Details"
                                : tab === "address"
                                    ? "Address"
                                    : tab === "documents"
                                        ? "Documents"
                                        : "Settings"}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[3px] border-2 border-b-[#004D61] rounded-md" />
                        )}
                    </button>
                ))}
            </div>
            <div className="w-full h-[calc(100vh-220px)] overflow-auto backdrop-blur-2xl border border-[#004D61]/20 rounded-md mt-5 p-5  transition-all duration-500">
                {/* Tab Content */}
                {activeTab === "info" && (

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <span className='input__label font-semibold mb-2 block'>GST Treatment</span>
                            <Select
                                className="select__option"
                                options={[
                                    { value: "regesteredbusiness", label: "Regestered Business" },
                                    { value: "unregesteredbusiness", label: "Unregestered Business" },
                                ]}
                                placeholder="Select a GST Treatment"
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
                            />
                        </div>

                        <div>
                            <span className='input__label font-semibold mb-2 block'>Source of Supply</span>
                            <Select
                                className="select__option"
                                options={[
                                    { value: "regesteredbusiness", label: "Chennai" },
                                    { value: "unregesteredbusiness", label: "Mumbai" },
                                ]}
                                placeholder="Select a Source of Supply"
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
                            />
                        </div>
                        <div>
                            <span className='input__label font-semibold mb-2 block'>PAN Number</span>
                            <input className='popup__input px-4' placeholder='Enter PAN Number' name='firstName' />
                        </div>
                        <div>
                            <span className='input__label font-semibold mb-2 block'>GST TDS</span>
                            <div className="flex gap-3 items-center"><input type="checkbox" className='popup__input' /> <span className="text-gray-800 text-sm font-semibold">Apply GST TDS for this Vendor</span></div>
                        </div>
                        <div>
                            <span className='input__label font-semibold mb-2 block'>Currency</span>
                            <input className='popup__input px-4' value="INR (Indian Rubees)" placeholder='Enter Currency' name='firstName' />
                        </div>

                         <div>
                            <span className='input__label font-semibold mb-2 block'>Opening Balance</span>
                             <div className="flex items-center gap-3">
                                <Select
                                className="select__option"
                                options={[
                                    { value: "regesteredbusiness", label: "Chennai" },
                                    { value: "unregesteredbusiness", label: "Mumbai" },
                                ]}
                                placeholder=" Location"
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
                            /><input className='popup__input px-4' placeholder='Enter Amount' name='firstName' />
                             </div>
                        </div>

                        <div>
                            <span className='input__label font-semibold mb-2 block'> Website URL</span>
                            <input className='popup__input px-4' placeholder='Enter Website URL' name='firstName' />
                        </div>

                        <div>
                            <span className='input__label font-semibold mb-2 block'>Designation</span>
                            <input className='popup__input px-4' placeholder='Enter Designation' name='firstName' />
                        </div>

                        <div>
                            <span className='input__label font-semibold mb-2 block'>Department</span>
                            <input className='popup__input px-4' placeholder='Enter Department' name='firstName' />
                        </div>

                        <div>
                            <span className='input__label font-semibold mb-2 block'> Twitter</span>
                            <input className='popup__input px-4' placeholder='Enter Twitter' name='firstName' />
                        </div>
                    </div>

                )}

                {activeTab === "address" && (
                    <div className=" gap-6">
                        <div className=" flex gap-x-10">

                            {/* Billing Address */}
                            <div className="w-1/2">
                                <h3 className="text-lg font-extrabold text-[#004D61] mb-5">
                                    Billing Address
                                </h3>
                                <div className="grid gap-3">
                                    <div>
                                        <label className="input__label mb-1 font-semibold block">
                                            Address Line 1
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Address Line 1"
                                            className="popup__input px-4"
                                            value={billingAddress.line1}
                                            onChange={(e) =>
                                                setBillingAddress({ ...billingAddress, line1: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="input__label mb-1 font-semibold block">
                                            Address Line 2
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Address Line 2"
                                            className="popup__input px-4"
                                            value={billingAddress.line2}
                                            onChange={(e) =>
                                                setBillingAddress({ ...billingAddress, line2: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="input__label mb-1 font-semibold block">City</label>
                                        <input
                                            type="text"
                                            placeholder="Enter City"
                                            className="popup__input px-4"
                                            value={billingAddress.city}
                                            onChange={(e) =>
                                                setBillingAddress({ ...billingAddress, city: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="input__label mb-1 font-semibold block">State</label>
                                        <input
                                            type="text"
                                            placeholder="Enter State"
                                            className="popup__input px-4"
                                            value={billingAddress.state}
                                            onChange={(e) =>
                                                setBillingAddress({ ...billingAddress, state: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="input__label mb-1 font-semibold block">PIN Code</label>
                                        <input
                                            type="text"
                                            placeholder="Enter PIN Code"
                                            className="popup__input px-4"
                                            value={billingAddress.pin}
                                            onChange={(e) =>
                                                setBillingAddress({ ...billingAddress, pin: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="input__label mb-1 font-semibold block">Country</label>
                                        <input
                                            type="text"
                                            placeholder="Enter Country"
                                            className="popup__input px-4"
                                            value={billingAddress.country}
                                            onChange={(e) =>
                                                setBillingAddress({ ...billingAddress, country: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>


                            {/* Shipping Address */}
                            <div className="w-1/2">
                                <div className="flex justify-between items-center mb-5">
                                    <h3 className="text-lg font-extrabold text-[#004D61]">
                                        Shipping Address
                                    </h3>
                                    <button
                                        onClick={() => {
                                            if (!shippingSameAsBilling) {
                                                setShippingAddress({ ...billingAddress });
                                                setShippingSameAsBilling(true);
                                            } else {
                                                setShippingSameAsBilling(false);
                                            }
                                        }}
                                        className="border border-[#004D61] text-[#004D61] text-sm font-medium px-4 py-1.5 rounded-md hover:bg-[#004D61] hover:text-white transition-all duration-300"
                                    >
                                        {shippingSameAsBilling
                                            ? "Change Shipping Address"
                                            : "Same as Billing Address"}
                                    </button>
                                </div>

                                <div className="grid gap-3">
                                    <div>
                                        <label className="input__label mb-1 font-semibold block">
                                            Address Line 1
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Address Line 1"
                                            className="popup__input px-4"
                                            value={
                                                shippingSameAsBilling ? billingAddress.line1 : shippingAddress.line1
                                            }
                                            onChange={(e) => {
                                                const updated = { ...shippingAddress, line1: e.target.value };
                                                setShippingAddress(updated);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label className="input__label mb-1 font-semibold block">
                                            Address Line 2
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Address Line 2"
                                            className="popup__input px-4"
                                            value={
                                                shippingSameAsBilling ? billingAddress.line2 : shippingAddress.line2
                                            }
                                            onChange={(e) => {
                                                const updated = { ...shippingAddress, line2: e.target.value };
                                                setShippingAddress(updated);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label className="input__label mb-1 font-semibold block">City</label>
                                        <input
                                            type="text"
                                            placeholder="Enter City"
                                            className="popup__input px-4"
                                            value={
                                                shippingSameAsBilling ? billingAddress.city : shippingAddress.city
                                            }
                                            onChange={(e) => {
                                                const updated = { ...shippingAddress, city: e.target.value };
                                                setShippingAddress(updated);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label className="input__label mb-1 font-semibold block">State</label>
                                        <input
                                            type="text"
                                            placeholder="Enter State"
                                            className="popup__input px-4"
                                            value={
                                                shippingSameAsBilling ? billingAddress.state : shippingAddress.state
                                            }
                                            onChange={(e) => {
                                                const updated = { ...shippingAddress, state: e.target.value };
                                                setShippingAddress(updated);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label className="input__label mb-1 font-semibold block">PIN Code</label>
                                        <input
                                            type="text"
                                            placeholder="Enter PIN Code"
                                            className="popup__input px-4"
                                            value={
                                                shippingSameAsBilling ? billingAddress.pin : shippingAddress.pin
                                            }
                                            onChange={(e) => {
                                                const updated = { ...shippingAddress, pin: e.target.value };
                                                setShippingAddress(updated);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label className="input__label mb-1 font-semibold block">Country</label>
                                        <input
                                            type="text"
                                            placeholder="Enter Country"
                                            className="popup__input px-4"
                                            value={
                                                shippingSameAsBilling
                                                    ? billingAddress.country
                                                    : shippingAddress.country
                                            }
                                            onChange={(e) => {
                                                const updated = { ...shippingAddress, country: e.target.value };
                                                setShippingAddress(updated);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )}

                {activeTab === "bank" && (
                    <div className="space-y-6">
                        {/* Header + Add Button */}
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-[#004D61]">Bank Details</h3>
                            <button
                                onClick={() =>
                                    setBankAccounts([
                                        ...bankAccounts,
                                        {
                                            id: Date.now(),
                                            holder: "",
                                            number: "",
                                            ifsc: "",
                                            bank: "",
                                            branch: "",
                                            uan: "",
                                        },
                                    ])
                                }
                                className="bg-[#004D61] text-white px-4 py-2 rounded-lg hover:bg-[#006b82] transition"
                            >
                                + Add Account
                            </button>
                        </div>

                        {/* Accounts List */}
                        <div className="space-y-8">
                            {bankAccounts.map((account, index) => (
                                <div
                                    key={account.id}
                                    className="border border-gray-300 rounded-xl p-6 bg-gray-50 relative shadow-sm hover:shadow-md transition"
                                >
                                    {/* Delete Button */}
                                    <button
                                        onClick={() =>
                                            setBankAccounts(bankAccounts.filter((a) => a.id !== account.id))
                                        }
                                        className="absolute top-3 right-3 text-red-500 hover:text-red-700 font-semibold text-sm"
                                    >
                                        ✕ Delete
                                    </button>

                                    <h4 className="font-bold text-[#004D61] mb-4">
                                        Account {index + 1}
                                    </h4>

                                    <div className="grid grid-cols-3 gap-6">
                                        <div>
                                            <span className="input__label font-semibold mb-2 block">
                                                Account Holder Name
                                            </span>
                                            <input
                                                className="popup__input px-4"
                                                placeholder="Enter Account Holder Name"
                                                value={account.holder}
                                                onChange={(e) => {
                                                    const updated = [...bankAccounts];
                                                    updated[index].holder = e.target.value;
                                                    setBankAccounts(updated);
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <span className="input__label font-semibold mb-2 block">
                                                Account Number
                                            </span>
                                            <input
                                                className="popup__input px-4"
                                                placeholder="Enter Account Number"
                                                value={account.number}
                                                onChange={(e) => {
                                                    const updated = [...bankAccounts];
                                                    updated[index].number = e.target.value;
                                                    setBankAccounts(updated);
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <span className="input__label font-semibold mb-2 block">
                                                IFSC Code
                                            </span>
                                            <input
                                                className="popup__input px-4"
                                                placeholder="Enter IFSC Code"
                                                value={account.ifsc}
                                                onChange={(e) => {
                                                    const updated = [...bankAccounts];
                                                    updated[index].ifsc = e.target.value;
                                                    setBankAccounts(updated);
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <span className="input__label font-semibold mb-2 block">
                                                Bank Name
                                            </span>
                                            <input
                                                className="popup__input px-4"
                                                placeholder="Enter Bank Name"
                                                value={account.bank}
                                                onChange={(e) => {
                                                    const updated = [...bankAccounts];
                                                    updated[index].bank = e.target.value;
                                                    setBankAccounts(updated);
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <span className="input__label font-semibold mb-2 block">
                                                Branch Name
                                            </span>
                                            <input
                                                className="popup__input px-4"
                                                placeholder="Enter Branch Name"
                                                value={account.branch}
                                                onChange={(e) => {
                                                    const updated = [...bankAccounts];
                                                    updated[index].branch = e.target.value;
                                                    setBankAccounts(updated);
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <span className="input__label font-semibold mb-2 block">
                                                UAN Number
                                            </span>
                                            <input
                                                className="popup__input px-4"
                                                placeholder="Enter UAN Number"
                                                value={account.uan}
                                                onChange={(e) => {
                                                    const updated = [...bankAccounts];
                                                    updated[index].uan = e.target.value;
                                                    setBankAccounts(updated);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "documents" && (
                    <div className="grid grid-cols-3 gap-6">
                        <div className="flex flex-col">
                            <span className="input__label font-semibold mb-2 block">Aadhaar</span>
                            <input
                                className="popup__input px-4 border border-[#DADADA] rounded-md py-2 focus:outline-none"
                                placeholder="Enter Aadhaar Number"
                                name="aadhaarNumber"
                                type="text"
                            />
                            <input
                                type="file"
                                accept=".jpg,.jpeg,.png,.pdf"
                                className="mt-3 border border-[#DADADA] rounded-md py-2 px-3 text-gray-600 file:mr-3 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#004D61] file:text-white hover:file:bg-[#00A6A6] transition"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="input__label font-semibold mb-2 block">PAN</span>
                            <input
                                className="popup__input px-4 border border-[#DADADA] rounded-md py-2 focus:outline-none "
                                placeholder="Enter PAN Number"
                                name="panNumber"
                                type="text"
                            />
                            <input
                                type="file"
                                accept=".jpg,.jpeg,.png,.pdf"
                                className="mt-3 border border-[#DADADA] rounded-md py-2 px-3 text-gray-600 file:mr-3 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#004D61] file:text-white hover:file:bg-[#00A6A6] transition"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="input__label font-semibold mb-2 block">Degree Certificate</span>
                            <input
                                className="popup__input px-4 border border-[#DADADA] rounded-md py-2 focus:outline-none "
                                placeholder="Enter Degree Certificate Number"
                                name="aadhaarNumber"
                                type="text"
                            />
                            <input
                                type="file"
                                accept=".jpg,.jpeg,.png,.pdf"
                                className="mt-3 border border-[#DADADA] rounded-md py-2 px-3 text-gray-600 file:mr-3 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#004D61] file:text-white hover:file:bg-[#00A6A6] transition"
                            />
                        </div>
                    </div>
                )}

                {activeTab === "settings" && (
                    <div>
                        <h3 className="text-lg font-semibold text-[#004D61] mb-3">Vendor Verification</h3>
                        <button className="bg-[#004D61] text-white px-5 py-2 rounded-lg hover:bg-[#006b82]">
                            Verify Vendor
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VendorDetails;
