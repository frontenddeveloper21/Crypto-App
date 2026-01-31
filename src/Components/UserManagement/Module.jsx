import React, { useEffect, useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { IoCloseSharp } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'
import "../Style/Style.css"
import LoadingButton from '../../Auth/LoadingButton'
import { useCreateModuleMutation, useFetchDepartMutation } from '../../service/userManagementApi'
import store from '../Store/store'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLoginData } from '../Features/LoginData'
import { setDepartmentData, setModuleList } from '../Features/UserManagement'
import { decrypt, encyrpt } from '../../utilites/crypto'

// Select library
import Select from 'react-select';
import { ToastSuccess } from '../../utilites/toast'
import ResLoader from '../loader/resLoader';
import { ErrorHandle } from '../../utilites/errorHandle';
import ReactPaginate from 'react-paginate'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import CoinLoaderRow from '../../Auth/CoinLoader'

const Module = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [fetchData] = useFetchDepartMutation()
    const [fetchModule] = useCreateModuleMutation()

    const moduleList = useSelector((state) => state?.userManagement?.moduleList)

    const [popup, setPopup] = useState(false)
    const [addLoader, setAddLoader] = useState(false)
    const [module, setModule] = useState("")
    const [child, setChild] = useState("");
    const [moduleError, setModuleError] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);


    const [popupUpdate, setPopupUpdate] = useState(false)
    const handlePopup = () => {
        setPopup(!popup)
        setModule("")
        setModuleError("")
    }

    const handleUpdatePopup = () => {
        setPopupUpdate(!popupUpdate)
    }

    const handleModuleChange = (selectedOption) => {
        setChild(selectedOption.value);
    }

    const handleAddModule = (e) => {
        e.preventDefault();
        setAddLoader(true);

        setTimeout(() => {
            setAddLoader(false);
            setPopup(false);
        }, 2000);
    };

    const fetchModules = async () => {
        const data = {
            dbName: "cry_admin",
            tableName: "cry_modules",
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
                dispatch(setModuleList(resultData?.data))
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

    const addModule = async (e) => {
        e.preventDefault()

        if (!module.trim()) {
            setModuleError("Module is required")
        }
        if (module.length < 2) {
            setModuleError("Module name must be at least 2 characters");
            return;
        }
        if (module.length > 25) {
            setModuleError("Module name cannot exceed 25 characters");
            return;
        }

        const data = {
            module: module,
            parent_id: String(child),
        }

        console.log(data);

        const payload = {
            data: encyrpt(JSON.stringify(data))
        }
        console.log(payload);

        try {
            const res = await fetchModule(payload).unwrap()
            console.log(res);
            let decryptData = decrypt(res?.data)
            console.log(decryptData);
            const userData = JSON.parse(decryptData)
            console.log(userData);

            if (userData?.statuscode === 200) {
                ToastSuccess(userData?.message)
                setModule("")
                setModuleError("")
                fetchModules()
                handlePopup()
            }

        } catch (err) {
            console.log(err);
        } finally { }
    }

    useEffect(() => {
        fetchModules()
    }, [currentPage])

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
    };

    return (
        <div>
            <div className='flex justify-between items-center'>
                <span className='text-[#1A3B5D] text-[16px] font-semibold'>Module List</span>
                <div>
                    <button onClick={handlePopup} className="profile__btn">Add Module</button>
                </div>
            </div>
            <div className='table__container mt-5'>
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Modules</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <CoinLoaderRow />
                        ) : moduleList?.length > 0 ? (
                            moduleList.map((items, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{items?.module}</td>
                                    <td className="flex items-center justify-center gap-3">
                                        <span
                                            className="AiFillEdit grid place-content-center"
                                            onClick={() => handleUpdatePopup()}
                                        >
                                            <AiFillEdit />
                                        </span>
                                        <span className="MdDelete grid place-content-center">
                                            <MdDelete />
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" className="text-center">
                                    No Data Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center items-center mt-4">
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
                    activeClassName={"bg-[#004D61] px-3 py-1 cursor-pointer text-white font-semibold rounded-md"}
                    previousClassName={
                        "bg-[#004D61] text-white cursor-pointer  p-2 font-bold rounded-md"}
                    nextClassName={
                        "bg-[#004D61] text-white cursor-pointer p-2 font-bold rounded-md"
                    }
                />

            </div>

            </div>

            <div className={`popup__container ${popup ? "open" : ""} flex justify-center`}>
                <div className='popup__content h-fit w-3/5 lg:w-1/3 px-5 py-7'>
                    <div className='flex items-center'>
                        <span className='add__departName block'>Add Module</span>
                        <div className='close__container grid place-content-center ml-auto cursor-pointer' onClick={handlePopup}>
                            <span> <IoCloseSharp className='close__icon' /> </span>
                        </div>
                    </div>
                    <form onSubmit={addModule} className='mt-10'>
                        <div>
                            <span className='input__label mt-5 block'>Module </span>
                            <input placeholder='Enter Module' className='popup__input mt-2 px-4' value={module} onChange={(e) => setModule(e.target.value)} />
                        </div>
                        {moduleError && <span className='block error__msg mt-2'> {moduleError} </span>}

                        <div>
                            <span className='input__label mt-5 block'>Parent Module</span>
                            <Select
                                className="select__option mt-2"
                                placeholder="Select a Module"
                                options={moduleList?.map((item) => ({
                                    value: item?.id,
                                    label: item?.module,
                                }))}
                                onChange={handleModuleChange}
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
                        <div className='mt-10 grid place-content-center'>
                            <button
                                className='profile__btn w-[180px] flex items-center justify-center'
                                type='submit'
                                disabled={addLoader}
                            >
                                {addLoader ? (
                                    <>
                                        Loading...
                                        <LoadingButton />
                                    </>
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className={`popup__container ${popupUpdate ? "open" : ""} flex justify-center`}>
                <div className='popup__content h-fit w-3/5 lg:w-1/3 px-5 py-7'>
                    <div className='flex items-center'>
                        <span className='add__departName block'>Update Department</span>
                        <div className='close__container grid place-content-center ml-auto cursor-pointer' onClick={handleUpdatePopup}>
                            <span> <IoCloseSharp className='close__icon' /> </span>
                        </div>
                    </div>
                    <form className='mt-10'>
                        <input placeholder='Enter Department' className='popup__input px-4' />
                        {/* {updateDepartError && <span className='block error__msg'> {updateDepartError} </span>} */}
                        <div className='mt-10 grid place-content-center'>
                            {/* {updateLoader ? <span className='popup__btn grid place-content-center'><ResLoader /></span> :
                                <button className='popup__btn' type='submit'>Submit</button>} */}
                            <button className='profile__btn w-[180px]' type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Module