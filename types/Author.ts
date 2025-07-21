interface Author {
    _id: string;
    tag: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    password: string;
    image: string;
    emailVerified: boolean;
    isThirdParty: boolean;
    loginType: string;
    socials: [{ platform: string, url: string }];
    role: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

type RegisterType = Pick<Author, "firstName" | "lastName"| "email" | "password">;
type LoginType = Pick<Author, "email" | "password">;
type UpdateProfile = Pick<Author, "fullName" | "tag" | "image">

export type {Author, RegisterType, LoginType, UpdateProfile};




