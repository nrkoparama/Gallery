import type {Notification} from "@/types/Subscriber";

interface Author {
    _id: string,
    firstName: string,
    lastName: string,
    fullName: string,
    tagName: string,
    email: string,
    password: string,
    description: string,
    achievements: [string],
    image: string | null,
    isThirdParty: boolean,
    provider: string,
    subscriberId: Notification | null,
    socials: [{ platform: string, url: string }],
    role: number,
    status: number,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
}

type LoginType = Pick<Author, "email" | "password">;

type RegisterType = Pick<Author, "firstName" | "lastName" | "email" | "password">;

type UpdateFormType = Pick<Author, "firstName" | "lastName" | "tagName" | "provider" | "email" | "description">
    & { image: File | null };

type NewsLetterForm = Pick<Author, "email">

export type {Author, RegisterType, LoginType, UpdateFormType, NewsLetterForm};




