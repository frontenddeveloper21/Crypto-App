export const ErrorHandle = ( statuscode, message, navigate ) => {
    if( statuscode === 401 && message === "Expired token"){
        navigate("/sign-in")
    }
}