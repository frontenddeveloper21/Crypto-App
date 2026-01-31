import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loginData: []
}

export const LoginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setLoginData: (state, action) => {
            const newData = action.payload;
            state.loginData = {
                ...newData,
                token: newData.token || newData.refresh_token || state.loginData?.token || "",
            };
        },    
    }
})

export const { setLoginData } = LoginSlice.actions

export default LoginSlice.reducer