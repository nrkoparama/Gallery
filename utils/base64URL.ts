export const encodeBase64Url = (strs: string) => {
    return Buffer.from(strs)
        .toString("base64") // chuyển sang base64
        .replace(/\+/g, "-") // thay "+"  -->  "-"
        .replace(/\//g, "_") // thay "/"  -->  "_"
        .replace(/=+$/, ""); // xóa " = " ở cuối
};

export const decodeBase64Url = (strs: string) => {
    let string = strs.replace(/-/g, "+").replace(/_/g, "/");

    // chuỗi phải là bội số của 4, có thể lúc encode đã xóa dấu bằng cuối
    if (string.length % 4 !== 0) {
        string += "=";
    }
    return Buffer.from(string, "base64").toString("utf-8");
};