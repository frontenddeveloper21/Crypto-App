import React, { useState } from 'react';
import { GoDotFill } from 'react-icons/go'
import { Switch } from "antd";
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { IoCloseSharp } from 'react-icons/io5';
// Select library
import Select from 'react-select';
import "../Style/Style.css"

const User = () => {
    const [popup, setPopup] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        number: "",
        emailId: "",
    });
    const [formDataError, setFormDataError] = useState({});
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedReported, setSelectedReported] = useState("");
    const [selectedCompanyObjects, setSelectedCompanyObjects] = useState([]);
    const [userAddLoader, setUserAddLoader] = useState(false);
    const [editPopup, setEditPopup] = useState(false)

    // dummy lists
    const departmentList = [{ id: 1, dept_name: "HR" }, { id: 2, dept_name: "IT" }];
    const roleList = [{ id: 1, role_name: "Admin" }, { id: 2, role_name: "Manager" }];
    const reportedList = [{ hg_id: 1, first_name: "Siva", last_name: "R" }];
    const options = [{ value: 1, label: "Google" }, { value: 2, label: "Amazon" }];

    const handlePopup = () => setPopup(!popup);

    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCompanyChange = (selected) => {
        setSelectedCompanyObjects(selected);
    };

    const addUser = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData, selectedDepartment, selectedRole, selectedReported, selectedCompanyObjects);
        setPopup(false);
    };
    
    const handleEditPopup = () => {
        setEditPopup(!editPopup);
    }
    return (
        <div>
            <div className='flex justify-between items-center'>
                <span className='text-[#1A3B5D] text-[16px] font-semibold'>Users List</span>
                <div>
                    <button className="profile__btn mt-5" onClick={handlePopup}>Add Users</button>
                </div>
            </div>
            <div className='table__container mt-8'>
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Created At</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>85634</td>
                            <td>Santhosh</td>
                            <td>Chennai</td>
                            <td>02:13</td>
                            <td>Jul 12, 9:19 AM</td>
                            <td>
                                <div className='flex justify-center text-green-700 items-center gap-1'><GoDotFill className='text-green-700' /> Active</div>
                            </td>
                            <td>
                                <div>
                                    <Switch
                                        className="custom-switch"
                                        checked={true}
                                    />
                                </div>
                            </td>
                            <td className='flex items-center justify-center gap-3'>
                                <span className='AiFillEdit grid place-content-center' onClick={handleEditPopup}> <AiFillEdit /> </span>
                                
                                
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className={`user__popupContainer flex justify-center ${popup ? "open" : ""} `}>
                <div className='user__popup px-5 py-7'>
                    <div className='flex items-center'>
                        <span className='add__departName block' >Add New User</span>
                        <div className='close__container grid place-content-center ml-auto cursor-pointer' onClick={handlePopup}>
                            <span> <IoCloseSharp className='close__icon' /> </span>
                        </div>
                    </div>
                    <form className='grid grid-cols-2 gap-x-3 gap-y-5 mt-10' onSubmit={addUser} autoComplete='off'>
                        <div>
                            <span className='input__label mb-2 block'>First Name</span>
                            <input className='popup__input px-4' placeholder='Enter First Name' name='firstName' value={formData.firstName} onChange={handleInput} />
                            {formDataError.firstName && <span className='error__msg'> {formDataError.firstName} </span>}
                        </div>
                        <div>
                            <span className='input__label mb-2 block'>Last Name</span>
                            <input className='popup__input px-4' placeholder='Enter Last Name' name='lastName' value={formData.lastName} onChange={handleInput} />
                            {formDataError.lastName && <span className='error__msg'> {formDataError.lastName} </span>}
                        </div>
                        <div>
                            <span className='input__label mb-2 block'>Phone Number</span>
                            <input className='popup__input px-4' placeholder='Enter Phone Number' name='number' value={formData.number} onChange={handleInput} maxLength={10} />
                            {formDataError.number && <span className='error__msg'> {formDataError.number} </span>}
                        </div>
                        <div>
                            <span className='input__label mb-2 block'>Email </span>
                            <input className='popup__input px-4' placeholder='Enter Email ' name='emailId' value={formData.emailId} onChange={handleInput} />
                            {formDataError.emailId && <span className='error__msg'> {formDataError.emailId} </span>}
                        </div>
                        <div>
                            <span className='input__label mb-2 block'>Department List</span>
                            <Select
                                className="select__option"
                                options={departmentList.map((item) => ({
                                    value: item.id,
                                    label: item.dept_name,
                                }))}
                                placeholder="Select a Department"
                                value={departmentList
                                    .map((item) => ({
                                        value: item.id,
                                        label: item.dept_name,
                                    }))
                                    .find((opt) => opt.value === selectedDepartment) || null}
                                onChange={(selectedOption) => {
                                    const deptId = selectedOption?.value || "";
                                    setSelectedDepartment(deptId);
                                    if (deptId) fetchRole(deptId);
                                }}
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
                                isClearable
                            />
                            {formDataError.depart && <span className="error__msg">{formDataError.depart}</span>} {/* ✅ Correct error display */}
                        </div>
                        <div>
                            <span className='input__label mb-2 block'>Role List</span>
                            <Select
                                className="select__option"
                                options={roleList.map((item) => ({
                                    value: item.id,
                                    label: item.role_name,
                                }))}
                                placeholder="Select a Role"
                                value={roleList
                                    .map((item) => ({
                                        value: item.id,
                                        label: item.role_name,
                                    }))
                                    .find((opt) => opt.value === selectedRole) || null}
                                onChange={(selectedOption) => {
                                    const roleVal = selectedOption?.value || "";
                                    setSelectedRole(roleVal);
                                    if (roleVal) fetchReportedBy(selectedDepartment, selectedOption?.label);
                                }}
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
                                isClearable
                            />
                            {formDataError.role && <span className="error__msg">{formDataError.role}</span>} {/* ✅ Correct error display */}
                        </div>
                        <div>
                            <span className='input__label mb-2 block'>Reported By</span>
                            <Select
                                className="select__option"
                                options={reportedList?.map((item) => ({
                                    value: item?.hg_id,
                                    label: `${item.first_name} ${item?.last_name || ""}`,
                                }))}
                                placeholder="Select a Reporting Manager"
                                value={reportedList
                                    ?.map((item) => ({
                                        value: item?.hg_id,
                                        label: `${item.first_name} ${item?.last_name || ""}`,
                                    }))
                                    .find((opt) => opt.value === selectedReported) || null}
                                onChange={(selectedOption) => setSelectedReported(selectedOption?.value || "")}
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
                                isClearable
                            />

                            {formDataError.reported && <span className="error__msg">{formDataError.reported}</span>}
                        </div>
                        {/* <div>
                            <span className='input__label mb-2 block'>Company List</span>
                            <MultiSelect
                                options={options}
                                className="select__option"
                                placeholder="Select Company"
                                value={selectedCompanyObjects}
                                onChange={handleCompanyChange}
                                labelledBy="Select Company"
                                overrideStrings={{
                                    selectSomeItems: "Select Company",
                                    allItemsAreSelected: "All Companies Selected",
                                    search: "Search Companies...",
                                }}
                                styles={{
                                    searchBox: (base) => ({
                                        ...base,
                                        "::placeholder": {
                                            color: "black",   // placeholder text color
                                            opacity: 1,       // ensure it's not faded
                                        },
                                    }),
                                }}
                            />
                            {formDataError.company && <span className="error__msg">{formDataError.company}</span>}
                        </div> */}
                        <div className='grid place-content-center col-span-2'>
                            {userAddLoader ? <button className='grid place-content-center popup__btn'> <ResLoader /> </button> :
                                <button className='profile__btn w-[180px]' type='submit'>Submit</button>}
                        </div>
                    </form>
                </div>
            </div>

             {/* Update Popup Section */}

            <div className={`user__popupContainer flex justify-center ${editPopup ? "open" : ""} `}>
                <div className='user__popup px-5 py-7'>
                    <div className='flex items-center'>
                        <span className='add__departName block'>Update User</span>
                        <div className='close__container grid place-content-center ml-auto cursor-pointer' onClick={handleEditPopup}>
                            <span> <IoCloseSharp className='close__icon' /> </span>
                        </div>
                    </div>
                    <form className='grid grid-cols-2 gap-x-3 gap-y-5 mt-10' autoComplete='off'>
                        <div>
                            <span className='input__label mb-2 block'>First Name</span>
                            <input className='popup__input px-4' placeholder='Enter First Name' name='firstName' />
                            {/* {formDataUpdateError.firstName && <span className='error__msg'> {formDataUpdateError.firstName} </span>} */}
                        </div>
                        <div>
                            <span className='input__label mb-2 block'>Last Name</span>
                            <input className='popup__input px-4' placeholder='Enter Last Name' name='lastName'  />
                            {/* {formDataUpdateError.lastName && <span className='error__msg'> {formDataUpdateError.lastName} </span>} */}
                        </div>
                        <div>
                            <span className='input__label mb-2 block'>Phone Number</span>
                            <input className='popup__input px-4' placeholder='Enter Phone Number' disabled name='number'  maxLength={10} />
                            {/* {formDataUpdateError.number && <span className='error__msg'> {formDataUpdateError.number} </span>} */}
                        </div>
                        <div>
                            <span className='input__label mb-2 block'>Email Address</span>
                            <input className='popup__input px-4' placeholder='Enter Email Address' disabled name='emailId'  />
                            {/* {formDataUpdateError.emailId && <span className='error__msg'> {formDataUpdateError.emailId} </span>} */}
                        </div>
                        <div>
                            <span className='input__label mb-2 block'>Department List</span>
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
                                // options={departmentList.map((item) => ({
                                //     value: item.id,
                                //     label: item.dept_name,
                                // }))}
                                placeholder="Select a Department"
                                // onChange={(selectedOption) => {
                                //     setSelectedDepartment(selectedOption?.value);
                                //     setFormDataUpdate((prev) => ({
                                //         ...prev,
                                //         depart: selectedOption?.label,
                                //     }));
                                // }}
                                // value={departmentList
                                //     .map((item) => ({
                                //         value: item.id,
                                //         label: item.dept_name,
                                //     }))
                                //     .find((option) => option.label === formDataUpdate.depart)}
                            />
                            {/* {formDataUpdateError.depart && <span className="error__msg">{formDataUpdateError.depart}</span>} */}
                        </div>
                        <div>
                            <span className='input__label mb-2 block'>Role List</span>
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
                                // options={roleList.map((item) => ({
                                //     value: item.id,
                                //     label: item.role_name,
                                // }))}
                                placeholder="Select a Role"
                                // onChange={(selectedOption) => {
                                //     setSelectedRole(selectedOption?.value);
                                //     setFormDataUpdate((prev) => ({
                                //         ...prev,
                                //         role: selectedOption?.label,
                                //     }));
                                // }}
                                // value={roleList
                                //     .map((item) => ({
                                //         value: item.id,
                                //         label: item.role_name,
                                //     }))
                                //     .find((option) => option.label === formDataUpdate.role)}
                            />
                            {/* {formDataUpdateError.role && <span className="error__msg">{formDataUpdateError.role}</span>} */}
                        </div>
                        {/* <div>
                            <span className='input__label mb-2 block'>Company List</span>
                            <MultiSelect
                                options={optionsUpdate}
                                className="select__option"
                                placeholder="Select Company"
                                value={selectedCompaniesUpdate}
                                onChange={setSelectedCompaniesUpdate}
                                labelledBy="Select Company"
                                overrideStrings={{
                                    selectSomeItems: "Select Company",
                                    allItemsAreSelected: "All Companies Selected",
                                    search: "Search Companies...",
                                }}
                                styles={{
                                    searchBox: (base) => ({
                                        ...base,
                                        "::placeholder": {
                                            color: "black",
                                        },
                                    }),
                                }}
                            />
                            {formDataUpdateError.company && (<span className="error__msg">{formDataUpdateError.company}</span>)}
                        </div> */}
                        <div className='grid place-content-center pt-5 pb-3 col-span-2'>
                            {/* {updateLoader ? <button className='popup__btn grid place-content-center'> <ResLoader /> </button> :
                                <button className='popup__btn' type='submit'>Submit</button>} */}
                                <button className='profile__btn w-[200px]' type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default User