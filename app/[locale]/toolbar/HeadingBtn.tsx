import {HTMLAttributes, useState} from "react";

const headings = [
    {
        text: "Tiêu đề 1",
        symbol: "1"
    },
    {
        text: "Tiêu đề 2",
        symbol: "2"
    },
    {
        text: "Tiêu đề 3",
        symbol: "3"
    },
    {
        text: "Tiêu đề 4",
        symbol: "4"
    },
    {
        text: "Tiêu đề 5",
        symbol: "5"
    },

]

export default function HeadingBtn({...props}: HTMLAttributes<HTMLDivElement>) {
    const [currentHeading, setCurrentHeading] = useState(headings[0]);
    return (
        <div {...props} className={`relative text-lg`}>
            {/*Headings*/}
            <div className={`w-full bg-white/60 text-center p-2 rounded`}>
                H
            </div>
            <div className={`hidden absolute top-12 bg-white border rounded`}>
                {headings.filter(heading => heading !== currentHeading)
                    .map(heading => (
                        <div
                            key={heading.symbol}
                            onClick={() => setCurrentHeading(heading)}
                            className={``}
                        >
                            <span>{heading.symbol}</span>
                            {heading.text}

                        </div>
                    ))}
            </div>
        </div>
    )
}