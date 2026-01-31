import React, { useEffect, useRef, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import ButtonCoinLoader from "../../Auth/LoadingButton";
import { IoCloseSharp } from "react-icons/io5";

const VendorManagement = () => {
    const [vendors] = useState([
        { id: 1, name: "ABC Supplies", contact: "9876543210", email: "abc@vendor.com", status: "Active" },
        { id: 2, name: "XYZ Traders", contact: "9123456789", email: "xyz@vendor.com", status: "Inactive" },
    ]);

    const [openMenu, setOpenMenu] = useState(null);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const buttonRefs = useRef({});

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".vendor-menu")) {
                setOpenMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleMenuToggle = (id) => {
        if (openMenu === id) {
            setOpenMenu(null);
            return;
        }

        const rect = buttonRefs.current[id]?.getBoundingClientRect();
        if (rect) {
            setMenuPosition({
                top: rect.bottom + window.scrollY - 4, // place below button
                left: rect.right + window.scrollX - 400
                // align right side
            });
        }
        setOpenMenu(id);
    };

    const handleEdit = (vendor) => {
        alert(`Edit clicked for ${vendor.name}`);
        setOpenMenu(null);
    };

    const handlePayout = (vendor) => {
        alert(`Payout clicked for ${vendor.name}`);
        setOpenMenu(null);
    };

    const [popup, setPopup] = useState(false)

    const handlePopup = () => {
        setPopup(!popup);
    };
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        amount: "",
        remarks: "",
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!formData.amount) {
            newErrors.amount = "Amount is required";
        } else if (!/^\d+(\.\d{1,2})?$/.test(formData.amount)) {
            newErrors.amount = "Enter a valid number (max 2 decimals)";
        }

        if (!formData.remarks.trim()) newErrors.remarks = "Remarks are required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ✅ Handle change
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "amount") {
            // Allow only numbers and up to one dot with max 2 decimal digits
            const validPattern = /^\d*\.?\d{0,2}$/;

            if (value === "" || validPattern.test(value)) {
                setFormData({ ...formData, [name]: value });
                setErrors({ ...errors, [name]: "" });
            }
        } else {
            setFormData({ ...formData, [name]: value });
            setErrors({ ...errors, [name]: "" });
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoader(true);
        setTimeout(() => {
            alert("✅ Payout submitted successfully!");
            setLoader(false);
            handlePopup(); // close popup
            setFormData({ amount: "", remarks: "" }); // reset form
        }, 1000);
    };

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className='text-[#1A3B5D] text-[16px] font-semibold'>Vendor Management</h1>
                <button
                    onClick={() => navigate("/add-vendor")}
                    className="bg-[#004D61] text-sm text-white px-5 py-2 rounded-sm"
                >
                    + Add Vendor
                </button>
            </div>

            {/* Vendor Table */}
            <div className="table__container mt-5">
                <table>
                    <thead>
                        <tr>
                            <th>Vendor Name</th>
                            <th>Contact</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendors.map((v, index) => (
                            <tr key={v.id}>
                                <td>{index + 1}</td>
                                <td>{v.name}</td>
                                <td>VDN{v.id}</td>
                                <td>HaodaTech</td>
                                <td>{v.email}</td>
                                <td>{v.contact}</td>
                                <td>Kerala</td>
                                <td>
                                    <button className="h-[34px] w-[120px] text-center text-white bg-[#5E33CF]">
                                        Edit
                                    </button>
                                </td>

                               <td className="relative p-3">
                                    <button
                                        ref={(el) => (buttonRefs.current[v.id] = el)}
                                        onClick={() => handleMenuToggle(v.id)}
                                        className="bg-[#004D61] text-white px-2 py-0.5 rounded-md"
                                    >
                                        <HiDotsHorizontal />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>


                </table>
            </div>
            {openMenu && (
                <div
                    className="vendor-menu absolute bg-white border border-gray-200 rounded-md shadow-lg w-32 z-[9999]"
                    style={{ top: menuPosition.top, left: menuPosition.left }}
                >
                    <button
                        onClick={() => handleEdit(vendors.find((v) => v.id === openMenu))}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                        Edit
                    </button>
                    <button
                        // onClick={() => handlePayout(vendors.find((v) => v.id === openMenu))}
                        onClick={handlePopup}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                        Payout
                    </button>
                </div>
            )}

            <div className={`popup__container ${popup ? "open" : ""} flex justify-center`}>
                <div className='popup__content h-fit w-3/5 lg:w-1/3 px-5 py-7'>
                    <div className='flex items-center'>
                        <span className='add__departName font-semibold block'>Payout</span>
                        <div className='close__container grid place-content-center ml-auto cursor-pointer' onClick={handlePopup}>
                            <span> <IoCloseSharp className='close__icon' /> </span>
                        </div>
                    </div>
                    <form className='mt-10' onSubmit={handleSubmit}>
                        <div>
                            <span className='block mb-2 text-sm font-semibold '>Amount</span>
                            <input
                                type="text"
                                placeholder="Enter Amount"
                                className="popup__input px-4"
                                value={formData.amount}
                                name="amount"
                                onChange={handleChange}
                            />
                            {errors.amount && (
                                <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
                            )}
                        </div>
                        <div className="pt-4">
                            <span className='block mb-2 text-sm font-semibold '>Remarks</span>
                            <textarea className="w-full border text-sm py-2 font-semibold outline-none rounded-sm border-gray-300 px-4 h-[100px]" value={formData.remarks}
                                onChange={handleChange} name="remarks" placeholder="Enter Remarks" />
                            {errors.remarks && (
                                <p className="text-red-500 text-xs mt-1">{errors.remarks}</p>
                            )}
                        </div>
                        <div className='mt-10 grid place-content-center'>
                            {loader ? <button className='profile__btn w-[180px] grid place-content-center'> <ButtonCoinLoader /> </button> :
                                <button className='profile__btn w-[180px] cursor-pointer' type='submit'>Submit</button>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VendorManagement;
