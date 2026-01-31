import { toast } from 'react-toastify'

export const  ToastSuccess = (msg) => {
    return toast.success(msg)
} 

export const  ToastError = (msg) => {
    return toast.error(msg)
} 

export const  ToastInfo = (msg) => {
    return toast.info(msg)
}

