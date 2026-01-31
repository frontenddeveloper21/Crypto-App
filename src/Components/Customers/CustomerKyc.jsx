
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaCheckCircle, FaDotCircle, FaPauseCircle, FaTimesCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { IoCloseSharp } from "react-icons/io5";
import { PiUploadSimpleBold } from "react-icons/pi";
import ReactPaginate from "react-paginate";
import Select from "react-select";

// Sample data for each category
const CustomerKycData = {
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
            ? "#1A3B5D"
            : state.isFocused
                ? "#D2E9EA"
                : "#fff",
        color: state.isSelected ? "#fff" : "#000",
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

const CustomerKyc = () => {
    const storedCategory = localStorage.getItem("selectedCategory") || "assigned";
    const [search, setSearch] = useState("");
    const [popup, setPopup] = useState(false);
    const handlePopup = () => setPopup(!popup);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedOption, setSelectedOption] = useState(
        options.find((opt) => opt.value === storedCategory)
    );

    useEffect(() => {
        if (selectedOption) {
            localStorage.setItem("selectedCategory", selectedOption.value);
            setCurrentPage(0); // reset page when category changes
        }
    }, [selectedOption]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            alert(`File "${selectedFile.name}" uploaded successfully!`);
        } else {
            alert("Please upload a PDF file only.");
            e.target.value = null;
        }
    };

    const itemsPerPage = 5;

    // Current category's data
    const data = selectedOption ? CustomerKycData[selectedOption.value] : [];
    const pageCount = Math.ceil(data.length / itemsPerPage);

    const handlePageClick = (selected) => {
        setCurrentPage(selected.selected);
    };

    const currentData = data.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    return (
        <div>
            <h2 className="text-[#1A3B5D] text-[16px] font-semibold mb-4">
                KYC Dashboard
            </h2>

            {/* Category & Search */}
            <div className="flex justify-between mb-4">
                <div className="w-[250px]">
                    <Select
                        value={selectedOption}
                        onChange={setSelectedOption}
                        options={options}
                        placeholder="Select Category"
                        isSearchable={false}
                        styles={customStyles}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <div className="search__container flex items-center px-4 border rounded">
                        <input
                            type="text"
                            placeholder="Search Business Name / Wallet Address"
                            className="py-1 outline-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {search && (
                            <button onClick={() => setSearch("")}>
                                <AiOutlineClose size={20} />
                            </button>
                        )}
                        <FiSearch className="ml-2" />
                    </div>
                    <button
                        onClick={handlePopup}
                        className="text-sm bg-[#004D61] text-white px-4 py-2 rounded-md hover:bg-[#16314a] transition"
                    >
                        Upload KYC
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="table__container overflow-auto">
                <table className="min-w-full">
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
                        {currentData.map((user, index) => (
                            <tr key={user.id}>
                                <td>{currentPage * itemsPerPage + index + 1}</td>
                                <td>{user.lastUpdated}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <span
                                        className={`px-5 py-2 rounded-md text-sm font-semibold ${statusColors[user.status]}`}
                                    >
                                        <div className="flex items-center justify-center gap-1">
                                            <FaDotCircle />
                                            {user.status}
                                        </div>
                                    </span>
                                </td>
                                <td>{user.manager}</td>
                                <td>
                                    <div className="flex items-center justify-center gap-2">
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

            {/* Pagination */}
            <div className="flex justify-center items-center mt-4">
                <ReactPaginate
                    previousLabel={<GrFormPrevious />}
                    nextLabel={<GrFormNext />}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    breakLabel={"..."}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    containerClassName={"flex gap-2 items-center"}
                    pageClassName={
                        "px-3 py-1 border rounded cursor-pointer hover:bg-gray-100 transition"
                    }
                    activeClassName={
                        "bg-[#004D61] text-white font-semibold rounded-md"
                    }
                    previousClassName={
                        "text-[#004D61] rounded cursor-pointer hover:bg-gray-100 transition"
                    }
                    nextClassName={
                        "text-[#004D61] rounded cursor-pointer hover:bg-gray-100 transition"
                    }
                    disabledClassName={"opacity-50 cursor-not-allowed"}
                />
            </div>

            {/* Upload Popup */}
            <div className={`user__popupContainer flex justify-center ${popup ? "open" : ""} `}>
                <div className="user__popup px-5 py-7 bg-white rounded-md w-[500px]">
                    <div className="flex items-center justify-between mb-5">
                        <span className="text-[#004D61] font-semibold">Upload KYC</span>
                        <div className='close__container grid place-content-center ml-auto cursor-pointer' onClick={handlePopup}>
                            <span> <IoCloseSharp className='close__icon' /> </span>
                        </div>
                    </div>
                    <label className="h-[200px] w-full text-center border border-dashed border-[#004D61] flex flex-col justify-center items-center rounded-md cursor-pointer">
                        Upload KYC
                        <PiUploadSimpleBold className="mt-2" size={24} />
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>
                </div>
            </div>

        </div>
    );
};


export default CustomerKyc;
