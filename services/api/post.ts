const postURL = `${process.env.NEXT_PUBLIC_DEV_SERVER_URL}/posts`;

/*------------------------Client Apis------------------------------------*/
async function GetALlPost() {
    try {
        const response = await fetch(`${postURL}`);

        return await response.json();
    } catch (error) {
        return {status_code: 500, message: "Có lỗi. Vui lòng thử lại sau!", error};
    }
}

async function CreatePost(formData: FormData) {
    try {
        const response = await fetch(`${postURL}/create`, {
            method: "POST",
            body: formData
        });

        return await response.json();

    } catch (error) {
        return {status_code: 500, message: "Có lỗi. Vui lòng thử lại sau!", error};

    }
}

export {
    GetALlPost,
    CreatePost
}