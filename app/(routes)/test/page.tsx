"use client";
import Link from "next/link";
import Image from "next/image";
import React, {useEffect, useRef, useState} from "react";
/* ---------------------------------------- Yup --------------------------------------------- */
import * as Yup from "yup";
/* ---------------------------------------- React hook form --------------------------------------------- */
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
/* ---------------------------------------- Types --------------------------------------------- */
import {UpdateFormType} from "@/types/Author";
/* ---------------------------------------- Constants --------------------------------------------- */
import {forbiddenWords} from "@/constants";
/* ---------------------------------------- Custom hooks --------------------------------------------- */
import {useAuthor} from "@/app/components/provider/authorContext.provider";
/* ---------------------------------------- Components --------------------------------------------- */
import {Bell, Settings, X} from "lucide-react";
import {UpdateProfile} from "@/app/services/api/account";
import {activeToast} from "@/utils/activeToast";

/* --------------------------------------------------------------------------------------- */
// const tabs = ["tài khoản", "thư viện ảnh", "bài viết", "bảo mật"];
const providers = {credentials: "Gmail", google: "Google", facebook: "Facebook"};
const schema = Yup.object().shape({
    firstName: Yup.string()
        .required("* Vui lòng nhập họ")
        .trim()
        .min(1, "* Họ cần tối thiểu 1 ký tự")
        .max(50, "* Họ tối đa 50 ký tự")
        .matches(/[A-Za-z0-9 ]/, "* Họ chỉ được chứa các ký tự ( A - Z, a - z và 0 - 9 ) ") // case các ký tự hợp lệ + không hợp lệ lỗi: abc$%# vẫn cho phép -> lỗi
        .test("Ban words", "* Phát hiện từ ngữ không hợp lệ !", (value) => {
            if (!value) return true; // để required() xử lý
            // nếu có từ cấm ->  return !true và trigger test() error ( ngược lại !false)
            return !forbiddenWords.some((word) =>
                value.toLowerCase().includes(word.toLowerCase())
            )
        }),
    lastName: Yup.string()
        .required("* Vui lòng nhập tên")
        .trim()
        .min(1, "* Tên tối thiểu 1 ký tự")
        .max(10, "* Tên tối đa 10 ký tự")
        .matches(/[A-Za-z0-9]/, "* Tên chỉ được chứa các ký tự ( A - Z, a - z và 0 - 9 )") // case các ký tự hợp lệ + không hợp lệ lỗi: abc$%# vẫn cho phép -> lỗi
        .test("Ban words", "* Phát hiện từ ngữ không hợp lệ !", (value) => {
            if (!value) return true; // để required() xử lý
            // nếu có từ cấm ->  return !true và trigger test() error ( ngược lại !false)
            return !forbiddenWords.some((word) =>
                value.toLowerCase().includes(word.toLowerCase())
            )
        }),
    tagName: Yup.string()
        .required("* Vui lòng nhập thẻ tên")
        .trim()
        .min(5, "* Thẻ tên tối thiểu 5 ký tự")
        .max(10, "* Thẻ tên tối đa 10 ký tự")
        .matches(
            /^[A-Za-z][A-Za-z0-9_]{4,9}$/,
            '* Thẻ tên có 10 ký tự bắt đầu bằng chữ cái và chí được chứa ( A - Z, a - z, 0 - 9 và "_" )'
        ),
    provider: Yup.string().required(),
    email: Yup.string()
        .required("* Vui lòng nhập email")
        .trim()
        .email("* Email không hợp lệ"),
    image: Yup.mixed<File>()
        .nullable()
        .default(null),
    description: Yup.string()
        .required("* Vui lòng nhập mô tả")
        .trim()
        .test("Ban words", "* Phát hiện từ ngữ không hợp lệ !", (value) => {
            return !forbiddenWords.some((word) => value?.toLowerCase().includes(word.toLowerCase()))
        })

});

