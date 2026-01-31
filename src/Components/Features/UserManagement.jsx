import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    departmentList: [],
    moduleList: [],
    roleList: [],
    permissonList: [],
    userList: [],
    reportByList:[]
}

export const UserManagementSlice = createSlice({
    name: "userManagement",
    initialState,
    reducers: {
        setDepartmentData: ( state, action ) => {
            state.departmentList = action.payload
        },
        setModuleList: ( state, action ) => {
            state.moduleList = action.payload
        },
        setRoleList: ( state, action ) => {
            state.roleList = action.payload
        },
        setUserList: ( state, action ) => {
            state.userList = action.payload
        },
        setPermissionList: ( state, action ) => {
            state.permissonList = action.payload
        },
        setReportByList: ( state, action ) => {
            state.reportByList = action.payload
        },
    }
})

export const { 
    setDepartmentData, 
    setModuleList, 
    setRoleList,
    setUserList,
    setPermissionList,
    setReportByList
} = UserManagementSlice.actions

export default UserManagementSlice.reducer