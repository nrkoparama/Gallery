import nodemailer from "nodemailer";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
    const {to, subject, html} = await req.json();

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    try {
        await transporter.sendMail({
            from: `Gallery <${process.env.EMAIL}>`,
            to,
            subject,
            html,
        });

        return NextResponse.json({status: 200, message: "Gửi mail thành công"});

    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Gửi mail thất bại",
            error: error,
        });
    }
}
