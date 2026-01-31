// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
// import { AppKeys } from "./AppKeys"

// export const loginApi = createApi({
//     reducerPath: "loginApi",
//     baseQuery: fetchBaseQuery({
//         baseUrl: AppKeys.APPURL
//     }),

//     endpoints: ( builder ) => ({
//         login: builder.mutation({
//             query: ( data ) => ({
//                 url: AppKeys.LOGIN,
//                 method: "POST",
//                 body: data
//             })
//         }),
        
//         invalidatesTags: [], 
//     })
// })

// export const { 
//    useLoginMutation 
// } = loginApi


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppKeys } from "./AppKeys";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: AppKeys.APPURL,
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: AppKeys.LOGIN,
        method: "POST",
        body: data,
      }),
    }),

  }),
});

export const { useLoginMutation } = loginApi;
