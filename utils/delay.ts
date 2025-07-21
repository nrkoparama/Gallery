const sleep = (time: number) =>
    new Promise(
        (resolve) =>
            setTimeout(resolve, time ? time : 3000)
    );
export {sleep};