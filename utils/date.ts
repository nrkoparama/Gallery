/*--------------------------- Docs ---------------------------

    getDate(): number -> trả về ngày hiện tại

-----------------------------------------------------------*/
const date = new Date();

export const getCurrentYear = () => {
    return date.getFullYear();
}
