export default function Divider() {
    return (
        <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-[1px] bg-gray-200"></div>
            <span className="text-gray-500">hoặc</span>
            <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>
    )
}