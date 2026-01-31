import { configureStore } from "@reduxjs/toolkit";
import { loginApi } from "../../service/loginApi";
import  LoginReducer from "../Features/LoginData";
import { userManagementApi } from "../../service/userManagementApi";
import UserManagementReducer from "../Features/UserManagement";

const loadState = () => {
    try{
        const sessionStore = sessionStorage.getItem("UserData")
        if(sessionStore){
            return JSON.parse(sessionStore)
        }

    }catch(err){
        console.log(err);        
    }
    return undefined
}

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem("UserData", serializedState);
    } catch (err) {
        console.error("Could not save state to storage", err);
    }
}

const persistedState = loadState()

const store = configureStore({
    reducer: {
        [loginApi.reducerPath]: loginApi.reducer, 
        [userManagementApi.reducerPath]: userManagementApi.reducer,
        
        login: LoginReducer,
        userManagement: UserManagementReducer
    },
    preloadedState: persistedState,
    middleware: ( getDefaultMiddleware) => getDefaultMiddleware().concat(
        loginApi.middleware,
        userManagementApi.middleware
    )
})

store.subscribe(() => {
    saveState(store.getState());
})

export default store
