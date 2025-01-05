"use client";
import Link from "next/link";
function About() {
  return (
    <div className="w-[1200px] h-[600px] mx-auto relative">
      <div className="w-[240px] h-[240px] bg-[#fff9f9] shadow-lg rounded-full absolute left-[460px] top-[100px]"></div>
      <img
        src="/images/neko.png"
        alt=""
        className="w-[380px] h-[380px] absolute left-[396px] top-[-40px] z-1"
      />
      <div className="w-[800px] bg-[#fff9f9] shadow-lg text-lg tracking-wider ml-[200px] p-[32px] rounded-lg absolute left-[0px] top-[360px] ">
        <span className="block mb-2">Hello (⁠つ⁠≧⁠▽⁠≦⁠)⁠つ</span>
        <p className="">
          Bắt đầu từ những bất cập của các phần mềm, trang web lưu ảnh như GG
          Drive , Mega, Dropbox,... đó là chỉ có thể lưu ảnh mà không ghi thêm
          được bất kì chữ nào về trải nghiệm đấy. Thế nên mình đã bắt tay vào
          làm một trang web vừa lưu được ảnh vừa ghi note như một quyển nhật ký
          và thành phẩm là những gì bạn đang thấy đây.
          <span className="block my-1">
            Hy vọng bạn sẽ thích dự án nhỏ này và có thật nhiều kỉ niệm đẹp !
          </span>
        </p>
        <Link
          href="/"
          className="w-[200px] text-[#FA7566] flex items-center my-1"
        >
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
}
export default About;
