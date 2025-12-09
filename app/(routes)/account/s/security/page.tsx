"use client";
export default function SecurityPage(){
    return (
        <div>
            <div className={`flex flex-col`}>
                <label>Đổi mật khẩu</label>
                <input type="text" placeholder="Mật khẩu cũ"/>
                <input type="text" placeholder="Mật khẩu mới"/>
                <input type="text" placeholder="Nhập lại mật khẩu mới"/>
                <button>Lưu</button>
            </div>
        </div>
    )
}