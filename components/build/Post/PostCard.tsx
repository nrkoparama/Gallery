import Image from "next/image";
import {useState} from "react";
import {useRouter} from "next/navigation";
// import {ImageWithFallback} from "@/app/components/ImageWithFallback";
import {Bookmark, Heart, Sparkle, User} from "lucide-react";
import HeartAnimation from "@/components/animations/lottie/Heart/HeartAnimation";
import BookmarkAnimation from "@/components/animations/lottie/Bookmark/BookmarkAnimation";

import type {PostCard} from "@/types/Post";

export default function PostCard({post, variant}: PostCard) {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    return <>
        {post ?
            (
                <div
                    onClick={() => router.push(`/post/${post.slug}`)}
                    className={`relative group overflow-hidden rounded-lg cursor-pointer bg-gray-100 ${variant === "tall" ? "aspect-[3/4]" : "aspect-square"}`}
                    onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    <Image
                        src={post.urls[0]}
                        alt={`Photo by ${typeof post.authorId === "string" ? "anonymous person" : post.authorId.fullName}`}
                        width={335}
                        height={445}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div
                        className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}/>

                    {/*Something*/}
                    <div
                        className={`absolute w-[90%] top-0 left-6 transition-transform duration-300 ${isHovered ? "translate-y-6" : "-translate-y-full"} `}>
                        <div className={`text-white/90 flex justify-between`}>
                            <div>
                                <Sparkle color={'#f4f4f5'} size={20} strokeWidth={1.75} className={``}/>
                            </div>


                        </div>

                    </div>
                    {/* Info */}
                    <div
                        className={`absolute bottom-0 left-0 right-0 p-4 transition-transform duration-300 ${isHovered ? "translate-y-0" : "translate-y-full"}`}>
                        <div className={`flex justify-between`}>
                            <div className="flex items-start gap-2 text-white/40">
                                <div className="flex items-center">
                                    {typeof post.authorId === "string" ? (
                                        <div
                                            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                            <User className={`w-4 h-4`}/>
                                        </div>
                                    ) : (
                                        <div
                                            className="w-10 h-10 rounded-full bg-white/20 flex justify-center items-center">
                                            <div
                                                className={`relative w-9 h-9 aspect-square rounded-full overflow-hidden`}>
                                                <Image
                                                    src={post.authorId.image!}
                                                    alt={post.authorId.fullName ?? "Avatar"}
                                                    fill
                                                    sizes={'32px'}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div
                                        className="text-sm">{typeof post.authorId === "string" ? "Người ẩn danh" : post.authorId.fullName}</div>
                                    <div className="text-sm">{post.likes} lượt thích</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setLiked(!liked);
                                    }}
                                    className="hover:scale-110 transition-transform"
                                >
                                    <div
                                        className={`relative w-5 h-5 flex justify-center items-center overflow-visible`}>
                                        {liked ? (
                                            <HeartAnimation className={`absolute w-24 h-24 cursor-pointer`}/>
                                        ) : (
                                            <Heart
                                                strokeWidth={1.75}
                                                className={`w-5 h-5 hover:text-rose-500 hover:cursor-pointer`}
                                            />
                                        )}
                                    </div>
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setBookmarked(!bookmarked);
                                    }}
                                    className="group hover:scale-110 transition-transform"
                                >
                                    <div
                                        className={`relative w-5 h-5 flex justify-center items-center overflow-visible`}>
                                        {bookmarked ? (
                                            <BookmarkAnimation className={`absolute w-24 h-24 cursor-pointer`}/>
                                        ) : (
                                            <Bookmark
                                                strokeWidth={1.75}
                                                className={`w-5 h-5 hover:text-teal-500 hover:cursor-pointer`}
                                            />
                                        )}
                                    </div>
                                </button>


                            </div>
                        </div>

                    </div>
                </div>
            ) : (
                // Image with fallback
                <div className={`skeleton rounded-lg ${variant === "tall" ? "aspect-[3/4]" : "aspect-square"}`}>
                </div>
            )}
    </>

}
