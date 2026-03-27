import {InputHTMLAttributes} from "react";

import {UseFormRegisterReturn} from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string
    label?: string,
    isRequire: boolean,
    register: UseFormRegisterReturn,
    className?: string,
    errorMessage?: string
}


const InputText = ({id, label, isRequire, register, errorMessage, className, ...props}: InputProps) => (
    <div className={className}>

        {/*Label*/}
        {label && (
            <label htmlFor={id} className={`block text-gray-700 font-medium mb-1`}>
                {label} {isRequire && (<span className={`text-rose-500`}>*</span>)}
            </label>
        )}

        {/*Input*/}
        <input
            id={id}
            autoComplete={"email"}
            type="text"
            {...register}
            {...props}
            className={`w-full px-4 py-2 border rounded-sm focus:outline-none ring-inset ${errorMessage ? "border-rose-500" : "border-gray-300 focus:ring-1 focus:ring-[#00009C]"} transition-colors duration-300`}
        />

        {/*Error message*/}
        {errorMessage && (
            <p className={`text-sm text-rose-500 mt-1`}>
                {errorMessage}
            </p>
        )}
    </div>
)

export {
    InputText
}