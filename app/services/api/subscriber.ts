async function getSubscriberById(id: string) {
    try {
        const response = await fetch(`http://localhost:4000/api/v1/subscribers/subscriber?id=${id}`);

        return await response.json();
    } catch (error) {
        console.log("Lỗi", error);
        return {status_code: 500, message: "Lỗi", error}
    }
}

export {
    getSubscriberById
}