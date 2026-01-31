import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AppKeys } from "./AppKeys"

export const userManagementApi = createApi({
    reducerPath: "usermanagement",
    baseQuery: fetchBaseQuery({
        baseUrl: AppKeys.APPURL,
        prepareHeaders: ( headers, { getState } ) => {
        const token = getState()?.login?.loginData?.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;        
        }
    }),

    endpoints: ( builder ) => ({
        fetchDepart: builder.mutation({
            query: ( data ) => ({
                url: AppKeys.GETDATA,
                method: "POST",
                body: data
            })
        }),
        addDepart: builder.mutation({
            query: ( data ) => ({
                url: AppKeys.INSERTDATA,
                method: "POST",
                body: data
            })
        }),
        createModule: builder.mutation({
            query: ( data ) => ({
                url: AppKeys.CREATEMODULE,
                method: "POST",
                body: data
            })
        }),
        // createModule: builder.mutation({
        //     query: ( data ) => ({
        //         url: AppKeys.CREATEUSER,
        //         method: "POST",
        //         body: data
        //     })
        // }),
        createRole: builder.mutation({
            query: ( data ) => ({
                url: AppKeys.CREATEROLE,
                method: "POST",
                body: data
            })
        }),
        createUser: builder.mutation({
            query: ( data ) => ({
                url: AppKeys.CREATEUSER,
                method: "POST",
                body: data
            })
        }),
        getPermission: builder.mutation({
            query: ( data ) => ({
                url: AppKeys.GETPERMISSION,
                method: "POST",
                body: data
            })
        }),
        roleDetail: builder.mutation({
            query: ( data ) => ({
                url: AppKeys.GETROLE,
                method: "POST",
                body: data
            })
        }),
        clickPermission: builder.mutation({
            query: ( data ) => ({
                url: AppKeys.UPDATEPERMISSION,
                method: "POST",
                body: data
            })
        }),
        updateUser: builder.mutation({
            query: ( data ) => ({
                url: AppKeys.UPDATEUSER,
                method: "POST",
                body: data
            })
        }),
        updateRole: builder.mutation({
            query: ( data ) => ({
                url: AppKeys.UPDATEROLE,
                method: "POST",
                body: data
            })
        }),
        getReportBy: builder.mutation({
            query: ( data ) => ({
                url: AppKeys.GETREPORTEDBYAPI,
                method: "POST",
                body: data
            })
        }),
        createPin: builder.mutation({
              query: (data) => ({
                url: AppKeys.CREATEPINAPI,
                method: "POST",
                body: data,
              }),
        }),
        forgetPin: builder.mutation({
              query: (data) => ({
                url: AppKeys.FORGETPINAPI,
                method: "POST",
                body: data,
              }),
       }),

    })
})

export const {
    useFetchDepartMutation,
    useAddDepartMutation,
    useCreateModuleMutation,
    useCreateUserMutation,
    useCreateRoleMutation,
    useGetPermissionMutation,
    useRoleDetailMutation,
    useClickPermissionMutation,
    useUpdateUserMutation,
    useUpdateRoleMutation,
    useGetReportByMutation,
    useCreatePinMutation,
    useForgetPinMutation,
} = userManagementApi