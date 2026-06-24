import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type UserLoginType ={ 
    email :string,
    password:string
}
export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({
        baseUrl : `${process.env.NEXT_PUBLIC_ISHOP_BASE_URL}`
    }),
    endpoints:(builder)=>({
        // builder.mutation<ResponseType, RequestType>()
        loginUser : builder.mutation<UserLoginType,UserLoginType>({
            query:(payload)=>({
                url: `/auth/login`,
                method:"POST",      
                body:payload
            })
        })
    })
})

export const {useLoginUserMutation} = authApi;