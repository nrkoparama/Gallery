import type {Author} from "./Author";
import type {Post} from "./Post";

type VerifyEmailForm = Pick<Author, "email">;

type RegisterForm = Pick<Author, "firstName" | "lastName" | "email" | "password"> & { token: string | null };

type LoginForm = Pick<Author, "email" | "password">;

type UpdateProfileForm = Pick<Author, "firstName" | "lastName" | "tagName" | "provider" | "email" | "description"> & {
    image: File | null
};

type PostForm = Pick<Post, "title" | "caption"> & { authorId: string, hashtags: string | null, files: FileList | null };

type SubscribeNewsLetterForm = Pick<Author, "email">;

type DeleteAccountForm = { confirmText: string, reConfirm: string };

export type {
    VerifyEmailForm,
    RegisterForm,
    LoginForm,
    UpdateProfileForm,
    PostForm,
    SubscribeNewsLetterForm,
    DeleteAccountForm
};
