"use client";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";

import Image from "next/image";
import PostCard from "@/components/build/Post/PostCard";
import {
    AArrowDown,
    AArrowUp,
    ArrowDownWideNarrow,
    ArrowUpWideNarrow,
    Calendar,
    ChevronUp,
    Eye,
    Info,
    Plus,
    Search,
    X
} from 'lucide-react';
import {ChangeEvent, SyntheticEvent, useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {getCurrentYear} from "@/utils/date";
import type {Post} from "@/types/Post";
import type {PostForm} from "@/types/Form";
import {CreatePost, GetALlPost} from "@/services/api/post";
import {activeToast} from "@/utils/activeToast";
import {useAuthor} from "@/components/provider/authorContext.provider";
import Pagination from "@/components/build/Pagination";
import {postSchema} from "@/types/Yup.Schema";

const category = [
    {mainCategory: "Thiên nhiên", subCategory: ["Biển", "Núi", "Mây", "Trời", "Xa mạc", "Băng tuyết", "Lốc xoáy"]},
    {mainCategory: "Con người", subCategory: ["Selfie", "Chân dung"]},
    {mainCategory: "Động vật", subCategory: ["Hổ", "Mèo", "Chó", "Gà", "Vịt", "Trâu", "Bò"]},
    {mainCategory: "Bánh", subCategory: ["1", "2", "3", "4"]},
    {mainCategory: "Âm nhạc", subCategory: ["5", "6", "7", "8", "9", "10"]},

]
const filtering = [
    {label: "Mới nhất", icon: <ArrowUpWideNarrow size={20} strokeWidth={1.75}/>},
    {label: "Cũ nhất", icon: <ArrowDownWideNarrow size={20} strokeWidth={1.75}/>},
    {label: "Tăng dần", icon: <AArrowUp size={20} strokeWidth={1.75}/>},
    {label: "Giảm dần", icon: <AArrowDown size={20} strokeWidth={1.75}/>},
    {label: "Lượt xem nhiều nhất", icon: <Eye size={20} strokeWidth={1.75}/>}
];
const years = [
    {label: "2018", icon: <Calendar size={20} strokeWidth={1.75}/>},
    {label: "2019", icon: <Calendar size={20} strokeWidth={1.75}/>},
    {label: "2020", icon: <Calendar size={20} strokeWidth={1.75}/>},
    {label: "2021", icon: <Calendar size={20} strokeWidth={1.75}/>},
    {label: "2022", icon: <Calendar size={20} strokeWidth={1.75}/>},
    {label: "2023", icon: <Calendar size={20} strokeWidth={1.75}/>},
    {label: "2024", icon: <Calendar size={20} strokeWidth={1.75}/>},
    {label: "2025", icon: <Calendar size={20} strokeWidth={1.75}/>}
].reverse();

interface FilterDropdown {
    sortModal: boolean,
    yearModal: boolean,
    categoryModal: boolean,
    selectedCategory: string[],
    selectedSortType: string,
    selectedYear: string
}

interface PreviewImagesPost {
    files: { file: File, temporaryPath: string }[]
}


// lưu lại giá trị lọc của user như sort / year / category vào localStorage
export default function Posts() {
    const router = useRouter();
    const inputFiles = useRef<HTMLInputElement>(null);
    const [modalState, setModalState] = useState(false);
    const [filter, setFilter] = useState<FilterDropdown>({
        sortModal: false,
        yearModal: false,
        categoryModal: false,
        selectedCategory: [],
        selectedSortType: "Mới nhất",
        selectedYear: String(getCurrentYear())
    });
    const [previewImages, setPreviewImages] = useState<PreviewImagesPost>({files: []});
    const [posts, setPosts] = useState<Post[] | []>([]);

    const {author} = useAuthor();

    const {register, handleSubmit, clearErrors, setValue, formState: {errors}} = useForm<PostForm>({
        resolver: yupResolver(postSchema),
        defaultValues: {
            authorId: author?._id ?? "",
            title: "",
            caption: null,
            hashtags: null,
            files: null
        }
    })

    const submit = handleSubmit(async (data) => {
        const formData = new FormData();

        if (!data.authorId || data.files !== null && data.files.length <= 0) {
            console.log("Đã trigger")
            return;
        }

        if (data.caption) {
            formData.append("caption", data.caption);
        }
        formData.append("authorId", data.authorId);
        formData.append("title", data.title);
        Array.from(data.files as FileList).forEach(file => formData.append("files", file))

        const res = await CreatePost(formData);
        const success = res.status_code === 200;

        activeToast(success ? "Đăng tải bài viết thành công" : "Đăng tải bài viết thất bại", {
            type: success ? "success" : "error",
            description: res.message
        })
    })
    /* Khai báo type cho event ( phụ thuộc vào element xài )
        * React.MouseEvent<HTMLButtonElement> - Button
        *React.MouseEvent<HTMLDivElement> - Div / li
        * Nếu không chắc là event của thẻ nào thì dùng React.SyntheticEvent ( dùng cho tất cả event trong React )
    */
    const handleFilter = (e: SyntheticEvent, type: string, value: string) => {
        switch (type) {
            case "category": {
                e.stopPropagation();
                setFilter(prev => ({
                    ...prev,
                    selectedCategory:
                        prev.selectedCategory.includes(value)
                            ? prev.selectedCategory.filter(i => i !== value)
                            : [...prev.selectedCategory, value]
                }));
                break;
            }
            case "sort": {
                e.stopPropagation();
                setFilter(prev => ({
                    ...prev,
                    sortModal: false,
                    selectedSortType: value
                }));
                break;
            }
            case "year": {
                e.stopPropagation();
                setFilter(prev => ({
                    ...prev,
                    yearModal: false,
                    selectedYear: value
                }));
                break;
            }
            case "closeCategoryModal": {
                setFilter(prev => ({
                    ...prev,
                    categoryModal: !prev.categoryModal,
                    sortModal: false,
                    yearModal: false
                }));
                break;
            }
            case "closeSortModal": {
                setFilter(prev => ({
                    ...prev,
                    categoryModal: false,
                    sortModal: !prev.sortModal,
                    yearModal: false
                }));
                break;
            }
            case "closeYearModal": {
                setFilter(prev => ({
                    ...prev,
                    categoryModal: false,
                    sortModal: false,
                    yearModal: !prev.yearModal
                }));
                break;
            }
            default: {
                setFilter(prev => ({...prev}));
                break;
            }
        }
    }

    // Xử lý file tải lên ở đây
    const handleTriggerInput = () => {
        inputFiles.current?.click();
    }
    const handleUploadFiles = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) {
            return;
        }

        // convert FileList -> Array do không duyệt trực tiếp FileList như Array được
        const convertFileListToArray = Array.from(files);
        const newArray = convertFileListToArray.map(file => {
            return {file, temporaryPath: URL.createObjectURL(file)}
        })

        setValue("files", files);

        // clean url cũ
        previewImages.files?.forEach(cFile => URL.revokeObjectURL(cFile.temporaryPath!));
        setPreviewImages({files: newArray});
    }

    useEffect(() => {
        const getAllPost = async () => {
            const res = await GetALlPost();
            if (res.status_code === 200) {
                setPosts(res.data);
            }
        }
        getAllPost();
    }, []);
    const handleRemoveImageBlob = (cFile: { file: File, temporaryPath: string }) => {
        URL.revokeObjectURL(cFile.temporaryPath);
        setPreviewImages(prev => ({
            files: prev.files.filter(file => file.file.name !== cFile.file.name)
        }));
        return;
    }

    // handle khi mount chưa load author
    useEffect(() => {
        if (author) {
            setValue("authorId", author._id)
        }
    }, [author, setValue]);

    return (
        <>
            <section>
                <div className="min-h-screen bg-white flex justify-between px-8">
                    <div className="w-full px-6 py-8">
                        {/*Search / sort */}
                        <div className={`flex justify-between items-center`}>
                            <div className={`w-[80%] flex items-center gap-x-4`}>
                                {/*Search*/}
                                <div className={`relative w-[40%] my-4 border-2 rounded `}>
                                    <input type="text" spellCheck={false} placeholder={'Tìm kiếm...'}
                                           className={`w-[90%] text-ellipsis px-2.5 py-2 focus:outline-none rounded-lg`}/>
                                    <Search size={20} color={'gray'} strokeWidth={1.75}
                                            className={`absolute top-1/2 -translate-y-1/2 right-3 z-10`}/>
                                </div>

                                {/*Category*/}
                                <div onClick={(e) => handleFilter(e, "closeCategoryModal", "none")}
                                     className={`relative w-[17%] text-sm cursor-pointer`}>
                                    <div className={`px-3 py-2 border-2 rounded flex justify-between items-center`}>
                                        <div>
                                            {filter.selectedCategory.length > 0 ? `Đã lọc ${filter.selectedCategory?.length} mục` : `Lọc nâng cao`}
                                        </div>
                                        <ChevronUp size={20} strokeWidth={1.75}
                                                   className={`${filter.categoryModal ? "rotate-180" : "rotate-0"} duration-500`}/>
                                    </div>
                                    <div
                                        className={`absolute ${filter.categoryModal ? "block" : "hidden"} top-12 left-0 z-10 bg-white shadow border w-[500px] max-h-[360px] scrollbar-hide overflow-y-scroll overflow-hidden px-2 py-4 rounded`}>
                                        {category.map(c => (
                                            <div key={c.mainCategory} className={`px-3 py-2`}>
                                                <div className={`font-semibold flex items-center`}>
                                                    <div className={`w-[20%]`}>
                                                        {c.mainCategory}
                                                    </div>
                                                    <div className={`w-[70%] border-solid border-t-[2px]`}></div>
                                                </div>
                                                <ul className={`grid grid-cols-3 gap-x-2 gap-y-3 mt-3`}>
                                                    {c.subCategory.map(i => (
                                                        <li
                                                            key={i}
                                                            onClick={e => e.stopPropagation()}
                                                            className={`group flex items-center gap-x-1.5`}>
                                                            <input
                                                                id={i}
                                                                type="checkbox"
                                                                onClick={(e) => handleFilter(e, "category", i)}

                                                                className={`w-4 h-4 cursor-pointer`}
                                                            />
                                                            <label htmlFor={i} onClick={(e) => {
                                                                e.stopPropagation();
                                                            }} className={`cursor-pointer`}>{i}</label>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/*Sort*/}
                                <div onClick={(e) => handleFilter(e, "closeSortModal", "none")}
                                     className={`relative w-[17%] text-sm cursor-pointer`}>
                                    <div className={`px-3 py-2 border-2 rounded flex justify-between items-center`}>
                                        <div>{filter.selectedSortType}</div>
                                        <ChevronUp size={20} strokeWidth={1.75}
                                                   className={`${filter.sortModal ? "rotate-180" : "rotate-0"} duration-500`}/>
                                    </div>
                                    <div
                                        className={`absolute ${filter.sortModal ? "block" : "hidden"} top-12 left-0 z-10 bg-white shadow border w-60 px-2 py-4 rounded`}>
                                        <ul className={`space-y-3`}>
                                            {filtering.map(f => (
                                                <li
                                                    key={f.label}
                                                    onClick={e => handleFilter(e, "sort", f.label)}
                                                    className={`px-3 py-2 rounded hover:bg-gray-200 flex justify-between items-center`}
                                                >
                                                    <span>{f.label}</span>
                                                    <span>{f.icon}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/*Year*/}
                                <div onClick={(e) => handleFilter(e, "closeYearModal", "none")}
                                     className={`relative w-[12%] text-sm cursor-pointer`}>
                                    <div className={`px-3 py-2 border-2 rounded flex justify-between items-center`}>
                                        <div>Năm {filter.selectedYear}</div>
                                        <ChevronUp size={20} strokeWidth={1.75}
                                                   className={`${filter.yearModal ? "rotate-180" : "rotate-0"} duration-500`}/>
                                    </div>
                                    <div
                                        className={`absolute ${filter.yearModal ? "block" : "hidden"} top-12 left-0 z-10 bg-white shadow border w-60 max-h-64 scrollbar-hide overflow-y-scroll overflow-hidden px-2 py-4 rounded`}>
                                        <ul className={`space-y-3`}>
                                            {years.map(year => (
                                                <li
                                                    key={year.label}
                                                    onClick={(e) => handleFilter(e, "year", year.label)}
                                                    className={`px-3 py-2 rounded hover:bg-gray-200 flex justify-between items-center`}
                                                >
                                                    <div className={`inline`}>
                                                        <span>{year.label}</span>
                                                        {year.label === filter.selectedYear && (
                                                            <span className={` ml-3`}>Hiện tại</span>
                                                        )}
                                                    </div>
                                                    <span>{year.icon}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {author ? (
                                <button onClick={() => setModalState(!modalState)}
                                        className={`w-[10%] px-3 py-2 bg-teal-500 flex items-center gap-x-3 text-white rounded cursor-pointer`}>
                                    <span><Plus size={20} strokeWidth={1.75}/></span>
                                    <span className={`text-sm`}>Đăng ảnh</span>
                                </ button>
                            ) : (
                                <button onClick={() => router.push("/account/login")}
                                        className={`w-[10%] px-3 py-2 bg-teal-500 flex items-center gap-x-3 text-white rounded cursor-pointer`}>
                                    <span><Plus size={20} strokeWidth={1.75}/></span>
                                    <span className={`text-sm`}>Đăng ảnh</span>
                                </ button>
                            )}

                        </div>

                        {/*Photo*/}
                        <div className="grid grid-cols-4 gap-6">
                            {/* Cột 1 - Pattern: tall, short, tall, short, tall */}
                            <div className="flex flex-col gap-6">
                                <PostCard post={posts.slice(0, 5)[0]} variant="tall"/>
                                <PostCard post={posts?.slice(0, 5)[1]} variant="short"/>
                                <PostCard post={posts?.slice(0, 5)[2]} variant="tall"/>
                                <PostCard post={posts?.slice(0, 5)[3]} variant="short"/>
                                <PostCard post={posts?.slice(0, 5)[4]} variant="tall"/>
                            </div>

                            {/* Cột 2 - Pattern: short, tall, short, tall, short */}
                            <div className="flex flex-col gap-6">
                                <PostCard post={posts?.slice(5, 10)[0]} variant="short"/>
                                <PostCard post={posts?.slice(5, 10)[1]} variant="tall"/>
                                <PostCard post={posts?.slice(5, 10)[2]} variant="short"/>
                                <PostCard post={posts?.slice(5, 10)[3]} variant="tall"/>
                                <PostCard post={posts?.slice(5, 10)[4]} variant="short"/>
                            </div>

                            {/*Cột 3 - Pattern giống Cột 1: tall, short, tall, short, tall*/}
                            <div className="flex flex-col gap-6">
                                <PostCard post={posts?.slice(10, 15)[0]} variant="tall"/>
                                <PostCard post={posts?.slice(10, 15)[1]} variant="short"/>
                                <PostCard post={posts?.slice(10, 15)[2]} variant="tall"/>
                                <PostCard post={posts?.slice(10, 15)[3]} variant="short"/>
                                <PostCard post={posts?.slice(10, 15)[4]} variant="tall"/>
                            </div>

                            {/*Cột 4 - Pattern giống Cột 2: short, tall, short, tall, short*/}
                            <div className="flex flex-col gap-6">
                                <PostCard post={posts?.slice(15, 20)[0]} variant="short"/>
                                <PostCard post={posts?.slice(15, 20)[1]} variant="tall"/>
                                <PostCard post={posts?.slice(15, 20)[2]} variant="short"/>
                                <PostCard post={posts?.slice(15, 20)[3]} variant="tall"/>
                                <PostCard post={posts?.slice(15, 20)[4]} variant="short"/>
                            </div>
                        </div>

                        {/*Pagination*/}
                        {posts.length >= 20 && (
                            <Pagination items={posts}/>
                        )}
                    </div>
                </div>
            </section>

            {/*Upload file modal*/}
            {/*Cần show modal đăng nhập khi người dùng muốn tải ảnh lên mà chưa đăng nhập*/}
            {modalState && (
                <div
                    className={`fixed inset-0 z-50 w-full p-6 flex items-start justify-center`}>
                    {/* Overlay full-screen */}
                    <div
                        className="absolute inset-0 -z-10 bg-black/40"
                        onClick={() => setModalState(false)}
                    />

                    {/* Modal content */}
                    <div
                        className="realative z-10 w-full max-w-[50%] max-h-[90vh] overflow-y-scroll scrollbar-hide bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-lg text-center font-semibold my-3">Đăng tải ảnh</h3>

                        <form onSubmit={submit}>
                            <div className={`flex flex-col space-y-5`}>
                                <div>
                                    <label htmlFor={`title-image`} className={`block mb-1`}>
                                        Tiêu đề
                                        <span className={`text-lg text-red-500 ml-1`}>*</span>
                                    </label>
                                    <input
                                        id={`title`}
                                        type="text"
                                        spellCheck={false}
                                        {...register("title")}
                                        onChange={() => clearErrors("title")}
                                        className={`w-full px-2.5 py-2 border rounded`}/>

                                    {errors.title && (
                                        <div className={`mt-1 text-sm text-red-500`}>{errors.title.message}</div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor={`hashtags`} className={`mb-1 block`}>
                                        Hashtag
                                        <span><Info size={14} color={"blue"} strokeWidth={1.75}/></span>
                                    </label>
                                    <input
                                        id={`hashtags`}
                                        type="text"
                                        spellCheck={false}
                                        {...register("hashtags")}
                                        onChange={() => clearErrors("hashtags")}
                                        className={`w-full min-h-10 px-2.5 py-2 border rounded`}/>

                                    {errors.hashtags && (
                                        <div className={`mt-1 text-sm text-red-500`}>{errors.hashtags.message}</div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor={`caption-image`} className={`block mb-1`}>Mô tả</label>
                                    <textarea
                                        id={`caption-image`}
                                        spellCheck={false}
                                        {...register("caption")}
                                        onChange={() => clearErrors("caption")}
                                        className={`w-full min-h-32 px-2.5 py-2 border rounded`}/>

                                    {errors.caption && (
                                        <div className={`mt-1 text-sm text-red-500`}>{errors.caption.message}</div>
                                    )}
                                </div>

                                <button
                                    type={`button`}
                                    onClick={() => handleTriggerInput()}
                                    className={`w-[24%] px-2.5 py-2 bg-gray-400 text-white rounded cursor-pointer`}>
                                    {previewImages.files.length > 0 ? `Đã tải lên ${previewImages.files.length} ảnh` : `Tải ảnh`}
                                </button>


                                {/*Show ảnh vừa tải lên*/}
                                {previewImages.files.length > 0 && (
                                    <div>
                                        <div className={`mt-3 flex gap-3`}>
                                            {previewImages.files.map(cFile => (
                                                <div
                                                    key={cFile.file.name}
                                                    className={`relative`}
                                                    title={`Xóa ảnh ${cFile.file.name} ?`}
                                                >
                                                    <Image
                                                        src={cFile.temporaryPath}
                                                        alt={"ảnh"}
                                                        width={100}
                                                        height={100}
                                                        className={`border shadow rounded`}
                                                    />
                                                    <div
                                                        onClick={() => handleRemoveImageBlob(cFile)}
                                                        className={`absolute z-60 -right-1.5 -top-2 w-5 h-5 bg-red-500 p-1
                                                     rounded-full flex justify-center items-center cursor-pointer`}>
                                                        <X
                                                            size={20}
                                                            strokeWidth={1.75}
                                                            color={`white`}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <input
                                    ref={inputFiles}
                                    type="file"
                                    multiple
                                    accept={`image/*`}
                                    onChange={(e) => handleUploadFiles(e)}
                                    className="hidden"/>

                                <button type="submit"
                                        className={`bg-gray-100 px-4 py-2 text-gray-600 rounded cursor-pointer`}>
                                    Đăng tải
                                </button>
                                <button type="button" onClick={() => setModalState(false)}
                                        className="bg-gray-100 px-4 py-2 text-gray-600 rounded">
                                    Hủy
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}