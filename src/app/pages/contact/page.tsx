"use client";
import Link from "next/link";

export default function ContactWrap() {
  return (
    <section className="w-full my-[20px]">
      <div className="w-[80rem] p-[40px] mx-auto flex justify-between">
        <form action="">
          <div className="w-[800px]">
            <div className="w-full px-[18px] tracking-wide flex flex-wrap justify-between">
              <div className="w-[360px] h-[100px]">
                <label htmlFor="name" className="block text-lg mb-2">
                  Name <span className="text-[red]">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  defaultValue=""
                  placeholder="Your name"
                  className="w-[360px] h-[40px] bg-[#fff9f9] px-4 py-2 outline-dashed outline-[2px] outline-[#C0C8CA]"
                />
              </div>
              <div className="w-[360px] h-[90px]">
                <label htmlFor="email" className="block text-lg mb-2">
                  Email <span className="text-[red]">*</span>
                </label>
                <input
                  type="text"
                  id="email"
                  defaultValue=""
                  placeholder="Your email"
                  className="w-[360px] h-[40px] bg-[#fff9f9] px-4 py-2 outline-dashed outline-[2px] outline-[#C0C8CA]"
                />
              </div>
              <div className="w-[360px] h-[90px]">
                <label htmlFor="titleJob" className="block text-lg mb-2">
                  Title job
                </label>
                <input
                  type="text"
                  id="titleJob"
                  defaultValue=""
                  placeholder="Title Job"
                  className="w-[360px] h-[40px] bg-[#fff9f9] px-4 py-2 outline-dashed outline-[2px] outline-[#C0C8CA]"
                />
              </div>
              <div className="w-full">
                <label htmlFor="titleJob" className="block text-lg mb-2">
                  Job description - JD <span className="text-[red]">*</span>
                </label>
                <textarea className="w-full h-[100px] bg-[#fff9f9]  px-4 py-2 outline-dashed outline-[2px] outline-[#C0C8CA]"></textarea>
              </div>
              <button
                type="submit"
                className="w-[180px] h-[40px] bg-[#C60000] mt-[20px] text-[#fff] rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
        <div className="playwrite-text w-[440px] text-xl tracking-wider px-[30px]">
          <p className="leading-10">
            If you don't want to send a mail, you can contact me on the social
            networks below.
          </p>
          <p className="my-[16px]">Reply ? Nah, I dunno</p>
          <ul className="w-[280px] mt-[60px] flex justify-between">
            <li>
              {" "}
              <Link href="https://www.facebook.com/tandat1231/">
                <img
                  src="/images/facebook-144-144.png"
                  alt=""
                  className="w-[60px] opacity-0 hover:opacity-100"
                />
              </Link>
            </li>
            <li>
              {" "}
              <Link href="https://www.facebook.com/tandat1231/">
                <img
                  src="/images/instagram-144-144.png"
                  alt=""
                  className="w-[60px] opacity-0 hover:opacity-100"
                />
              </Link>
            </li>
            <li>
              <Link href="#">
                <img
                  src="/images/zalo-144-144.png"
                  alt=""
                  className="w-[60px] opacity-0 hover:opacity-100"
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
