interface Author {
    _id: string,
    firstName: string,
    lastName: string,
    fullName: string,
    tagName: string,
    email: string,
    isThirdParty: boolean,
    provider: string,
    password: string,
    image: string | null,
    description: string,
    achievements: [string],
    // socials: [{ platform: string, url: string }],
    role: number,
    status: number,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
}

export type {Author};




