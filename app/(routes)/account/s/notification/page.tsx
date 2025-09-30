"use client";
import {Switch} from "@/components/ui/switch";
import {useState} from "react";

const notifications = [
    {
        type: "all",
        label: "Tất cả thông báo",
        description: "",
    },
    {
        type: "system",
        label: "Thông báo hệ thống",
        description: "Nhận thông báo khi có bảo trì, nâng cấp hệ thống hoặc những tính năng mới nhất.",
    },
    {
        type: "termsPrivacy",
        label: "Cập nhật Điều khoản & Quyền riêng tư",
        description: "Nhận thông báo khi có thay đổi chính sách Điều khoản & Quyền riêng.",
    },
    {
        type: "account",
        label: "Tài khoản",
        description: "Nhận thông báo khi có thay đổi liên quan đến tài khoản của bạn (thông tin cá nhân, mật khẩu, bảo mật).",
    },
    {
        type: "interactions",
        label: "Lượt tương tác",
        description: "Nhận thông báo khi có người thích, bình luận hoặc chia sẻ ảnh và bài viết của bạn.",
    },
    {
        type: "following",
        label: "Hoạt động từ người theo dõi",
        description: "Nhận thông báo khi những người bạn theo dõi đăng ảnh hoặc blog mới.",
    },
    {
        type: "contentSuggestions",
        label: "Đề xuất nội dung",
        description: "Nhận gợi ý về những bài viết, album ảnh hoặc tác giả có thể bạn sẽ quan tâm.",
    },
    {
        type: "eventsCommunity",
        label: "Sự kiện & Cộng đồng",
        description: "Nhận thông tin về sự kiện, cuộc thi ảnh hoặc hoạt động từ cộng đồng mà bạn có thể tham gia.",
    },
    {
        type: "marketingEmail",
        label: "Email tiếp thị",
        description: "Nhận thông tin về ưu đãi, gói dịch vụ và các sản phẩm khác của chúng tôi.",
    }
];


export default function NotificationPage() {
    const [notificationSettings, setNotificationSettings] = useState({
        userId: "1223",
        all: true,
        system: true,
        termsPrivacy: true,
        account: true,
        interactions: true,
        following: true,
        contentSuggestions: true,
        eventsCommunity: true,
        marketingEmail: true,
    })
    const handleChecked = (type: string) => {
        setNotificationSettings((prev)=>({
            ...prev,
            [type]: !prev[type as keyof typeof prev]
        }))
    }
    console.log(notificationSettings);
    return <div>

        <div className={`text-lg`}>
            Quản lý thông báo
        </div>

        <div className={`mt-6`}>
            <ul className={`flex flex-col`}>
                {notifications.map((n, index) => (
                    <li key={index}>
                        <div className={`py-5 border-t-2 border-dashed flex justify-between items-center`}>
                            <div>
                                <label className={`block`}>
                                    {n.label}
                                </label>
                                <p className={`text-gray-500`}>{n.description}</p>
                            </div>
                            <Switch
                                checked={notificationSettings[n.type as keyof typeof notificationSettings]}
                                onCheckedChange={()=> handleChecked(n.type)}
                                className={`cursor-pointer`}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
}