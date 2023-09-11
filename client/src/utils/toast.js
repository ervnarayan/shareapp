import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const notifyOptions = {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
}

export const notifySuccess = (msg) => {toast.success(msg, notifyOptions)};
export const notifyError = (msg) => {toast.error(msg, notifyOptions)};




