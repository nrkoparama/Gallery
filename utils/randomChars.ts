import {customAlphabet} from "nanoid"; // sẽ trả về function
interface randomCharsType {
    chars: string, // chuỗi kí tự sẽ random
    length?: number // customAlphabet() cho size là option nên length nên là option luôn
}

export const randomChars = (data: randomCharsType) => {

    if (!data.chars) return "Nrko34";

    if(!data.length) return customAlphabet(data.chars)();

    return customAlphabet(data.chars, data.length)();

}
