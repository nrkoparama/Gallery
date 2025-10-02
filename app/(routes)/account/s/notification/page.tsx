"use client";
import {Switch} from "@/components/ui/switch";
import {useEffect, useState} from "react";
import type {Subscriber} from "@/types/Subscriber";
import {useAuthor} from "@/app/components/provider/authorContext.provider";
import {getSubscriberById} from "@/app/services/api/subscriber";

const notifications = [
    {
        type: "system",
        label: "Thông báo hệ thống",
        description: "Nhận thông báo khi có bảo trì, nâng cấp hệ thống hoặc những tính năng mới nhất.",
    },
    {
        type: "privacyPolicy",
        label: "Cập nhật Điều khoản & Quyền riêng tư",
        description: "Nhận thông báo khi có thay đổi chính sách Điều khoản & Quyền riêng.",
    },
    {
        type: "account",
        label: "Tài khoản",
        description: "Nhận thông báo khi có thay đổi liên quan đến tài khoản của bạn (thông tin cá nhân, mật khẩu, bảo mật).",
    },
    {
        type: "interaction",
        label: "Lượt tương tác",
        description: "Nhận thông báo khi có người thích, bình luận hoặc chia sẻ ảnh và bài viết của bạn.",
    },
    {
        type: "following",
        label: "Hoạt động từ người theo dõi",
        description: "Nhận thông báo khi những người bạn theo dõi đăng ảnh hoặc blog mới.",
    },
    {
        type: "suggestion",
        label: "Đề xuất nội dung",
        description: "Nhận gợi ý về những bài viết, album ảnh hoặc tác giả có thể bạn sẽ quan tâm.",
    },
    {
        type: "event",
        label: "Sự kiện & Cộng đồng",
        description: "Nhận thông tin về sự kiện, cuộc thi ảnh hoặc hoạt động từ cộng đồng mà bạn có thể tham gia.",
    },
    {
        type: "marketing",
        label: "Email tiếp thị",
        description: "Nhận thông tin về ưu đãi, gói dịch vụ và các sản phẩm khác của chúng tôi.",
    }
];

export default function NotificationPage() {
    const {author} = useAuthor();
    const [notificationSettings, setNotificationSettings] = useState<Subscriber | null>(null);

    const handleChecked = (type: string) => {
        if (notificationSettings) {
            setNotificationSettings(prev => {
                if (!prev) return null;

                if (type === "all") {
                    return {
                        ...prev,
                        receive: {
                            all: !prev.receive?.all,
                            system: !prev.receive?.all,
                            privacyPolicy: !prev.receive?.all,
                            account: !prev.receive?.all,
                            interaction: !prev.receive?.all,
                            following: !prev.receive?.all,
                            suggestion: !prev.receive?.all,
                            event: !prev.receive?.all,
                            marketing: !prev.receive?.all,
                        }
                    }
                }
                else {
                    return {
                        ...prev,
                        receive: {
                            ...prev.receive,
                            [type]: !prev.receive![type as keyof typeof prev.receive]
                        }
                    }
                }

            })
        }

    }

    useEffect(() => {
        if (author) {
            const fetchSubscriberSettings = async (id: string) => {
                const res = await getSubscriberById(id);

                if (res.status_code === 200) {
                    setNotificationSettings(res.data);
                }
            }
            fetchSubscriberSettings(author._id);
        }
    }, [author]);

    useEffect(() => {
        if (notificationSettings) {
            setNotificationSettings(notificationSettings);
        }
    }, [notificationSettings]);

    console.log(notificationSettings)

    return (
        <div>
            <div className={`mt-6`}>
                <ul className={`flex flex-col`}>
                    <li>
                        <div className={`py-5 flex justify-between items-center`}>
                            <div>
                                <label className={`block`}>
                                    Tất cả thông báo
                                </label>
                            </div>
                            <Switch
                                checked={notificationSettings?.receive?.["all" as keyof typeof notificationSettings["receive"]]}
                                onCheckedChange={() => handleChecked("all")}
                                className={`cursor-pointer`}
                            />
                        </div>
                    </li>
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
                                    checked={notificationSettings?.receive?.[n.type as keyof typeof notificationSettings["receive"]]}
                                    onCheckedChange={() => handleChecked(n.type)}
                                    className={`cursor-pointer`}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}