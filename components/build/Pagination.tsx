import React, {useEffect, useMemo, useState} from "react";
import {ChevronLeft, ChevronsLeft} from 'lucide-react';
import type {PaginationAction, PaginationProps} from "@/types/Types";

const imagePerPage = 20;


export default function Pagination({items, ...props}: PaginationProps) {
    const totalPages = useMemo(() => {
        return Math.ceil(items.length / imagePerPage);
    }, [items])
    const [currentPage, setCurrentPage] = useState(1);
    const [animatedPage, setAnimatedPage] = useState(1);

    useEffect(() => {
        const startValue = animatedPage;
        const endValue = currentPage;
        const startTime = performance.now();
        const diff = Math.abs(startValue - endValue);
        const duration = diff < 1 ? 100 : 1000;

        let raf: number;

        function update(t: number) {
            const progress = Math.min((t - startTime) / duration, 1);

            const val = Math.floor(
                startValue + (endValue - startValue) * progress
            );

            setAnimatedPage(val);

            if (progress < 1) {
                raf = requestAnimationFrame(update);
            }
        }

        raf = requestAnimationFrame(update);

        return () => cancelAnimationFrame(raf);
    }, [currentPage,animatedPage]);

    const handleChangePage = (options: PaginationAction) => {
        switch (options.type) {
            case "first": {
                if (currentPage === 1) break;
                setCurrentPage(1);
                break;
            }
            case "next": {
                if (currentPage === totalPages) break;
                setCurrentPage(prev => prev + 1);
                break;
            }
            case "previous": {
                if (currentPage === 1) break;
                setCurrentPage(prev => prev - 1);
                break;
            }
            case "last": {
                if (currentPage === totalPages) break;
                setCurrentPage(totalPages);
                break;
            }
            default: {
                if (!options.value) break;
                if (options.value < 1 || options.value > totalPages) {
                    alert(`Chỉ được chọn từ trang 1 đến trang ${totalPages}`);
                    break;
                }
                setCurrentPage(options.value);
                break;
            }
        }
    }

    return <div
        {...props}
        className={`my-16 flex justify-center items-center gap-14`}>
        <div className={`flex gap-6`}>
            <div
                title={currentPage === 1 ? "Hiện tại không thể sử dụng chức năng này" : "Trang đầu tiên"}
                onClick={() => handleChangePage({type: "first"})}
                className={`p-2 rounded-full flex justify-center items-center 
                                     ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-500/20 cursor-pointer"}`}>
                <ChevronsLeft size={24} strokeWidth={1.75}/>
            </div>
            <div
                title={currentPage === 1 ? "Hiện tại không thể sử dụng chức năng này" : "Trang trước"}
                onClick={() => handleChangePage({type: "previous"})}
                className={`p-2 rounded-full flex justify-center items-center 
                                     ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-500/20 cursor-pointer"}`}
            >
                <ChevronLeft size={24} strokeWidth={1.75}/>
            </div>
        </div>

        {/* Hiển thị animatedPage */}
        <div className={`w-32`}>
            <div className={`w-full py-0.5 inline-flex justify-center items-center gap-4`}>
                <input
                    type="number"
                    value={animatedPage}
                    onChange={(e) => handleChangePage({value: Number(e.target.value)})}
                    className={`w-5 text-center focus:border-b border-black focus:outline-none`}
                />
                <span>/</span>
                <span className={`w-5`}>{totalPages}</span>
            </div>
        </div>

        <div className={`flex gap-6`}>
            <div
                title={currentPage === totalPages ? "Hiện tại không thể sử dụng chức năng này" : "Trang kế tiếp"}
                onClick={() => handleChangePage({type: "next"})}
                className={`p-2 rounded-full flex justify-center items-center
                              ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-500/20 cursor-pointer"}`}
            >
                <ChevronLeft
                    size={24}
                    strokeWidth={1.75}
                    className={`rotate-180`}
                />
            </div>
            <div title={currentPage === totalPages ? "Hiện tại không thể sử dụng chức năng này" : "Trang cuối cùng"}
                 onClick={() => handleChangePage({type: "last"})}
                 className={`p-2 rounded-full flex justify-center items-center 
                              ${currentPage === totalPages ?
                     "opacity-50 cursor-not-allowed"
                     :
                     "hover:bg-gray-500/20  cursor-pointer"}
                              `}
            >
                <ChevronsLeft
                    size={24}
                    strokeWidth={1.75}
                    className={`rotate-180`}
                />
            </div>
        </div>
    </div>
}
