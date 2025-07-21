async function SendMail(userEmail: string, code: string) {
    const emailContent = {
        to: userEmail,
        subject: "Xác thực tài khoản Gallery",
        html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); padding: 30px;">
        <h2 style="font-size: 16px;color: #2c3e50;">Gallery</h2>
        <p style="font-size: 16px;color: #333333;">(つ≧▽≦)つ</p>
        <p style="font-size: 16px;color: #333333;"> 
          Đây là mã xác thực tài khoản của bạn <strong>${code}</strong>
        </p>
        <p style="font-size: 16px;color: #333333;">
          Mã xác thực có tác dụng trong <strong>30</strong> phút.
        </p>
        <hr style="margin: 20px 0;" />
        <p style="font-size: 14px; color: #555555;">
          Mọi thắc mắc xin liên hệ email: <a href="mailto:gallery.tdat.vn@gmail.com">gallery.tdat.vn@gmail.com</a>
        </p>
        <p style="font-size: 14px; color: #555555;">
          Đây là tin nhắn tự động. Vui lòng không phản hồi lại !
        </p>
      </div>
    </div>
  `,
    };

    try {
        const res = await fetch("/api/mail/send-mail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(emailContent),
        });
        return await res.json();
    } catch (error) {
        console.log(">>>Lỗi gửi mail: ", error);
    }
}

async function ResetPassword() {
}

async function RecoveryAccount() {
}

export {
    SendMail,
    ResetPassword,
    RecoveryAccount
}