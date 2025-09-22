import {toast} from "sonner";
// import React from "react";
// interface optionsType {
//     icon?: React.ReactNode,
//     duration?: number,
//     description?: string
// }
// hàm kích hoạt toast cũ tự config
// const setToast = (label: string, options: optionsType) => {
//     toast(label, options)
// }


interface toastOptionsType {
    type: "success" | "error" | "warning" | "info" | "message" | "loading",
    description?: string,
    duration?: number
}

const activeToast = (label: string, options: toastOptionsType) => {
    const {description, duration} = options;
    switch (options.type) {
        case "success" : {
            toast.success(label, {
                description: description ? description : "",
                duration: duration ? duration : 2000
            });
            break;
        }
        case "error" : {
            toast.error(label, {
                description: description ? description : "",
                duration: duration ? duration : 2000
            });
            break;
        }
        case "warning" : {
            toast.warning(label, {
                description: description ? description : "",
                duration: duration ? duration : 2000
            });
            break;
        }
        case "info" : {
            toast.info(label, {
                description: description ? description : "",
                duration: duration ? duration : 2000
            });
            break;
        }
        case "loading" : {
            toast.loading(label, {
                description: description ? description : "",
                duration: duration ? duration : 2000
            });
            break;
        }
        default: {
            toast.message(label, {
                description: description ? description : "",
                duration: duration ? duration : 2000
            });
            break;
        }
    }
}

export {activeToast}

