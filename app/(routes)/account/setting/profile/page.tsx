"use client";
import Image from "next/image";
import React, {useEffect, useRef, useState} from "react";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {UpdateProfile} from "@/app/services/api/account";
import {activeToast} from "@/utils/activeToast";
import {useAuthor} from "@/app/components/provider/authorContext.provider";
import type {UpdateProfileType} from "@/types/Author";
import {Camera} from 'lucide-react';

const schema = Yup.object().shape({
    fullName: Yup.string()
        .required("* Vui lòng không để trống thông tin này")
        .trim()
        .max(50, "* Tên tài khoản tối đa 50 kí tự")
        .matches(/^[A-Za-z0-9 ]/, `* Tên tài khoản chỉ được gồm chữ cái hoặc số`),
    tagName: Yup.string()
        .required("* Vui lòng không để trống thông tin này")
        .trim()
        .matches(/^[A-Za-z0-9_]{10}$/, `* Mã định danh chỉ được gồm chữ cái, số hoặc dấu gạch dưới " _ "`),
    email: Yup.string()
        .required("* Vui lòng không để trống thông tin này")
        .trim()
        .email("* Email không hợp lệ"),
    image: Yup.mixed<FileList>()
        .nullable()
        .default(null),
});

export default function ProfilePage() {
    const {author, getAuthorAction} = useAuthor();

    // useRef return về obj { current } | null  current sẽ là element mà ref
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const {register, handleSubmit, clearErrors, setValue, reset, formState: {errors}} = useForm<UpdateFormType>({
        mode: "all",
        defaultValues: {
            fullName: "",
            tagName: "",
            email: "",
            image: null,
        },
        resolver: yupResolver(schema),
    });

    const activeInputFile = () => {
        inputFileRef.current?.click(); // kích hoạt event click chọn file
    };

    const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Cập nhật vào react-hook-form
            setValue("image", e.target.files);

            // Cập nhật preview
            const localPreview = URL.createObjectURL(file);
            setPreviewImage(localPreview);
        }
    };

    const submit = handleSubmit(async (data) => {
        console.log(data);
        const form = new FormData();
        form.append("fullName", data.fullName);
        form.append("tagName", data.tagName);

        if (data.image && data.image[0]) {
            form.append("image", data.image[0]);
        }

        const response = await UpdateProfile(form);
        if (response.status === 200) {
            activeToast("Cập nhật thông tin thành công", {
                type: "success",
                description: "Thông tin tài khoản đã được cập nhật",
                duration: 5000
            })
            getAuthorAction();
        }
    });

    useEffect(() => {
        if (!author) {
            getAuthorAction()
        }
    }, [author, getAuthorAction]);

    // reset form && author.image -> previewImage
    useEffect(() => {
        if (author) {
            reset({
                fullName: author.fullName,
                tagName: author.tagName,
                email: author.email,
                image: null
            });
            setPreviewImage(author.image);
        }
    }, [author, reset]);

    // clean previewImage cũ
    useEffect(() => {
        return () => {
            if (previewImage && previewImage.startsWith("blob:")) {
                URL.revokeObjectURL(previewImage);
            }
        }
    }, [previewImage]);


    return (
        <form onSubmit={submit}>
            <div className={`flex flex-col space-y-20`}>
                {/*Content*/}
                <div className={`flex justify-between items-center`}>
                    <div className={`w-[65%] space-y-8`}>
                        {/* FullName */}
                        <div className={`w-full`}>
                            <div className={`w-full flex justify-between items-center`}>
                                <label
                                    htmlFor="fullName"
                                    className={`font-medium text-gray-500 text-right`}
                                >
                                    Tên tài khoản
                                </label>
                                <input
                                    id="fullName"
                                    type="text"
                                    {...register("fullName")}
                                    onChange={() => clearErrors("fullName")}
                                    className={`w-[65%] px-4 py-2 rounded-lg border focus:outline-none ring-inset ${
                                        errors.fullName
                                            ? "border-red-600"
                                            : "border-gray-300 focus:ring-1 focus:ring-[#0000CD]"
                                    } transition duration-200`}
                                />
                            </div>

                            {errors.fullName && (
                                <p className=" mt-2 ml-[35%] text-sm text-red-600">
                                    {errors.fullName.message}
                                </p>
                            )}
                        </div>

                        {/* Tag */}
                        <div className={`w-full`}>
                            <div className={`w-full flex justify-between items-center`}>
                                <label
                                    htmlFor="tag"
                                    className={`font-medium text-gray-500 text-right`}
                                >
                                    Mã định danh
                                </label>
                                <input
                                    id="tag"
                                    type="text"
                                    {...register("tagName")}
                                    onChange={() => clearErrors("tagName")}
                                    className={`w-[65%] px-4 py-2 rounded-lg border focus:outline-none ring-inset ${
                                        errors.tagName
                                            ? "border-red-600"
                                            : "border-gray-300 focus:ring-1 focus:ring-[#0000CD]"
                                    } transition duration-200`}
                                />
                            </div>

                            {errors.tagName && (
                                <p className="mt-2 ml-[35%] text-sm text-red-600">
                                    {errors.tagName.message}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className={`w-full`}>
                            <div className={`w-full flex justify-between items-center`}>
                                <label
                                    htmlFor="email"
                                    className={`font-medium text-gray-500 text-right`}
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    {...register("email")}
                                    onChange={() => clearErrors("email")}
                                    disabled
                                    title="Không thể thay đổi thông tin này"
                                    className={`w-[65%] bg-gray-100 px-4 py-2 rounded-lg border ring-inset ${errors.email ? "border-red-600" : "border-gray-300"} hover:cursor-not-allowed`}
                                />
                            </div>

                            {errors.email && (
                                <p className="mt-1 ml-[35%] text-sm text-red-600">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className={`w-[30%] border-l-2 flex justify-center items-center`}
                    >
                        <div
                            onClick={() => activeInputFile()}
                            className={`w-[80%] mx-auto flex flex-col items-center space-y-8`}
                        >
                            {previewImage ? (
                                <div
                                    className={`group relative w-28 h-28 aspect-square border-2 rounded-full overflow-hidden cursor-pointer`}>
                                    <Image
                                        src={previewImage}
                                        alt={`${author?.fullName} avatar` || "avatar"}
                                        fill
                                        sizes="160px"
                                        priority
                                        className={`object-cover`}
                                    />
                                    <div
                                        className={`absolute translate-y-28 z-10 w-full h-full group-hover:bg-gray-900/40 transition ease-in-out duration-300`}>
                                        <div className={`w-full mt-2 flex justify-center items-center`}>
                                            <Camera
                                                size={32}
                                                strokeWidth={1.5}
                                                className={`hidden group-hover:block`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className={`relative w-40 h-40 aspect-square rounded-full overflow-hidden cursor-pointer`}>
                                    <Image
                                        src={author?.image ? author.image : "/assets/icons/default-user.jpg"}
                                        alt={`${author?.fullName} avatar` || "avatar"}
                                        fill
                                        sizes="160px"
                                        priority
                                        className={`object-cover`}
                                    />
                                </div>
                            )}
                            <div>
                                <div
                                    onClick={() => activeInputFile()}
                                    className={`py-1 px-3 border rounded hover:cursor-pointer`}
                                >
                                    Chọn ảnh
                                </div>

                                <input
                                    ref={inputFileRef}
                                    type="file"
                                    accept={`image/*`}
                                    onChange={(e) => handleUploadFile(e)}
                                    className={`hidden`}
                                />
                            </div>
                            <p className={`text-sm text-center`}>
                                * Chỉ hỗ trợ ảnh dạng: .jpg, .png, .webp{" "}
                            </p>
                        </div>
                    </div>
                </div>

                {/*Submit Btn*/}
                <button type="submit" className={`w-20 h-10 py-1 px-2 border bg-red-500 hover:bg-white text-white hover:text-red-500 hover:border-red-500 rounded hover:cursor-pointer`}>
                    Lưu
                </button>
            </div>
        </form>
    );
}
