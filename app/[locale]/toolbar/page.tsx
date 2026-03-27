"use client"
import HeadingBtn from "./HeadingBtn";

export default function Toolbar() {
    return (
        <div className={`container px-4 md:px-6 xl:px-8`}>
            <div className={`w-full min-h-screen md:py-6`}>
                {/*Toolbar*/}
                <div id="toolbar"
                     className={`w-[80%] bg-white mx-auto px-8 py-3 border rounded-lg shadow flex items-center space-x-3`}>
                    <div className={`flex`}>
                        {/*Undo*/}
                        <div className={`hover:bg-blue-500/10 p-2 rounded-md cursor-pointer`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                 className="lucide lucide-undo2-icon lucide-undo-2">
                                <path d="M9 14 4 9l5-5"/>
                                <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/>
                            </svg>
                        </div>

                        {/*Redo*/}
                        <div className={`hover:bg-blue-500/10 p-2 rounded-md opacity-50 cursor-pointer`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                 className="lucide lucide-redo2-icon lucide-redo-2">
                                <path d="m15 14 5-5-5-5"/>
                                <path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13"/>
                            </svg>
                        </div>
                    </div>

                    <HeadingBtn/>

                </div>
            </div>
        </div>
    )
}