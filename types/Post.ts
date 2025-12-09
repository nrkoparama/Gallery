import type {Author} from "./Author";

interface Post {
    _id: string,
    authorId: string | Author,
    title: string,
    slug: string,
    caption: string | null,
    hashtags: string[] | null,
    urls: string[],
    views: number,
    likes: number,
    status: number
    // downloads: number,
    createdAt: Date,
    updatedAt: Date,
}

interface PostCard {
    post: Post;
    variant: "tall" | "short";
}

export type {Post, PostCard};