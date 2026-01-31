import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaCheckCircle, FaDotCircle, FaPauseCircle, FaTimesCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Select from "react-select";

// Sample data for each category
const CustomerDetailsData = {
    assigned: [
        { id: 1, username: "John Doe", lastUpdated: "25/09/2025", email: "frontenddeveloper@gmail.com", phone: "6382354012", status: "Assigned", manager: "manager" },
        { id: 2, username: "Alice Johnson", lastUpdated: "23/09/2025", email: "frontenddeveloper@gmail.com", phone: "6382354012", status: "Assigned", manager: "manager" },
    ],
    unassigned: [
        { id: 3, username: "Bob Smith", lastUpdated: "24/09/2025", email: "frontenddeveloper@gmail.com", phone: "6382354012", status: "Unassigned", manager: "manager" },
    ],
    activated: [
        { id: 4, username: "Charlie Brown", lastUpdated: "22/09/2025", email: "frontenddeveloper@gmail.com", phone: "6382354012", status: "Activated", manager: "manager" },
    ],
    pending: [
        { id: 5, username: "Diana Prince", lastUpdated: "21/09/2025", email: "frontenddeveloper@gmail.com", phone: "6382354012", status: "Pending", manager: "manager" },
    ],
    submitted: [
        { id: 6, username: "Eve Adams", lastUpdated: "20/09/2025", email: "frontenddeveloper@gmail.com", phone: "6382354012", status: "Submitted", manager: "manager" },
    ],
    rejected: [
        { id: 6, username: "Eve Adams", lastUpdated: "20/09/2025", email: "frontenddeveloper@gmail.com", phone: "6382354012", status: "Rejected", manager: "manager" },
    ],
};

const statusColors = {
    Assigned: "text-blue-800",
    Unassigned: "text-gray-700",
    Activated: "text-green-800",
    Pending: "text-yellow-700",
    Submitted: "text-purple-800",
    Rejected: "text-red-800",
};

const options = [
    { value: "assigned", label: "Assigned" },
    { value: "unassigned", label: "Unassigned" },
    { value: "activated", label: "Activated" },
    { value: "pending", label: "Pending" },
    { value: "submitted", label: "Submitted" },
    { value: "rejected", label: "Rejected" },
];

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? "#1A3B5D"       // ✅ Active option
            : state.isFocused
                ? "#D2E9EA"       // ✅ Hover background
                : "#fff",         // Default background
        color: state.isSelected ? "#fff" : "#000", // White text for active
        padding: 10,
    }),
    control: (provided) => ({
        ...provided,
        borderColor: "#afadad",
        boxShadow: "none",
        "&:hover": { borderColor: "#afadad" },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "#1A3B5D",
    }),
};

const CustomerDetails = () => {
    const storedCategory = localStorage.getItem("selectedCategory") || "assigned";
    const [search, setSearch] = useState("");
    const [selectedOption, setSelectedOption] = useState(
        options.find((opt) => opt.value === storedCategory)
    );

    useEffect(() => {
        if (selectedOption) {
            localStorage.setItem("selectedCategory", selectedOption.value);
        }
    }, [selectedOption]);

    return (
        <div className="">
            <h2 className="text-[#1A3B5D] text-[16px] font-semibold mb-4">
                Customer Details
            </h2>

            <div className="flex justify-between">
                <div className="w-[250px]">
                    <Select
                        className="text-sm cursor-pointer"
                        value={selectedOption}
                        onChange={setSelectedOption}
                        options={options}
                        placeholder="Select Category"
                        isSearchable={false}
                        styles={customStyles}
                    />
                </div>

                <div className="search__container flex items-center px-4">
                    <input
                        type="text"
                        placeholder="Search Business Name / Wallet Address"
                        className="border rounded py-1"
                    />
                    {search && (
                        <button
                            className="text-white hover:text-gray-300 focus:outline-none"
                        >
                            <AiOutlineClose size={20} />
                        </button>
                    )}
                    <button
                        className="ml-2"
                    >
                        <FiSearch />
                    </button>
                </div>
            </div>

            <div className="table__container mt-5">
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Created At</th>
                            <th>Company Name</th>
                            <th>Email</th>
                            <th>Mobile Number</th>
                            <th>KYC Status</th>
                            <th>AC Manager</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedOption &&
                            CustomerDetailsData[selectedOption.value].map((user, index) => (
                                <tr
                                    key={user.id}
                                >
                                    <td>{index + 1}</td>
                                    <td>{user.lastUpdated}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user?.phone}</td>
                                    <td>
                                        <span
                                            className={`px-5 py-2 rounded-md text-sm font-semibold ${statusColors[user.status]}`}
                                        >
                                            <div className="flex items-center justify-center gap-1"><FaDotCircle />{user.status}</div>
                                        </span>
                                    </td>
                                    <td>
                                        <div className='grid justify-center gap-2'>
                                            <div className='w-[230px]'>
                                                <Select placeholder="Select a User" />
                                            </div>
                                            <div>
                                                <button className='bg-[#004D61] text-[#EAF6FB] text-sm py-1 px-3 rounded-sm'>Assign</button>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='flex items-center justify-center gap-2'>


                                            <span className='Faactivate grid place-content-center'> <FaCheckCircle /> </span>
                                            <span className='FaTimesCircle grid place-content-center'> <FaTimesCircle /> </span>
                                            <span className='FaCheckCircle grid place-content-center'> <FaPauseCircle /> </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomerDetails;
