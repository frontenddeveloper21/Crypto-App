import React, { useEffect, useState } from 'react'
import { AiFillEdit } from "react-icons/ai";
import { IoCloseSharp } from 'react-icons/io5'
import { MdDelete, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useAddDepartMutation, useFetchDepartMutation } from '../../service/userManagementApi';
import { decrypt, encyrpt } from '../../utilites/crypto';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import store from '../Store/store';
import { setLoginData } from '../Features/LoginData';
import ResLoader from '../loader/resLoader';
import { setDepartmentData } from '../Features/UserManagement';
import ButtonCoinLoader from '../../Auth/LoadingButton';
import { ToastError, ToastSuccess } from '../../utilites/toast';
import { ErrorHandle } from '../../utilites/errorHandle';
import ReactPaginate from 'react-paginate';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import CoinLoaderRow from '../../Auth/CoinLoader';

const Department = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [fetchData] = useFetchDepartMutation()
    const [addDepart] = useAddDepartMutation()
    const [updateDepart] = useAddDepartMutation()

    const departmentList = useSelector((state) => state?.userManagement?.departmentList)

    const [popup, setPopup] = useState(false)
    const [popupUpdate, setPopupUpdate] = useState(false)
    const [department, setDepartment] = useState("")
    const [updateDepartment, setUpdateDepartment] = useState("")
    const [departmentError, setDepartmentError] = useState("")
    const [updateDepartError, setUpdateDepartError] = useState("")
    const [loader, setLoader] = useState(false)
    const [updateLoader, setUpdateLoader] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);

    const handlePopup = () => {
        setPopup(!popup);
        setDepartment("");
        setDepartmentError("");
    };


    const handleUpdatePopup = (items) => {
        setPopupUpdate(!popupUpdate)
        setUpdateDepartment(items?.dept_name)
        setUpdateDepartError("")
    }

    const fetchDepart = async () => {
        const data = {
            dbName: "cry_admin",
            tableName: "cy_department",
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

        setLoading(true);

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
            if (resultData?.pagination) {
                setTotalPages(Math.ceil(resultData.pagination.totalRecords / data.perPage));
            }

        } catch (err) {
            console.log(err);
            const statuscode = err?.status
            const message = err?.data?.message
            ErrorHandle(statuscode, message, navigate)

        } finally {
            setLoading(false);
        }

    }

    const addDepartment = async (e) => {
        e.preventDefault()

        const trimmedDept = department.trim();

        // Validate minimum and maximum length
        if (!trimmedDept) {
            setDepartmentError("Department is required");
            return;
        }
        if (trimmedDept.length < 3) {
            setDepartmentError("Department name must be at least 3 characters");
            return;
        }
        if (trimmedDept.length > 25) {
            setDepartmentError("Department name cannot exceed 25 characters");
            return;
        }

        const data = {
            dbName: "cry_admin",
            tableName: "cy_department",
            data: {
                dept_name: department
            },
            checkColumns: ["dept_name"]
        }
        console.log(data);

        const payload = {
            data: encyrpt(JSON.stringify(data))
        }

        setLoader(true)

        try {
            const res = await addDepart(payload).unwrap()
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
                fetchDepart()
                setPopup(false)
                setDepartment("")
                setDepartmentError("")
            }

        } catch (err) {
            console.log(err);
            const statuscode = err?.status
            const message = err?.data?.message
            ErrorHandle(statuscode, message, navigate)
            ToastError(err?.data?.error)
        } finally {
            setLoader(false)
        }

    }

    const updateDepartments = async (e) => {
        e.preventDefault()

        const trimmedDept = updateDepartment.trim();

        // Validate minimum and maximum length
        if (!trimmedDept) {
            setUpdateDepartError("Department is required");
            return;
        }
        if (trimmedDept.length < 3) {
            setUpdateDepartError("Department name must be at least 3 characters");
            return;
        }
        if (trimmedDept.length > 25) {
            setUpdateDepartError("Department name cannot exceed 25 characters");
            return;
        }

        const data = {
            dbName: "cry_admin",
            tableName: "cy_department",
            data: {
                dept_name: updateDepartment
            },
            checkColumns: ["dept_name"]
        }
        console.log(data);

        const payload = {
            data: encyrpt(JSON.stringify(data))
        }

        setUpdateLoader(true)

        try {
            const res = await addDepart(payload).unwrap()
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

                fetchDepart()
                setPopup(false)
                setDepartment("")
                setDepartmentError("")
                ToastSuccess(resultData?.message)
            }

        } catch (err) {
            console.log(err);
            const statuscode = err?.status
            const message = err?.data?.message
            ErrorHandle(statuscode, message, navigate)
            ToastError(err?.data?.error)
        } finally {
            setUpdateLoader(false)
        }
    }

    useEffect(() => {
        fetchDepart()
    }, [currentPage])

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
    };
    return (
        <div>
            <div className='flex justify-between items-center'>
                <span className='text-[#1A3B5D] text-[16px] font-semibold'>Department List</span>
                <div>
                    <button onClick={handlePopup} className="profile__btn">Add Department</button>
                </div>
            </div>
            <div className='table__container mt-8'>
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Department</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <CoinLoaderRow />
                        ) :
                            departmentList?.length > 0 ? departmentList.map((items, index) => (
                                <tr key={index}>
                                    <td> {index + 1} </td>
                                    <td> {items?.dept_name} </td>
                                    <td className='flex items-center justify-center gap-3'>
                                        <span className='AiFillEdit grid place-content-center' onClick={() => handleUpdatePopup(items)}> <AiFillEdit /> </span>
                                        <span className='MdDelete grid place-content-center'> <MdDelete /> </span>
                                    </td>
                                </tr>)
                            ) : (
                                <tr>
                                    <td colSpan="7" className='text-center'>No Data Found</td>
                                </tr>
                            )}

                    </tbody>
                </table>
            </div>

            <div className={`popup__container ${popup ? "open" : ""} flex justify-center`}>
                <div className='popup__content h-fit w-3/5 lg:w-1/3 px-5 py-7'>
                    <div className='flex items-center'>
                        <span className='add__departName block'>Add Department</span>
                        <div className='close__container grid place-content-center ml-auto cursor-pointer' onClick={handlePopup}>
                            <span> <IoCloseSharp className='close__icon' /> </span>
                        </div>
                    </div>
                    <form className='mt-10' onSubmit={addDepartment}>
                        <span className='block mb-2 text-sm font-semibold '>Department</span>
                        <input
                            type="text"
                            placeholder="Enter Department"
                            className="popup__input px-4"
                            value={department}
                            onChange={(e) => {
                                const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                                setDepartment(value);
                            }}
                        />                        {departmentError && <span className='block error__msg'> {departmentError} </span>}
                        <div className='mt-10 grid place-content-center'>
                            {loader ? <button className='profile__btn w-[180px] grid place-content-center'> <ButtonCoinLoader /> </button> :
                                <button className='profile__btn w-[180px] cursor-pointer' type='submit'>Submit</button>}
                        </div>
                    </form>
                </div>
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
                        " font-semibold rounded px-1 cursor-pointer transition"
                    }
                    activeClassName={"bg-gradient-to-tr from-[#004D61] to-[#00A6A6] px-3 py-1 cursor-pointer text-white font-semibold rounded-md"}
                    previousClassName={
                        "bg-gradient-to-tr from-[#004D61] to-[#00A6A6] text-white cursor-pointer  p-2 font-bold rounded-md"}
                    nextClassName={
                        "bg-gradient-to-tr from-[#004D61] to-[#00A6A6] text-white cursor-pointer p-2 font-bold rounded-md"
                    }
                />

            </div>

            <div className={`popup__container ${popupUpdate ? "open" : ""} flex justify-center`}>
                <div className='popup__content h-fit w-3/5 lg:w-1/3 px-5 py-7'>
                    <div className='flex items-center'>
                        <span className='add__departName block'>Update Department</span>
                        <div className='close__container grid place-content-center ml-auto cursor-pointer' onClick={handleUpdatePopup}>
                            <span> <IoCloseSharp className='close__icon' /> </span>
                        </div>
                    </div>
                    <form onSubmit={updateDepartments} className='mt-10'>
                        <span className='block mb-2 text-sm font-semibold '>Department</span>
                        <input placeholder='Enter Department' value={updateDepartment}
                            onChange={(e) => {
                                const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                                setUpdateDepartment(value);
                            }}
                            className='popup__input px-4' />
                        {updateDepartError && <span className='block error__msg'> {updateDepartError} </span>}
                        <div className='mt-10 h-[50px] grid place-content-center'>
                            {updateLoader ? <span className='profile__btn cursor-not-allowed w-[180px] grid place-content-center'><ButtonCoinLoader /></span> :
                                <button className='profile__btn w-[180px] cursor-pointer' type='submit'>Submit</button>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Department