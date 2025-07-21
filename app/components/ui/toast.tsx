"use client";
import {useEffect} from "react";
import type Toast from "@/types/Toast";

// interface Toast {
//     icon: React.ReactNode;
//     message: string;
//     visible: boolean;
//     setVisible: (value: boolean) => void;
//     duration?: number;
// }

// const [toastPopup, setToastPopup] = useState(false);
// const [toastType, setToastType] = useState(0);

export default function Toast({
                                  icon,
                                  message,
                                  visible,
                                  setVisible,
                                  duration,
                              }: Toast) {
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => setVisible(false), duration || 3000);
            return () => clearTimeout(timer);
        }
    }, [visible, setVisible, duration]);

    return (
        <div
            className={`fixed top-4 right-4 z-50 transition-all duration-300 transform ${
                visible
                    ? `opacity-100 translate-y-0`
                    : `opacity-0 -translate-y-2 pointer-events-none`
            }`}
        >
            <div
                className={`bg-white px-4 py-3 rounded shadow-md flex items-center gap-2`}
            >
                {icon}
                <p className={`text-sm`}>{message}</p>
            </div>
        </div>
    );
}

{/* Toast Notifications */}
{/*{toastTypes*/}
{/*    .filter((toast) => toast.type === toastType)*/}
{/*    .map((t) => (*/}
{/*        <Toast*/}
{/*            key={t.type}*/}
{/*            icon={*/}
{/*                t.type === 1 || t.type === 2 ? (*/}
{/*                    <CircleX className="text-red-500" size={20}/>*/}
{/*                ) : (*/}
{/*                    <CircleCheck className="text-green-500" size={20}/>*/}
{/*                )*/}
{/*            }*/}
{/*            message={t.message}*/}
{/*            visible={toastPopup}*/}
{/*            setVisible={setToastPopup}*/}
{/*        />*/}
{/*    ))}*/}
