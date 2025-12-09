import * as Yup from "yup";
import {forbiddenWords} from "@/constants/forbiddenWords";

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .required("* Vui lòng nhập email")
        .trim()
        .email("* Email không hợp lệ"),
    password: Yup.string()
        .required("* Vui lòng nhập mật khẩu")
        .trim()
        .min(8, "* Mật khẩu tối thiểu 8 kí tự")
        .matches(
            /^[A-Z](?=.*\d)(?=.*[@$!%*?&]).{7,}$/,
            "* Mật khẩu phải bắt đầu bằng chữ in hoa, chứa ít nhất một chữ số và một ký tự đặc biệt"
        ),
});

const registerSchema = Yup.object().shape({
    firstName: Yup.string()
        .required("* Vui lòng nhập họ")
        .trim()
        .min(1, "* Tối thiểu 1 kí tự")
        .max(10, "* Tối đa 10 kí tự"),
    lastName: Yup.string()
        .required("* Vui lòng nhập tên")
        .trim()
        .min(1, "* Tối thiểu 1 kí tự")
        .max(10, "* Tối đa 10 kí tự"),
    email: Yup.string()
        .required("* Vui lòng nhập email")
        .trim()
        .email("* Email không hợp lệ"),
    password: Yup.string()
        .required("* Vui lòng nhập mật khẩu")
        .trim()
        .min(8, "* Mật khẩu tối thiểu 8 kí tự")
        .matches(
            /^[A-Z](?=.*\d)(?=.*[@$!%*?&]).{7,}$/,
            "* Mật khẩu phải bắt đầu bằng chữ in hoa, chứa ít nhất một chữ số và một ký tự đặc biệt"
        ),
    token: Yup.string()
        .trim()
        .nullable()
        .default(null),
});

const verifyEmailSchema = Yup.object({
    email: Yup.string()
        .trim()
        .email("* Email không hợp lệ")
        .required("* Vui lòng nhập email")
});

const userSchema = Yup.object().shape({
    firstName: Yup.string()
        .required("* Vui lòng nhập họ")
        .trim()
        .min(1, "* Họ cần tối thiểu 1 ký tự")
        .max(50, "* Họ tối đa 50 ký tự")
        .matches(/[A-Za-z0-9 ]/, "* Họ chỉ được chứa các ký tự ( A - Z, a - z và 0 - 9 ) ") // case các ký tự hợp lệ + không hợp lệ lỗi: abc$%# vẫn cho phép -> lỗi
        .test("Ban words", "* Phát hiện từ ngữ không hợp lệ !", (value) => {
            if (!value) return true; // để required() xử lý
            // nếu có từ cấm ->  return !true và trigger test() error ( ngược lại !false)
            return !forbiddenWords.some((word) =>
                value.toLowerCase().includes(word.toLowerCase())
            )
        }),
    lastName: Yup.string()
        .required("* Vui lòng nhập tên")
        .trim()
        .min(1, "* Tên tối thiểu 1 ký tự")
        .max(10, "* Tên tối đa 10 ký tự")
        .matches(/[A-Za-z0-9]/, "* Tên chỉ được chứa các ký tự ( A - Z, a - z và 0 - 9 )") // case các ký tự hợp lệ + không hợp lệ lỗi: abc$%# vẫn cho phép -> lỗi
        .test("Ban words", "* Phát hiện từ ngữ không hợp lệ !", (value) => {
            if (!value) return true; // để required() xử lý
            // nếu có từ cấm ->  return !true và trigger test() error ( ngược lại !false)
            return !forbiddenWords.some((word) =>
                value.toLowerCase().includes(word.toLowerCase())
            )
        }),
    tagName: Yup.string()
        .required("* Vui lòng nhập thẻ tên")
        .trim()
        .min(5, "* Thẻ tên tối thiểu 5 ký tự")
        .max(10, "* Thẻ tên tối đa 10 ký tự")
        .matches(
            /^[A-Za-z][A-Za-z0-9_]{4,9}$/,
            '* Thẻ tên có 10 ký tự bắt đầu bằng chữ cái và chí được chứa ( A - Z, a - z, 0 - 9 và "_" )'
        ),
    provider: Yup.string().required(),
    email: Yup.string()
        .required("* Vui lòng nhập email")
        .trim()
        .email("* Email không hợp lệ"),
    image: Yup.mixed<File>()
        .nullable()
        .default(null),
    description: Yup.string()
        .required("* Vui lòng nhập mô tả")
        .trim()
        .test("Ban words", "* Phát hiện từ ngữ không hợp lệ !", (value) => {
            return !forbiddenWords.some((word) => value?.toLowerCase().includes(word.toLowerCase()))
        })

});

const softDeleteSchema = Yup.object().shape({
    confirmText: Yup.string()
        .required()
        .trim(),
    reConfirm: Yup.string()
        .required()
        .trim()
        .oneOf([Yup.ref("confirmText")], "* Vui lòng xác nhận lại việc xóa tài khoản")
});

const postSchema = Yup.object().shape({
    authorId: Yup.string()
        .required()
        .trim(),
    title: Yup.string()
        .required("* Vui lòng nhập tiêu đề bài đăng")
        .trim(),
    caption: Yup.string()
        .trim()
        .nullable()
        .default(null),
    // hashtags: Yup.array()
    //     .of(Yup.string().required())
    //     .nullable()
    //     .default(null),
    hashtags: Yup.string()
        .trim()
        .nullable()
        .default(null),
    files: Yup.mixed<FileList>()
        .nullable()
        .default(null)
        .test("is-valid-FileList", "Dữ liệu không hợp lệ", (value) => {
            return value instanceof FileList || value === null;
        })
        .test("max-file", "Hiện tại chỉ hộ trợ tải tối đa 5 file", (value) => {
            if (!value) return true;
            return Array.from(value).length <= 5;
        })
        .test("max-size", "Tệp ảnh tối đa chỉ được 20mb", (value) => {
            if (!value) return true;
            return Array.from(value).every(file => file.size <= 20 * 1024 * 1024)
        })
});

const newsLetterSchema = Yup.object().shape({
    email: Yup.string()
        .email("* Vui lòng nhập email hợp lệ")
        .required("* Vui lòng nhập email")
        .trim()
})

export {
    loginSchema,
    registerSchema,
    verifyEmailSchema,
    userSchema,
    softDeleteSchema,
    postSchema,
    newsLetterSchema
}