import React, { useEffect, useState } from 'react'

// React Icon
import { FaUserGroup } from "react-icons/fa6";
import { AiFillEdit } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";

// Select library
import Select from 'react-select';
import "../Style/Style.css"

import { decrypt, encyrpt } from '../../utilites/crypto';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useClickPermissionMutation, useCreateRoleMutation, useFetchDepartMutation, useGetPermissionMutation, useRoleDetailMutation, useUpdateRoleMutation } from '../../service/userManagementApi';
import { setPermissionList, setRoleList } from '../Features/UserManagement';
import { setLoginData } from '../Features/LoginData';

// store
import store from '../Store/store';

// React Multi Select Component library
import { MultiSelect } from "react-multi-select-component";
import ResLoader from '../loader/resLoader';
import { ErrorHandle } from '../../utilites/errorHandle';

const Role = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [getRole] = useFetchDepartMutation()
    const [addRole] = useCreateRoleMutation()
    const [fetchPermission] = useGetPermissionMutation()
    const [roleInfo] = useRoleDetailMutation()
    const [updatePermission] = useClickPermissionMutation()
    const [updateRoleApi] = useUpdateRoleMutation()

    const getRoleList = useSelector((state) => state?.userManagement?.roleList)
    const departmentList = useSelector((state) => state?.userManagement?.departmentList)
    const permissionList = useSelector((state) => state?.userManagement?.permissonList)

    const roleOptions = getRoleList?.map((item) => ({
        value: item?.id,
        label: item?.role_name
    }) || [])

    const [popup, setPopup] = useState(false)
    const [updatePopup, setUpdatePopup] = useState(false)
    const [addRoleLoader, setAddRoleLoader] = useState(false)
    const [addRoleError, setAddRoleError] = useState("")
    const [deptError, setDeptError] = useState(null)
    const [roleDetails, setRoleDetails] = useState([])
    const [updateRoleList, setUpdateRoleList] = useState([])
    const [rolePopup, setRolePopup] = useState(false)

    const deptValue = roleDetails?.[0]?.dept_id ? parseInt(roleDetails?.[0]?.dept_id) : null
    const deptName = departmentList?.find((value) => value?.id === deptValue)

    const handlePopup = () => {
        setRole("")
        setAddRoleError("")
        setPopup(!popup)
    }

    const handleUpdatePopup = () => {
        setUpdatePopup(!updatePopup)
    }

    const handleRole = () => {
        setRolePopup(!rolePopup)
    }

    const [role, setRole] = useState("")
    const [roleError, setRoleError] = useState("")
    const [idValue, setIdValue] = useState("")
    const [selectedPermissions, setSelectedPermissions] = useState([])
    const [getRoleId, setGetRoleId] = useState([])
    const [updateRoleId, setUpdateRoleId] = useState([])
    const [selectedIds, setSelectedIds] = useState([])
    const [loderAdd, setLoaderAdd] = useState(false)
    const [updateRole, setUpdateRole] = useState("")

    const [UpdateRoleError, setUpdateRoleError] = useState("")
    const [checkedStates, setCheckedStates] = useState({});

    const handleModuleChange = (selectedOption) => {
        setIdValue(selectedOption.value)
    }

    const handlePermissionChange = (permId) => {
        setSelectedPermissions((prev) =>
            prev.includes(permId)
                ? prev.filter((id) => id !== permId)
                : [...prev, permId]
        )
    }

    const updateSubmit = (e) => {
        e.preventDefault();
    };

    const handleToggleCheck = (permissionId) => {
        setCheckedStates((prev) => {
            const newState = { ...prev, [permissionId]: !prev[permissionId] };
            handleCheck(permissionId, newState[permissionId] ? 1 : 0);
            return newState;
        });
    };

    const fetchRole = async () => {
        const data = {
            "dbName": "cry_admin",
            "tableName": "cry_role",
            "groupBy": "",
            "selectFields": "",
            "filters": {
                "status": "1"
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

    const getPermission = async () => {
        try {
            const res = await fetchPermission().unwrap()
            let decryptData = decrypt(res?.data)
            const resultData = JSON.parse(decryptData)
            console.log(resultData);

            if (resultData?.statuscode === 200) {
                dispatch(setPermissionList(resultData?.data))
                const currentToken = store.getState().login.loginData?.token

                const updatedLoginData = {
                    ...resultData,
                    token: resultData.refresh_token ? resultData.refresh_token : currentToken || resultData.token,
                }
                dispatch(setLoginData(updatedLoginData))
            }
        } catch (err) {
            console.log(err);

        } finally { }
    }

    const createRole = async (e) => {
        e.preventDefault()

        const data = {
            role_name: role,
            dept_id: idValue,
            permissions: selectedPermissions,
            role_reported_by: getRoleId.map((r) => r.value)
        }
        console.log(data);

        const payload = {
            data: encyrpt(JSON.stringify(data))
        }

        setLoaderAdd(true)

        try {
            const res = await addRole(payload).unwrap()
            let decryptData = decrypt(res?.data)
            const resultData = JSON.parse(decryptData)
            if (resultData?.statuscode === 200) {
                const currentToken = store.getState().login.loginData?.token

                const updatedLoginData = {
                    ...resultData,
                    token: resultData.refresh_token ? resultData.refresh_token : currentToken || resultData.token,
                }
                dispatch(setLoginData(updatedLoginData))
                fetchRole()
            }
        } catch (err) {
            console.log(err);

        } finally {
            setLoaderAdd(false)
        }
    }

    const getRoleDetail = async (id) => {
        const data = {
            role_id: id
        }
        console.log(data);

        const payload = {
            data: encyrpt(JSON.stringify(data))
        }

        try {
            const res = await roleInfo(payload).unwrap()
            let decryptData = decrypt(res?.data)
            const resultData = JSON.parse(decryptData)
            console.log(resultData);
            if (resultData?.statuscode === 200) {
                setUpdateRoleList(resultData?.data)
                const role = resultData?.data?.[0]?.role_name || ""
                setUpdateRole(role)
                setRoleDetails(resultData?.data)
                const currentToken = store.getState().login.loginData?.token

                const updatedLoginData = {
                    ...resultData,
                    token: resultData.refresh_token ? resultData.refresh_token : currentToken || resultData.token,
                }
                dispatch(setLoginData(updatedLoginData))

            }
        } catch (err) {
            console.log(err);

        } finally { }
    }

    const handleCheck = async (permissionId, currentValue) => {
        const newPermissionValue = currentValue === 1 ? 0 : 1;

        const data = {
            role_id: updateRoleList?.[0]?.role_id || "",
            permission_id: permissionId,
            permission_action: newPermissionValue
        };

        console.log("Updating Permission:", data);

        const payload = {
            data: encyrpt(JSON.stringify(data)),
        };

        try {
            const res = await updatePermission(payload).unwrap()
            let decryptData = decrypt(res?.data)
            const resultData = JSON.parse(decryptData)
            console.log(resultData);

        } catch (err) {
            console.error("Error updating permission", err);
        }
    }

    const clickReport = async (id) => {
        const data = {
            "dbName": "cry_admin",
            "tableName": "cry_role",
            "groupBy": "",
            "selectFields": "",
            "filters": {
                "status": "1",
                "id": id
            },
            "perPage": 1000,
            "page": 1,
            "orderBy": "created_at",
            "orderDirection": "desc",
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
                setRoleDetails(resultData?.data)
            }
        } catch (err) {
            console.log(err);

        } finally { }

    }

    const updateRoleReport = async (e) => {
        e.preventDefault();

        const data = {
            role_id: roleDetails[0]?.id,
            role_reported_by: selectedIds,
        }
        console.log(data);


        const payload = {
            data: encyrpt(JSON.stringify(data)),
        }

        try {
            const res = await updateRoleApi(payload).unwrap();
            const decryptData = decrypt(res?.data);
            const resultData = JSON.parse(decryptData);

            console.log("Updated successfully:", resultData)
        } catch (err) {
            console.log("Error:", err);
        }
    }

    useEffect(() => {
        const initialState = {};
        updateRoleList?.[0]?.modules?.forEach((moduleItem) => {
            moduleItem.permissions?.forEach((perm) => {
                const permType = Object.keys(perm).find((key) => key.includes("_permission"))
                initialState[perm.permission_id] = perm[permType] === 1
            })
        })
        setCheckedStates(initialState);
    }, [updateRoleList]);

    useEffect(() => {
        fetchRole()
        getPermission()
    }, [])

    useEffect(() => {
        if (
            roleDetails?.length &&
            updateRoleId.length === 0 &&
            roleOptions?.length > 0
        ) {
            const preselected = roleOptions.filter(opt => roleDetails[0]?.role_reported_by?.includes(opt.value))

            const preselectedValues = preselected.map(p => p.value);
            const currentValues = updateRoleId.map(p => p.value);

            const hasChanged = preselectedValues.length !== currentValues.length || !preselectedValues.every(v => currentValues.includes(v));

            if (hasChanged) {
                setUpdateRoleId(preselected)
                setSelectedIds(preselectedValues);
            }
        }
    }, [roleOptions, roleDetails]);

    useEffect(() => {
        if (permissionList.length > 0) {
            const parentPermissions = permissionList.filter((item) => item.parent_id === null).flatMap((p) => p.permissions ? p.permissions.map((perm) => perm.id) : [])

            setSelectedPermissions(parentPermissions);
        }
    }, [permissionList])

    console.log("updated role list", updateRoleList)

    return (
        <div>
            <div className='flex items-center justify-between'>
                <span className='text-[#1A3B5D] text-[16px] font-semibold'>Role List</span>
                <button className='bg-[#1A3B5D] px-4 ml-auto py-2 text-[#fff] text-[12px] font-bold cursor-pointer' onClick={handlePopup}>Add Role</button>
            </div>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 mt-5'>
                {getRoleList?.length > 0 ? (getRoleList.map((item, index) => (
                    <div className='card__role p-5 rounded-md' key={index}>
                        <div className='flex items-center justify-between'>
                            <span className='text-[#000] text-[18px]' onClick={() => {
                                handleRole()
                                clickReport(item?.id)
                            }}> <FaUserGroup /> </span>
                            <span className='text-[#000] cursor-pointer text-[18px]' onClick={() => {
                                getRoleDetail(item?.id)
                                handleUpdatePopup(item)
                            }}> <AiFillEdit /> </span>
                        </div>
                        <span className='mt-5 block'> {item?.role_name} </span>
                    </div>))
                ) : (
                    <span>No Role</span>
                )}
            </div>

            {/* Role Popup */}

            <div className={`popup__container ${popup ? "open" : ""} flex justify-center`}>
                <div className='popup__content h-fit max-h-[calc(100vh-80px)] w-3/4 lg:w-1/2 px-5 overflow-auto'>
                    <div className='flex items-center bg-[#FAFAFA] pt-4 sticky top-0 h-14 z-10'>
                        <span className='add__departName block'>Add Role</span>
                        <div className='close__container grid place-content-center ml-auto cursor-pointer' onClick={handlePopup}>
                            <span> <IoCloseSharp className='close__icon' /> </span>
                        </div>
                    </div>
                    <form className="mt-10" onSubmit={createRole}>
                         <span className='block mb-2 text-sm font-semibold '>Select Department</span>
                        <Select
                            className="select__option"
                            options={departmentList.map((item) => ({
                                value: item?.id,
                                label: item?.dept_name,
                            }))}
                            onChange={handleModuleChange}
                            placeholder="Select a Department"
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

                        {deptError && <span className="block error__msg mt-2">{deptError}</span>}
                         <span className='block mb-2 text-sm font-semibold mt-5'>Select Department</span>
                        <input
                            placeholder="Enter Role"
                            className="popup__input px-4"
                            value={role.charAt(0).toUpperCase() + role.slice(1)}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        {roleError && <span className="block error__msg mt-2">{roleError}</span>}

                        <span className='block my-2 text-sm font-semibold '>Reporting To Role</span>
                    <div style={{ fontWeight: 600 }}>
  <MultiSelect
    className="custom-multiselect"
    options={roleOptions}
    value={getRoleId}
    onChange={setGetRoleId}
    labelledBy="Select Role"
    overrideStrings={{
      selectSomeItems: "Select Role",
      allItemsAreSelected: "All Roles Selected",
      search: "Search Roles...",
    }}
  />
</div>


                        <div>
                            <span className=" text-md font-semibold block mt-5">Assign Permission to Roles</span>
                            <div className="w-full">
                                
                                {permissionList
                                    ?.filter((moduleItem) => moduleItem.parent_id === null)
                                    .map((parent) => (
                                        <div key={parent.id} className="mt-3">
                                            {/* PARENT MODULE */}
                                            <div className="flex items-center gap-4 py-1">
                                                <span className="font-semibold ">{parent.module}</span>

                                                {parent.permissions?.map((perm, index) => {
                                                    const isChecked = selectedPermissions.includes(perm.id);
                                                    return (
                                                        <div key={`${parent.id}-${index}`} className="flex items-center font-semibold text-sm gap-2">
                                                            <input
                                                                type="checkbox"
                                                                id={`perm-${parent.id}-${index}`}
                                                                checked={isChecked}
                                                                onChange={() => handlePermissionChange(perm.id)}
                                                            />
                                                            <label
                                                                htmlFor={`perm-${parent.id}-${index}`}
                                                                className="check__List"
                                                            >
                                                                {perm?.name
                                                                    ? perm.name.charAt(0).toUpperCase() + perm.name.slice(1)
                                                                    : "Unknown"}
                                                            </label>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {/* CHILD MODULES */}
                                            {permissionList
                                                ?.filter((child) => String(child.parent_id) === String(parent.id))
                                                .map((child) => (
                                                    <div
                                                        key={child.id}
                                                        className="ml-8 border-l-2 border-gray-300 pl-4 mt-3"
                                                    >
                                                        <div className="flex items-center gap-2 text-base font-medium">
                                                            <span className='text-[15px]'>↳ {child.module}</span>
                                                        </div>

                                                        <div className="ml-3 text-sm flex gap-4 py-1">
                                                            {child.permissions?.map((perm, index) => {
                                                                const isChildChecked = selectedPermissions.includes(perm.id);
                                                                return (
                                                                    <div key={`${child.id}-${index}`} className="flex items-center gap-2">
                                                                        <input
                                                                            type="checkbox"
                                                                            id={`perm-${child.id}-${index}`}
                                                                            checked={isChildChecked}
                                                                            onChange={() => handlePermissionChange(perm.id)}
                                                                        />
                                                                        <label
                                                                            htmlFor={`perm-${child.id}-${index}`}
                                                                            className="check__List"
                                                                        >
                                                                            {perm?.name
                                                                                ? perm.name.charAt(0).toUpperCase() + perm.name.slice(1)
                                                                                : "Unknown"}
                                                                        </label>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    ))}


                            </div>
                        </div>

                        {addRoleError && <span className='block error__msg'> {addRoleError} </span>}

                        <div className="py-5 grid bg-[#FAFAFA] sticky bottom-0 place-content-center">
                            {loderAdd ? <button className='popup__btn grid place-content-center'> <ResLoader /> </button> :
                                <button className='profile__btn w-[200px]' type='submit'>Submit</button>}
                        </div>
                    </form>
                </div>
            </div>

            {/* Update Popup */}

            <div className={`popup__container ${updatePopup ? "open" : ""} flex justify-center`}>
                <div className='popup__content h-fit max-h-[calc(100vh-80px)] w-3/4 lg:w-1/2 px-5 overflow-auto'>
                    <div className='flex items-center bg-[#FAFAFA] pt-4 sticky top-0 h-14 z-10'>
                        <span className='add__departName block'>Update Role</span>
                        <div className='close__container grid place-content-center ml-auto cursor-pointer' onClick={handleUpdatePopup}>
                            <span> <IoCloseSharp className='close__icon' /> </span>
                        </div>
                    </div>
                    <form className="mt-10" onSubmit={updateSubmit}>
                         <span className='block mb-2 text-sm font-semibold '>Select Department</span>
                        <Select
                            className="select__option"
                            options={departmentList.map((item) => ({
                                value: item.id,
                                label: item.dept_name,
                            }))}
                            value={deptName ? { value: deptName.id, label: deptName.dept_name } : null}
                            onChange={handleModuleChange}
                            placeholder="Select a Department"
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
                         <span className='block mb-2 mt-5 text-sm font-semibold '>Role</span>
                        <input
                            placeholder="Enter Role"
                            className="popup__input px-4"
                            value={updateRole}
                            onChange={(e) => setUpdateRole(e.target.value)}
                        />
                        {UpdateRoleError && <span className="block error__msg">{UpdateRoleError}</span>}

                        <div>
                            <span className=" text-md font-semibold block mt-5">Assign Permission to Roles</span>

                            {updateRoleList?.[0]?.modules
                                .filter((parent) => parent.parent_id === null)
                                .map((parent) => {
                                    const childModules = updateRoleList[0].modules.filter(
                                        (child) => String(child.parent_id) === String(parent.module_id)
                                    );

                                    return (
                                        <div key={parent.module_id} className="mb-4">
                                            <div className="flex items-center gap-4 py-2 font-semibold">
                                                <span className='text-md'>{parent.module_name}</span>
                                                {parent.permissions?.map((perm, index) => {
                                                    const permType = Object.keys(perm).find((key) => key.includes("_permission"));
                                                    return (
                                                        <div key={`${parent.module_id}-${index}`} className="flex items-center text-[12px] gap-2">
                                                            <input
                                                                type="checkbox"
                                                                id={`perm-${parent.module_id}-${index}`}
                                                                checked={checkedStates[perm.permission_id] || false}
                                                                onChange={() => handleToggleCheck(perm.permission_id)}
                                                            />
                                                            <label htmlFor={`perm-${parent.module_id}-${index}`} className="check__List text-sm">
                                                                {permType ? permType.replace("_permission", "").toUpperCase() : "UNKNOWN"}
                                                            </label>
                                                        </div>
                                                    );
                                                })}
                                            </div>


                                            {childModules.map((child) => (
                                                <div key={child.module_id} className="ml-8 border-l-2 border-gray-300 pl-4 mt-3">
                                                    <div className="flex items-center gap-2 text-base font-medium">
                                                        <span>↳ {child.module_name}</span>
                                                    </div>

                                                    {/* Child Permissions */}
                                                    <div className="ml-3 flex flex-wrap gap-3 mt-2">
                                                        {child.permissions?.map((perm, index) => {
                                                            const permType = Object.keys(perm).find((key) => key.includes("_permission"));
                                                            return (
                                                                <div key={`${child.module_id}-${index}`} className="flex items-center gap-2">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={`perm-${child.module_id}-${index}`}
                                                                        checked={checkedStates[perm.permission_id] || false}
                                                                        onChange={() => handleToggleCheck(perm.permission_id)}
                                                                    />
                                                                    <label htmlFor={`perm-${child.module_id}-${index}`} className="check__List text-sm">
                                                                        {permType ? permType.replace("_permission", "").toUpperCase() : "UNKNOWN"}
                                                                    </label>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}

                                        </div>
                                    );
                                })}

                        </div>

                        {/* {addRoleError && <span className='block error__msg'> {addRoleError} </span>} */}

                        <div className="mt-10 sticky bottom-0 bg-[#FAFAFA] pb-5 grid place-content-center">
                            {addRoleLoader ? <button className='profile__btn w-[200px] grid place-content-center'> <ResLoader /> </button> :
                                <button className="profile__btn w-[200px]" type="submit">Submit</button>}
                            {/* <button className='profile__btn w-[200px]' type='submit'>Submit</button> */}
                        </div>
                    </form>
                </div>
            </div>

            {/* Role popup */}

            <div className={`popup__container ${rolePopup ? "open" : ""} flex justify-center`}>
                <div className='popup__content h-fit max-h-[calc(100vh-40px)] w-3/4 lg:w-1/4 px-5 pb-7'>
                    <div className='flex items-center pt-4 sticky top-0 h-14 z-10'>
                        <span className='add__departName block'>Update Reported</span>
                        <div className='close__container grid place-content-center ml-auto cursor-pointer' onClick={handleRole}>
                            <span> <IoCloseSharp className='close__icon' /> </span>
                        </div>
                    </div>

                    <form onSubmit={updateRoleReport}>
                        <span className='block my-2 text-sm '>Reported By</span>
                        <MultiSelect
                            options={roleOptions}
                            value={updateRoleId}
                            onChange={(selected) => {
                                setUpdateRoleId(selected);
                                const ids = selected.map((item) => item.value);
                                setSelectedIds(ids);
                                console.log("Selected IDs:", ids);
                            }}
                            labelledBy="Select Role"
                            overrideStrings={{
                                selectSomeItems: "Select Role",
                                allItemsAreSelected: "All Roles Selected",
                                search: "Search Roles...",
                            }}
                            className="custom-multiselect mt-5 mb-10"
                        />

                        <div className='grid place-content-center'>
                            <button className='profile__btn w-[200px]' type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Role