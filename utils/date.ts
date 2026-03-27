/*--------------------------- Docs ---------------------------

    getDate(): number -> trả về ngày hiện tại

-----------------------------------------------------------*/
const Day = {0: "Su", 2: "Mo", 3: "Tu", 4: "We", 5: "Th", 6: "Fr", 7: "Sa"}

export const getCurrentYear = () => {
    const date = new Date();
    return `${date.getFullYear()}`;
}

/** Nhận vào giá trị ngày (type:Date) và trả về ngày đầy đủ. Ví dụ: 20/10/1996 */
const customGetDate = (Date: Date) => {
    const date = String(Date.getDate()).padStart(2, "0");
    const month = String(Date.getMonth() + 1).padStart(2, "0");
    const year = Date.getFullYear();
    return `${date}/${month}/${year}`;
}

/**
 * Nhận vào giá trị thứ ( date.getDay(): number ) và trả về thứ đã được custom lại. Ví dụ: thứ 3 -> "T3"
 * Lưu ý:
 * Chủ nhật sẽ tương ứng với số 0
 * Lấy đúng ngày cần phải + 1 số thứ lấy được từ date.getDay()
 * */
const customGetDay = (Date: Date) => {
    return Day[(Date.getDay() + 1) as keyof typeof Day]
};

/** Nhận vào giá trị ngày (type:Date) và trả về giờ và phút. Ví dụ: 10:00 */
const customGetTime = (date: Date) => {
    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`
}

const customGetGMT = (Date: Date) => {
    return `GMT+${Math.abs(Date.getTimezoneOffset() / 60)}`
}

export {
    customGetDate,
    customGetDay,
    customGetTime,
    customGetGMT
}
