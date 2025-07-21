"use client";
import Image from "next/image";
import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
// import {useSelector} from "react-redux";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import type {Author} from "@/types/Author";
// import type {ReduxAccount} from "@/types/Redux";
import {GetUserInfo, UpdateProfile} from "@/app/services/api/account";
import {setToast} from "@/utils/activeToast";
import {CircleCheck, TriangleAlert} from "lucide-react";
// import {getCookieCSR} from "@/utils/cookie";
import {sleep} from "@/utils/delay";

type ProfileForm = {
    fullName: string;
    tag: string;
    email: string;
    image: FileList | null;
};

const schema = Yup.object().shape({
    fullName: Yup.string()
        .required("* Vui lòng không để trống thông tin này")
        .trim()
        .max(50, "* Tên tài khoản tối đa 50 kí tự")
        .matches(/^[A-Za-z0-9 ]/, `* Tên tài khoản chỉ được gồm chữ cái hoặc số`),
    tag: Yup.string()
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
    const router = useRouter();
    // useRef return về obj { current } | null  current sẽ là element mà ref
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [author, setAuthor] = useState<Author | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const {register, handleSubmit, clearErrors, setValue, reset, formState: {errors}} = useForm<ProfileForm>({
        mode: "all",
        defaultValues: {
            fullName: "",
            tag: "",
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
            console.log({localPreview});
            setPreviewImage(localPreview);
        }
    };

    const submit = handleSubmit(async (data) => {
        const form = new FormData();
        form.append("fullName", data.fullName);
        form.append("tag", data.tag);

        if (data.image && data.image[0]) {
            form.append("image", data.image[0]);
        }
        const response = await UpdateProfile(form);
        if (response.status === 200) {
            setToast("Cập nhật thông tin thành công", {
                icon: <CircleCheck className={`text-green-500`}/>,
                duration: 2000
            });
        }
    });

    // getAuthor
    useEffect(() => {
        const getAuthorInfo = async () => {
            const response = await GetUserInfo();
            console.log({response});
            if (response.status === 200) {
                setAuthor(response.data);
                return;
            }

            setToast("Phiên đăng nhập hết hạn", {
                icon: <TriangleAlert className={`text-red-500`}/>,
                description: "Bạn đang được chuyển hướng về trang đăng nhập",
                duration: 2000
            })
            await sleep(2000);
            router.push("/account/login");
        }
        getAuthorInfo();
    }, [router])

    // reset form && author.image -> previewImage
    useEffect(() => {
        if (author) {
            reset({
                fullName: author.fullName,
                tag: author.tag,
                email: author.email,
                image: null
            });
            setPreviewImage(author.image);
        }
    }, [author, reset]);

    // remove unused url imgae
    // useEffect(() => {
    //
    //     return () => {
    //         previewImage && URL.revokeObjectURL(previewImage);
    //     }
    //
    // }, [watch, previewImage]);

    return (
        <>
            <div className={`w-full py-8 px-8`}>
                <form onSubmit={submit}>
                    <div className={`flex flex-col gap-28`}>
                        {/*Content*/}
                        <div className={`flex justify-between items-center `}>
                            <div className={`w-[65%] space-y-8`}>
                                {/* FullName */}
                                <div className={`w-full`}>
                                    <div className={`w-full flex justify-between items-center`}>
                                        <label
                                            htmlFor="fullName"
                                            className={`font-medium text-gray-700 text-right`}
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
                                            className={`font-medium text-gray-700 text-right`}
                                        >
                                            Mã định danh
                                        </label>
                                        <input
                                            id="tag"
                                            type="text"
                                            {...register("tag")}
                                            onChange={() => clearErrors("tag")}
                                            className={`w-[65%] px-4 py-2 rounded-lg border focus:outline-none ring-inset ${
                                                errors.tag
                                                    ? "border-red-600"
                                                    : "border-gray-300 focus:ring-1 focus:ring-[#0000CD]"
                                            } transition duration-200`}
                                        />
                                    </div>

                                    {errors.tag && (
                                        <p className="mt-2 ml-[35%] text-sm text-red-600">
                                            {errors.tag.message}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className={`w-full`}>
                                    <div className={`w-full flex justify-between items-center`}>
                                        <label
                                            htmlFor="email"
                                            className={`font-medium text-gray-700 text-right`}
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

                            <div
                                className={`w-[30%] border-l-2 flex justify-center items-center`}
                            >
                                <div
                                    className={`w-[80%] mx-auto flex flex-col items-center space-y-8`}
                                >
                                    {previewImage ? (
                                        <Image
                                            src={previewImage}
                                            alt={`${author?.fullName} avatar` || "avatar"}
                                            width={120}
                                            height={160}
                                            priority
                                            onClick={() => activeInputFile()}
                                            className={`border rounded-full hover:cursor-pointer`}
                                        />
                                    ) : (
                                        <Image
                                            src="/assets/icons/default-user.jpg"
                                            alt={`${author?.fullName} avatar` || "avatar"}
                                            width={120}
                                            height={160}
                                            priority
                                            onClick={() => activeInputFile()}
                                            className={`border rounded-full hover:cursor-pointer`}
                                        />
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
                        <button
                            type="submit"
                            className={`w-20 h-10 py-1 px-2 border bg-red-500 hover:bg-white text-white hover:text-red-500 hover:border-red-500 rounded hover:cursor-pointer`}
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