export default function Test() {
    const {author, getAuthorAction} = useAuthor();
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [previewImage, setPreviewImage] = useState<{ file: File, temporaryPath: string } | null>(null);


    const maskingEmail = (email?: string) => {
        if (email) {
            const emailParts = email.split("@"); // [userName,domain]
            const show = emailParts[0].slice(0, 3); // ~ emailParts[0].slice(-emailParts[0].length,3)
            const hide = emailParts[0].slice(3);

            return `${show}${"*".repeat(hide.length)}@${emailParts[1]}`
        }
        return;
    }

    const {register, handleSubmit, clearErrors, setValue, reset, formState: {errors}} = useForm<UpdateFormType>({
        mode: "all",
        defaultValues: {
            firstName: author?.firstName,
            lastName: author?.lastName,
            tagName: author?.tagName,
            email: maskingEmail(author?.email),
            provider: providers[author?.provider as keyof typeof providers],
            image: null,
            description: author?.description
        },
        resolver: yupResolver(schema)
    })

    const triggerInputFile = () => {
        inputFileRef.current?.click();
    }

    const handleInputFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files?.length) {
            const file = files.item(0); // files[0]
            if (file) {
                setValue("image", file);
                setPreviewImage({file, temporaryPath: URL.createObjectURL(file)});
            }
        }
    }

    const cancelUpload = () => {
        if (previewImage) {
            URL.revokeObjectURL(previewImage.temporaryPath!);
        }
        setValue("image", null);
        setPreviewImage(null);
    }

    const submit = handleSubmit(async (data) => {
        const form = new FormData();

        form.append("firstName", data.firstName);
        form.append("lastName", data.lastName);
        form.append("tagName", data.tagName);
        form.append("description", data.description);

        if (data.image) {
            form.append("image", data.image);
        }

        const res = await UpdateProfile(form);

        let isSuccess = false;
        if (res.status_code === 200) isSuccess = true;

        activeToast(isSuccess ? "Cập nhật thông tin tài khoản thành công" : "Cập nhật thông tin tài khoản thất bại", {
            type: isSuccess ? "success" : "error",
            description: ""
        })

    });

    // clean url tạm trước đó nếu có
    useEffect(() => {
        return () => {
            if (previewImage) {
                URL.revokeObjectURL(previewImage.temporaryPath!)
            }
        }
    }, [previewImage]);

    useEffect(() => {
        if (author) {
            reset({
                firstName: author?.firstName,
                lastName: author?.lastName,
                tagName: author?.tagName,
                email: maskingEmail(author.email!),
                provider: providers[author?.provider as keyof typeof providers],
                image: null,
                description: author?.description
            })
        }
    }, [author, reset]);

    return (
        <section className={`xl:min-h-screen px-52 py-4`}>
            <div className={`tracking-widest flex flex-col gap-10`}>

                <div className={`flex justify-between items-start`}>

                    <div className={`flex pt-2.5 gap-6`}>
                        <div
                            className={`relative w-24 h-24 aspect-square rounded-full overflow-hidden border-2 shadow`}>
                            <Image
                                src={author?.image ? author.image : "/assets/icons/default-user.jpg "}
                                alt={`${author?.fullName} avatar`}
                                fill sizes={"96px"}
                                priority
                                className={`object-cover`}
                            />
                        </div>

                        <div className={`flex flex-col gap-6`}>

                            <div className={`tracking-wider`}>
                                <p className={`text-2xl font-semibold`}>{author?.fullName}</p>
                                <p className={`text-sm text-gray-500/50 font-semibold`}>@{author?.tagName}</p>
                            </div>

                            <div className={`flex gap-5`}>
                                <div className={`flex gap-6`}>
                                    <Link href="/account/tandat1223?tag=post">
                                        <p>105 Ảnh</p>
                                    </Link>
                                    <Link href="/account/tandat1223?tag=blog">
                                        <p>3 Bài viết</p>
                                    </Link>
                                </div>

                                <div className={`flex gap-2`}>
                                    {author?.achievements && author.achievements.length > 0 && (
                                        author?.achievements.map((a, index) => (
                                                <p key={index} title={a}>Icon{index + 1}</p>
                                            )
                                        )
                                    )}
                                </div>

                            </div>

                        </div>

                    </div>

                    {/*notification & setting & (date) & logout */}
                    <div className={`flex items-center gap-6`}>
                        <div
                            className={`group p-2.5 rounded-full transition-colors duration-300 hover:bg-rose-500/5 cursor-pointer`}>
                            <Bell size={28} strokeWidth={1.75} className={`group-hover:text-rose-500`}/>
                        </div>
                        <div
                            className={`group p-2.5 rounded-full transition-colors duration-300 hover:bg-blue-500/5 cursor-pointer`}>
                            <Settings size={28} strokeWidth={1.75} className={`group-hover:text-blue-500`}/>
                        </div>
                        <div className={`px-3 py-2.5 rounded-lg hover:bg-neutral-300/30 cursor-pointer`}>
                            <p>Đăng xuất</p>
                        </div>
                    </div>
                </div>

                {/*main content*/}
                <div className={`bg-white px-10 py-8 rounded-sm shadow-lg`}>
                    <form onSubmit={submit}>
                        <div className={`grid row-span-2 gap-10`}>

                            <div className={`grid xl:grid-cols-3 gap-x-10 gap-y-8`}>
                                {/*firstName*/}
                                <div>
                                    <label htmlFor="firstName"
                                           className={`block text-gray-700 font-medium mb-2`}>Họ</label>
                                    <input
                                        id="firstName"
                                        spellCheck={false}
                                        type="text"
                                        {...register("firstName")}
                                        onChange={() => clearErrors("firstName")}
                                        className={`w-full text-gray-500 px-4 py-2.5 border rounded-sm focus:outline-none ring-inset 
                                        ${errors.firstName
                                            ? "border-red-500"
                                            : "border-gray-300 focus:ring-1 focus:ring-[#00009C]"
                                        } transition duration-300`}
                                    />
                                    {errors.firstName && (
                                        <p className={`mt-1 text-sm text-red-500`}>{errors.firstName.message}</p>
                                    )}
                                </div>

                                {/*lastName*/}
                                <div>
                                    <label htmlFor="lastName"
                                           className={`block text-gray-700 font-medium mb-2`}>Tên</label>
                                    <input
                                        id="lastName"
                                        spellCheck={false}
                                        type="text"
                                        {...register("lastName")}
                                        onChange={() => clearErrors("lastName")}
                                        className={`w-full text-gray-500 px-4 py-2 border rounded-sm focus:outline-none ring-inset 
                                        ${errors.lastName
                                            ? "border-red-500"
                                            : "border-gray-300 focus:ring-1 focus:ring-[#00009C]"
                                        } transition duration-300`}
                                    />
                                    {errors.lastName && (
                                        <p className={`mt-1 text-sm text-red-500`}>{errors.lastName.message}</p>
                                    )}
                                </div>

                                {/*tagName*/}
                                <div>
                                    <label className={`block text-gray-700 font-medium mb-2`}>Thẻ tên</label>
                                    <input
                                        type="text"
                                        spellCheck={false}
                                        {...register("tagName")}
                                        onChange={() => clearErrors("tagName")}
                                        className={`w-full text-gray-500 px-4 py-2 border rounded-sm focus:outline-none ring-inset 
                                        ${errors.tagName
                                            ? "border-red-500"
                                            : "border-gray-300 focus:ring-1 focus:ring-[#00009C]"
                                        } transition duration-300`}
                                    />
                                    {errors.tagName && (
                                        <p className={`mt-1 text-sm text-red-500`}>{errors.tagName.message}</p>
                                    )}
                                </div>

                                {/*provider*/}
                                <div>
                                    <label className={`block text-gray-700 font-medium mb-2`}>
                                        Phương thức đăng nhập
                                    </label>
                                    <input
                                        type="text"
                                        spellCheck={false}
                                        disabled
                                        {...register("provider")}
                                        onChange={() => clearErrors("provider")}
                                        className={`w-full text-gray-500 px-4 py-2 border rounded-sm focus:outline-none ring-inset 
                                            ${errors.provider
                                            ? "border-red-500"
                                            : "border-gray-300 focus:ring-1 focus:ring-[#00009C]"
                                        } transition duration-300 cursor-not-allowed`}
                                    />
                                    {errors.provider && (
                                        <p className={`mt-1 text-sm text-red-500`}>{errors.provider.message}</p>
                                    )}
                                </div>

                                {/*email*/}
                                <div>
                                    <label className={`block text-gray-700 font-medium mb-2`}>Email</label>
                                    <input
                                        type="text"
                                        {...register("email")}
                                        readOnly
                                        disabled
                                        className={`w-full text-gray-500 px-4 py-2 border rounded-sm focus:outline-none ring-inset 
                                            ${errors.email
                                            ? "border-red-500"
                                            : "border-gray-300 focus:ring-1 focus:ring-[#00009C]"
                                        } transition duration-300 cursor-not-allowed`}
                                    />
                                    {errors.email && (
                                        <p className={`mt-1 text-sm text-red-500`}>{errors.email.message}</p>
                                    )}
                                </div>

                                {/*description*/}
                                <div className={`col-span-3`}>
                                    <label className={`block text-gray-700 font-medium mb-2`}>Mô tả bản thân</label>
                                    <textarea
                                        spellCheck={false}
                                        {...register("description")}
                                        className={`w-full h-32 text-gray-500 px-4 py-2 border rounded-sm focus:outline-none ring-inset 
                                        ${errors.description
                                            ? "border-red-500"
                                            : "border-gray-300 focus:ring-1 focus:ring-[#00009C]"
                                        } transition duration-300`}
                                    />
                                    {errors.description && (
                                        <p className={`mt-1 text-sm text-red-500`}>{errors.description.message}</p>
                                    )}
                                </div>

                                {/*image*/}
                                <div className={`col-span-2`}>
                                    {/*hidden input file*/}
                                    <input
                                        ref={inputFileRef}
                                        type="file"
                                        onChange={(e) => handleInputFileUpload(e)}
                                        className={`hidden`}
                                    />

                                    {/*preview image*/}
                                    {previewImage && (
                                        <div className={`relative mb-3`}>
                                            <div className={`w-28 flex flex-col justify-center items-center gap-2`}>
                                                <div className={`relative w-28 h-28 aspect-square rounded-sm overflow-hidden 
                                                    shadow-lg`}>
                                                    <Image
                                                        src={previewImage.temporaryPath!}
                                                        alt={`anh`}
                                                        fill
                                                        sizes={`112px`}
                                                        className={`object-cover`}
                                                    />
                                                </div>
                                                <p className={`text-sm text-gray-500`}>{previewImage.file.name}</p>
                                            </div>


                                            <div
                                                title={"Xóa ảnh"}
                                                onClick={() => cancelUpload()}
                                                className={`absolute -top-2 left-[102px] z-10 w-5 h-5 bg-gray-500/50 hover:bg-gray-500/80 
                                                rounded-full flex justify-center items-center cursor-pointer`}>
                                                <X size={12} color="#fff"/>
                                            </div>
                                        </div>
                                    )}
                                    {/*trigger btn*/}
                                    <button
                                        type={"button"}
                                        onClick={() => triggerInputFile()}
                                        className={`px-4 py-2.5 bg-gray-200 rounded`}
                                    >
                                        Tải ảnh lên
                                    </button>


                                </div>
                            </div>

                            <div className={`mt-10`}>
                                <button
                                    type={"submit"}
                                    className={`px-4 py-1.5 bg-blue-600 text-white rounded cursor-pointer`}
                                >
                                    Lưu
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>

        </section>
    )
}

