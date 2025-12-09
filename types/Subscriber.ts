interface Subscriber {
    subscriberId: string | null,
    email?: string,
    receive:
        {
            all: boolean,
            system: boolean,
            privacyPolicy: boolean,
            account: boolean,
            interaction: boolean,
            following: boolean,
            suggestion: boolean,
            event: boolean,
            marketing: boolean,
        } | null
    createdAt?: Date,
    updatedAt?: Date
}

export type {Subscriber}