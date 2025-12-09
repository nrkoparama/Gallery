import {InputHTMLAttributes} from "react";

import {UseFormRegisterReturn} from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string
    label?: string,
    register: UseFormRegisterReturn,
    className?: string,
    errorMessage?: string
}

export default function Input({id, className, label, register, errorMessage, ...props}: InputProps) {
    return (
        <div className={className}>
            {/*Label*/}
            {label && (
                <label htmlFor={id} className={`block text-gray-700 font-medium mb-1`}>
                    {label}
                </label>
            )}
            {/*Input*/}
            <input
                id={id}
                type="text"
                {...register}
                {...props}
                className={`w-full text-gray-500 px-4 py-2.5 border rounded-sm focus:outline-none ring-inset
                ${errorMessage ? "border-red-500" : "border-gray-300 focus:ring-1 focus:ring-[#00009C]"} 
                transition duration-300`}
            />
            {/*Error*/}
            {errorMessage && (
                <p className={`text-sm text-red-500 mt-1`}>
                    {errorMessage}
                </p>
            )}
        </div>
    )
}