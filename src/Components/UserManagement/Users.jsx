import React, { useEffect, useState } from 'react';
import { GoDotFill } from 'react-icons/go'
import { Switch } from "antd";
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { IoCloseSharp } from 'react-icons/io5';
// Select library
import Select from 'react-select';

// React Multi Select Component library
import { MultiSelect } from "react-multi-select-component";

import "../Style/Style.css"
import { useDispatch, useSelector } from 'react-redux';
import { useCreateUserMutation, useFetchDepartMutation, useGetReportByMutation, useUpdateUserMutation } from '../../service/userManagementApi';
import { decrypt, encyrpt } from '../../utilites/crypto';
import { setLoginData } from '../Features/LoginData';
import { setDepartmentData, setReportByList, setRoleList, setUserList } from '../Features/UserManagement';

import { ToastError, ToastSuccess } from '../../utilites/toast'
import ResLoader from '../loader/resLoader';
import { ErrorHandle } from '../../utilites/errorHandle';
import { useNavigate, useParams } from 'react-router-dom';
import store from '../Store/store'
import ButtonCoinLoader from '../../Auth/LoadingButton';
import ReactPaginate from 'react-paginate';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

const Users = () => {

    const dispatch = useDispatch()
    const { url } = useParams()
    const navigate = useNavigate()
    const [fetchData] = useFetchDepartMutation()
    const [popup, setPopup] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const getRoleList = useSelector((state) => state?.userManagement?.roleList)
    const departmentList = useSelector((state) => state?.userManagement?.departmentList)
    const userList = useSelector((state) => state?.userManagement?.userList)

    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedReported, setSelectedReported] = useState("");
    const [selectedCompanyObjects, setSelectedCompanyObjects] = useState([]);
    const [userAddLoader, setUserAddLoader] = useState(false);
    const [editPopup, setEditPopup] = useState(false)

    // dummy lists
    const roleList = useSelector((state) => state?.userManagement?.roleList)
    const reportedListData = useSelector(
        (state) => state?.userManagement?.reportByList
    );
    const reportedList = reportedListData?.role_reported_by?.map((id, index) => ({
        id: Number(id),
        first_name: reportedListData.usernames[index],
    }));

    console.log("reportedList", reportedList);
    // const reportedList = [{id: 1, first_name: "Siva" }];
    const options = [{ value: 1, label: "Google" }, { value: 2, label: "Amazon" }];

    const [getReportBy] = useGetReportByMutation()
    const [getRole] = useFetchDepartMutation()
    const [createUser] = useCreateUserMutation()
    const [updateUser] = useUpdateUserMutation()


    const handlePopup = () => {
        // Reset all form error messages
        setFormDataError({
            firstName: "",
            lastName: "",
            phoneNumber: "",
            emailId: "",
            depart: "",
            role: "",
        });


        setFormData({
            firstName: "",
            lastName: "",
            phoneNumber: "",
            emailId: "",
            depart: "",
            role: ""
        })
        setPopup((prev) => !prev);
    };

    const handleCompanyChange = (selected) => {
        setSelectedCompanyObjects(selected);
    };


    // const handleEditPopup = () => {
    //     setEditPopup(!editPopup);
    // }

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        emailId: "",
        depart: "",
        role: ""
    })

    const [formDataError, setFormDataError] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        emailId: "",
        depart: "",
        role: ""
    })

    const handleInput = (e) => {
        const { name, value } = e.target

        const character = /^[a-zA-Z\s]*$/
        const number = /^(?!.*[<>;])[\d.]*$/
        const email = /^[^<>;]*$/

        const characterName = ["firstName", "lastName"]
        const numberName = ["number"]
        const emailName = ["email"]

        if (characterName.includes(name)) {
            if (character.test(value)) {
                const capitalValue = value.charAt(0).toUpperCase() + value.slice(1)
                setFormData({ ...formData, [name]: capitalValue })
                setFormDataError({ ...formDataError, [name]: "" })
            }
        } else if (numberName.includes(name)) {
            if (number.test(value)) {
                setFormData({ ...formData, [name]: value })
                setFormDataError({ ...formDataError, [name]: "" })
            }
        } else if (emailName.includes(name)) {
            if (email.test(value)) {
                setFormData({ ...formData, [name]: value })
                setFormDataError({ ...formDataError, [name]: "" })
            }
        } else {
            setFormData({ ...formData, [name]: value })
            setFormDataError({ ...formDataError, [name]: "" })
        }

    }

    const validateInput = () => {
        let valid = true
        const newError = {}

        if (!formData.firstName) {
            valid = false
            newError.firstName = "First Name is required"
        } else if (formData.firstName.length < 3) {
            valid = false
            newError.firstName = "Minimum Enter 3 letters are required"
        } else if (formData.firstName.length > 25) {
            valid = false
            newError.firstName = "Maximum Enter 25 letters are required"
        }

        if (!formData.lastName) {
            valid = false
            newError.lastName = "Last Name is required"
        } else if (formData.lastName.length < 1) {
            valid = false
            newError.lastName = "Minimum Enter 1 letters are required"
        } else if (formData.lastName.length > 25) {
            valid = false
            newError.lastName = "Maximum Enter 25 letters are required"
        }

        if (!formData.phoneNumber) {
            valid = false
            newError.phoneNumber = "Phone Number is required"
        } else if (formData.phoneNumber.length < 10) {
            valid = false
            newError.phoneNumber = "Minimum 10 numbers required"
        }

        if (!formData.emailId) {
            valid = false
            newError.emailId = "Email Address is required"
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.emailId)) {
            valid = false
            newError.emailId = "Invalid Email Address"
        }

        if (!selectedDepartment) {
            valid = false;
            newError.depart = "Please select a department";
        }

        if (!selectedRole) {
            valid = false;
            newError.role = "Please select a role";
        }

        setFormDataError(newError)
        return valid

    }

    const addUser = async (e) => {
        e.preventDefault()

        if (!validateInput()) return

        const data = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.emailId,
            mobile: formData.phoneNumber,
            dept_id: selectedDepartment,
            role_id: selectedRole,
            reported_by: String(selectedReported)
        }
        console.log(data);

        const payload = {
            data: encyrpt(JSON.stringify(data))
        }
        console.log(payload);

        setUserAddLoader(true)

        try {
            const res = await createUser(payload).unwrap()
            console.log(res);
            let decryptData = decrypt(res?.data)
            console.log(decryptData);
            const userData = JSON.parse(decryptData)
            console.log(userData);

            if (userData?.statuscode === 200) {
                ToastSuccess(userData?.message)
                setPopup(false)
                fetchUsers()
                setFormData({
                    firstName: "",
                    lastName: "",
                    phoneNumber: "",
                    emailId: "",
                    depart: "",
                    role: ""
                })
                setFormDataError({
                    firstName: "",
                    lastName: "",
                    phoneNumber: "",
                    emailId: "",
                    depart: "",
                    role: ""
                })
            }

        } catch (err) {
            console.log(err);

            const errors = err?.data?.errors;

            if (errors) {
                if (errors.email) ToastError(errors.email[0]);
                if (errors.first_name) ToastError(errors.first_name[0]);
                if (errors.last_name) ToastError(errors.last_name[0]);
                if (errors.mobile) ToastError(errors.mobile[0]);
            } else {
                ToastError(err?.data?.message || "Something went wrong");
            }
        }
        finally {
            setUserAddLoader(false)
        }
    }

    const fetchUsers = async () => {
        const data = {
            dbName: "cry_admin",
            tableName: "cry_admin_users",
            groupBy: "",
            selectFields: "",
            filters: {
                status: 1
            },
            perPage: 10,
            page: currentPage,
            orderBy: "created_at",
            orderDirection: "desc"
        }
        console.log(data);

        const payload = {
            data: encyrpt(JSON.stringify(data))
        }

        try {
            const res = await fetchData(payload).unwrap()
            let decryptData = decrypt(res?.data)
            const resultData = JSON.parse(decryptData)
            console.log(resultData);
            if (resultData?.statuscode === 200) {
                const currentToken = store.getState().login.loginData?.token

                const updatedLoginData = {
                    ...resultData,
                    token: resultData.refresh_token ? resultData.refresh_token : currentToken || resultData.token,
                }

                dispatch(setLoginData(updatedLoginData))
                dispatch(setUserList(resultData?.data))
            }
            if (resultData?.pagination) {
                setTotalPages(Math.ceil(resultData.pagination.totalPages / data.perPage));
            }

        } catch (err) {
            console.log(err);
            const statuscode = err?.status
            const message = err?.data?.message
            ErrorHandle(statuscode, message, navigate)
        } finally { }
    }

    const fetchDepts = async () => {
        const data = {
            dbName: "cry_admin",
            tableName: "cy_department",
            groupBy: "",
            selectFields: "",
            filters: {
                status: 1
            },
            perPage: 10,
            page: 1,
            orderBy: "created_at",
            orderDirection: "desc"
        }
        console.log(data);

        const payload = {
            data: encyrpt(JSON.stringify(data))
        }

        try {
            const res = await fetchData(payload).unwrap()
            let decryptData = decrypt(res?.data)
            const resultData = JSON.parse(decryptData)
            console.log(resultData);
            if (resultData?.statuscode === 200) {
                const currentToken = store.getState().login.loginData?.token

                const updatedLoginData = {
                    ...resultData,
                    token: resultData.refresh_token ? resultData.refresh_token : currentToken || resultData.token,
                }

                dispatch(setLoginData(updatedLoginData))
                dispatch(setDepartmentData(resultData?.data))
            }
        } catch (err) {
            console.log(err);
            const statuscode = err?.status
            const message = err?.data?.message
            ErrorHandle(statuscode, message, navigate)
        } finally { }
    }

    useEffect(() => {
        fetchDepts()
    }, [])

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    // ✅ handle pagination click
    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
    };
    const fetchRole = async (deptId) => {
        const data = {
            "dbName": "cry_admin",
            "tableName": "cry_role",
            "groupBy": "",
            "selectFields": "",
            "filters": {
                "dept_id": deptId
            },
            "perPage": 1000,
            "page": 1,
            "orderBy": "created_at",
            "orderDirection": "desc"
        }
        console.log(data);

        const payload = {
            data: encyrpt(JSON.stringify(data))
        }

        try {
            const res = await getRole(payload).unwrap()
            let decryptData = decrypt(res?.data)
            const resultData = JSON.parse(decryptData)
            console.log(resultData);
            if (resultData?.statuscode === 200) {
                const currentToken = store.getState().login.loginData?.token

                const updatedLoginData = {
                    ...resultData,
                    token: resultData.refresh_token ? resultData.refresh_token : currentToken || resultData.token,
                }
                dispatch(setLoginData(updatedLoginData))
                dispatch(setRoleList(resultData?.data))
            }
        } catch (err) {
            console.log(err)
            const statuscode = err?.status
            const message = err?.data?.message
            ErrorHandle(statuscode, message, navigate)
        } finally { }
    }

    const fetchReportedBy = async (selectedDepartment, selectedRole) => {
        const data = {
            dept_id: selectedDepartment,
            role_id: selectedRole
        }
        console.log(data);

        const payload = {
            data: encyrpt(JSON.stringify(data))
        }

        try {
            const res = await getReportBy(payload).unwrap()
            let decryptData = decrypt(res?.data)
            const resultData = JSON.parse(decryptData)
            console.log(resultData);
            if (resultData?.statuscode === 200) {
                const currentToken = store.getState().login.loginData?.token

                const updatedLoginData = {
                    ...resultData,
                    token: resultData.refresh_token ? resultData.refresh_token : currentToken || resultData.token,
                }
                dispatch(setLoginData(updatedLoginData))
                dispatch(setReportByList(resultData))
            }
        } catch (err) {
            console.log(err)
            dispatch(setReportByList([]))
            const statuscode = err?.status
            const message = err?.data?.message
            ErrorHandle(statuscode, message, navigate)
        } finally { }
    }

    const [formDataUpdate, setFormDataUpdate] = useState({
        firstName: "",
        lastName: "",
        number: "",
        emailId: "",
        depart: "",
        role: "",
        reporting: "",
        id: ""
    })
    const [id, setId] = useState("")

    const [formDataUpdateError, setFormDataUpdateError] = useState({
        firstName: "",
        lastName: "",
        number: "",
        emailId: "",
        depart: "",
        role: "",
        company: ""
    })

    const handleInputUpdate = (e) => {
        const { name, value } = e.target

        const character = /^[a-zA-Z\s]*$/
        const number = /^(?!.*[<>;])\d*\.?\d*$/;
        const email = /^[^<>;]*$/

        const characterName = ["firstName", "lastName"]
        const numberName = ["number"]
        const emailName = ["emailId"]

        if (characterName.includes(name)) {
            if (character.test(value)) {
                const capitalValue = value.charAt(0).toUpperCase() + value.slice(1)
                setFormDataUpdate({ ...formDataUpdate, [name]: capitalValue })
                setFormDataUpdateError({ ...formDataUpdateError, [name]: "" })
            }
        } else if (numberName.includes(name)) {
            if (number.test(value)) {
                setFormDataUpdate({ ...formDataUpdate, [name]: value })
                setFormDataUpdateError({ ...formDataUpdateError, [name]: "" })
            }
        } else if (emailName.includes(name)) {
            if (email.test(value)) {
                setFormDataUpdate({ ...formDataUpdate, [name]: value })
                setFormDataUpdateError({ ...formDataUpdateError, [name]: "" })
            }
        } else {
            setFormDataUpdate({ ...formDataUpdate, [name]: value })
            setFormDataUpdateError({ ...formDataUpdateError, [name]: "" })
        }
    }

    const validateInputUpdate = () => {
        let valid = true
        const newError = {}

        if (!formDataUpdate.firstName.trim()) {
            valid = false
            newError.firstName = "First Name is required"
        } else if (formDataUpdate.firstName.length < 3) {
            valid = false
            newError.firstName = "Minimum Enter 3 letters are required"
        } else if (formDataUpdate.firstName.length > 25) {
            valid = false
            newError.firstName = "Maximum Enter 25 letters are required"
        }

        if (!formDataUpdate.lastName.trim()) {
            valid = false
            newError.lastName = "Last Name is required"
        } else if (formDataUpdate.lastName.length < 1) {
            valid = false
            newError.lastName = "Minimum Enter 1 letters are required"
        } else if (formDataUpdate.lastName.length > 25) {
            valid = false
            newError.lastName = "Maximum Enter 25 letters are required"
        }

        if (!formDataUpdate.number.trim()) {
            valid = false
            newError.number = "Phone Number is required"
        } else if (formDataUpdate.number.length < 10) {
            valid = false
            newError.number = "Minimum 10 numbers required"
        }

        if (!formDataUpdate.emailId.trim()) {
            valid = false
            newError.emailId = "Email is required"
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formDataUpdate.emailId)) {
            valid = false
            newError.emailId = "Invalid Email"
        }

        if (!selectedDepartment) {
            valid = false;
            newError.depart = "Please select a department";
        }

        if (!formDataUpdate.role) {
            valid = false;
            newError.role = "Please select a role";
        }

        setFormDataUpdateError(newError)
        return valid
    }


    const handleEditPopup = (items) => {
        setId(items?.id)

        const departmentName = departmentList.find(dept => String(dept.id) === String(items.dept_id))?.dept_name || "";
        const roleName = roleList.find(role => String(role.id) === String(items.role_id))?.role_name || "";

        setFormDataUpdate({
            firstName: items.first_name || "",
            lastName: items.last_name || "",
            number: items.mobile || "",
            emailId: items.email || "",
            depart: departmentName,
            role: roleName,
            reporting: items?.reported_by,
            id: items?.cy_id || ""
        })

        setSelectedDepartment(items.dept_id);
        setSelectedRole(items.role_id);
        setEditPopup(!editPopup);

        setFormDataUpdateError({
            firstName: "",
            lastName: "",
            number: "",
            emailId: "",
            depart: "",
            role: "",
            company: ""
        })
    }
    const [updateLoader, setUpdateLoader] = useState(false)

    const clickUpdate = async (e) => {
        e.preventDefault()

        if (!validateInputUpdate()) {
            return;
        }

        const data = {
            first_name: formDataUpdate.firstName,
            last_name: formDataUpdate.lastName,
            dept_id: selectedDepartment,
            role_id: selectedRole,
            reported_by: formDataUpdate.reporting,
            cy_id: formDataUpdate.id
        }
        console.log(data);

        const payload = {
            data: encyrpt(JSON.stringify(data))
        }
        console.log(payload);
        setUpdateLoader(true)
        try {
            const res = await updateUser(payload).unwrap()
            let decryptData = decrypt(res?.data)
            const resultData = JSON.parse(decryptData)
            console.log(resultData);
            if (resultData?.statuscode === 200) {
                const currentToken = store.getState().login.loginData?.token

                const updatedLoginData = {
                    ...resultData,
                    token: resultData.refresh_token ? resultData.refresh_token : currentToken || resultData.token,
                }
                dispatch(setLoginData(updatedLoginData))
                ToastSuccess(resultData?.message)
                fetchUsers()
                setEditPopup(false)
            }
        } catch (err) {
            console.log(err);

        } finally {
            setUpdateLoader(false)
        }
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
                            <th>ID</th>
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
                        {userList?.length > 0 ? userList.map((items, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{items?.cy_id}</td>
                                <td>{items?.first_name} {items?.last_name}</td>
                                <td>{items?.email}</td>
                                <td>{items?.mobile || "-"}</td>
                                <td>{items?.created_at || "-"}</td>
                                <td>
                                    {items?.cry_status === "1" ? <div className='flex justify-center text-green-700 items-center gap-1'><GoDotFill className='text-green-700' /> Active</div> : <div className='flex justify-center text-red-700 items-center gap-1'><GoDotFill className='text-red-700' /> Inactive</div>}
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
                                    <span className='AiFillEdit grid place-content-center' onClick={() => handleEditPopup(items)}> <AiFillEdit /> </span>
                                </td>
                            </tr>)
                        ) : (
                            <tr>
                                <td colSpan="10" className='text-center'> No Data Found </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center items-center mt-4">
                <ReactPaginate
                    previousLabel={<GrFormPrevious />}
                    nextLabel={<GrFormNext />}
                    pageCount={totalPages}
                    onPageChange={handlePageClick}
                    breakLabel={"..."}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    containerClassName={"flex gap-2 items-center"}
                    pageClassName={
                        "px-3 py-1 border rounded cursor-pointer transition"
                    }
                    activeClassName={"bg-[#004D61] text-white font-semibold rounded-md"}
                    previousClassName={
                        "bg-[#004D61] text-white p-2 font-bold rounded-md"}
                    nextClassName={
                        "bg-[#004D61] text-white p-2 font-bold rounded-md"
                    }
                />
            </div>

            <div className={`user__popupContainer flex justify-center ${popup ? "open" : ""} `}>
                <div className='user__popup px-5 py-7'>
                    <div className='flex items-center'>
                        <span className='add__departName block'>Add New User</span>
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
                            <input className='popup__input px-4' placeholder='Enter Phone Number' name='phoneNumber' value={formData.phoneNumber} onChange={handleInput} maxLength={10} />
                            {formDataError.phoneNumber && <span className='error__msg'> {formDataError.phoneNumber} </span>}
                        </div>
                        <div>
                            <span className='input__label mb-2 block'>Email Address</span>
                            <input className='popup__input px-4' placeholder='Enter Email Address' name='emailId' value={formData.emailId} onChange={handleInput} />
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
                                onChange={(selectedOption) => {
                                    const deptId = selectedOption?.value
                                    setSelectedDepartment(deptId)
                                    if (deptId) fetchRole(deptId)
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
                                onChange={(selectedOption) => {
                                    setSelectedRole(selectedOption?.value)
                                    fetchReportedBy(selectedDepartment, selectedOption?.value)
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
                            />
                            {formDataError.role && <span className="error__msg">{formDataError.role}</span>} {/* ✅ Correct error display */}
                        </div>
                        <div>
                            <span className='input__label mb-2 block'>Reported By</span>
                            <Select
                                className="select__option"
                                options={reportedList?.map((item) => ({
                                    value: item?.id,
                                    label: item?.first_name,
                                }))}
                                placeholder="Select a Role"
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
                                onChange={(selectedOption) => setSelectedReported(selectedOption?.value)}
                            />
                            {formDataError.role && <span className="error__msg">{formDataError.role}</span>} {/* ✅ Correct error display */}
                        </div>
                        {/* <div>
                            <span className='input__label mb-2 block'>Company List</span>
                             <MultiSelect 
                                options={options}
                                value={selectedCompanyObjects}
                                onChange={handleCompanyChange}
                                labelledBy="Select Company"
                                overrideStrings={{
                                    selectSomeItems: "Select Company",
                                    allItemsAreSelected: "All Companies Selected",
                                    search: "Search Companies...",
                                }}
                            />                   
                        </div> */}
                        <div className='grid place-content-center col-span-2'>
                            {userAddLoader ? <button className=' profile__btn flex justify-center  w-[200px] place-content-center'> submiting...<ButtonCoinLoader /> </button> :
                                <button className='profile__btn w-[200px]' type='submit'>Submit</button>}
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
                    <form className='grid grid-cols-2 gap-x-3 gap-y-5 mt-10' onSubmit={clickUpdate} autoComplete='off'>
                        <div>
                            <span className='input__label mb-2 block'>First Name</span>
                            <input className='popup__input px-4' value={formDataUpdate.firstName} onChange={handleInputUpdate} placeholder='Enter First Name' name='firstName' />
                            {formDataUpdateError.firstName && <span className='error__msg'> {formDataUpdateError.firstName} </span>}
                        </div>
                        <div>
                            <span className='input__label mb-2 block'>Last Name</span>
                            <input className='popup__input px-4' value={formDataUpdate.lastName} onChange={handleInputUpdate} placeholder='Enter Last Name' name='lastName' />
                            {formDataUpdateError.lastName && <span className='error__msg'> {formDataUpdateError.lastName} </span>}
                        </div>
                        <div>
                            <span className='input__label mb-2 block'>Phone Number</span>
                            <input className='popup__input px-4' value={formDataUpdate.number} onChange={handleInputUpdate} placeholder='Enter Phone Number' disabled name='number' maxLength={10} />
                            {formDataUpdateError.number && <span className='error__msg'> {formDataUpdateError.number} </span>}
                        </div>
                        <div>
                            <span className='input__label mb-2 block'>Email Address</span>
                            <input className='popup__input px-4' value={formDataUpdate.emailId} onChange={handleInputUpdate} placeholder='Enter Email Address' disabled name='emailId' />
                            {formDataUpdateError.emailId && <span className='error__msg'> {formDataUpdateError.emailId} </span>}
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
                                options={departmentList.map((item) => ({
                                    value: item.id,
                                    label: item.dept_name,
                                }))}
                                placeholder="Select a Department"
                                onChange={(selectedOption) => {
                                    setSelectedDepartment(selectedOption?.value);
                                    setFormDataUpdate((prev) => ({
                                        ...prev,
                                        depart: selectedOption?.label,
                                    }));
                                }}
                                value={departmentList
                                    .map((item) => ({
                                        value: item.id,
                                        label: item.dept_name,
                                    }))
                                    .find((option) => option.label === formDataUpdate.depart)}
                            />
                            {formDataUpdateError.depart && <span className="error__msg">{formDataUpdateError.depart}</span>}
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
                                options={roleList.map((item) => ({
                                    value: item.id,
                                    label: item.role_name,
                                }))}
                                placeholder="Select a Role"
                                onChange={(selectedOption) => {
                                    setSelectedRole(selectedOption?.value);
                                    setFormDataUpdate((prev) => ({
                                        ...prev,
                                        role: selectedOption?.label,
                                    }));
                                }}
                                value={roleList
                                    .map((item) => ({
                                        value: item.id,
                                        label: item.role_name,
                                    }))
                                    .find((option) => option.label === formDataUpdate.role)}
                            />
                            {formDataUpdateError.role && <span className="error__msg">{formDataUpdateError.role}</span>}
                        </div>

                        <div className='grid place-content-center pt-5 pb-3 col-span-2'>
                            {updateLoader ? <button className='popup__btn profile__btn w-[200px] justify-center place-content-center flex'> Submiting...<ButtonCoinLoader /> </button> :
                                <button className='profile__btn w-[200px]' type='submit'>Submit</button>}
                            {/* <button className='profile__btn w-[200px]' type='submit'>Submit</button> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Users