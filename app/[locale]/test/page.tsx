"use client";
// import Button from "@/components/build/Button";
export default function TestPage() {
    return (
        <div className="h-screen overflow-y-scroll hidden-scrollbar snap-y snap-mandatory">
            <div className="h-screen bg-red-500 snap-start">
            </div>
            <div className="h-screen bg-blue-500 snap-start">
            </div>
            <div className="h-screen bg-red-green snap-start">
            </div>
        </div>
    )
}