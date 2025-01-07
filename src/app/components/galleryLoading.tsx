"use client";
import Link from "next/link";

export default function GalleyLoading() {
  return (
    <section className="w-full my-[40px]">
      <div className="w-[90vw] mx-auto flex justify-between items-center">
        <div className="w-[16rem] font-medium tracking-wide capitalize">
          <Link href="/" className="hover:text-[#FA7566]">
            home
          </Link>{" "}
          /{" "}
          <Link href="/pages/gallery" className="hover:text-[#FA7566]">
            gallery
          </Link>{" "}
          /{" "}
          <Link href="/" className="hover:text-[#FA7566]">
            picture
          </Link>
        </div>
        <div className="w-[68rem] flex space-x-4">
          <div className="w-[360px] relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-[360px] h-[40px] px-4 rounded focus:outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-[20px] absolute top-[8px] right-[12px]"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </div>
          <input
            type="text"
            defaultValue="Ảnh mới nhất"
            list="dateUpload"
            className="w-[160px] h-[40px] px-4 rounded focus:outline-none"
          />
          <datalist id="dateUpload">
            <option value="Ảnh mới nhất"></option>
            <option value="Ảnh cũ nhất"></option>
          </datalist>
        </div>
      </div>

      <div className="w-[90vw] mx-auto my-[10px] relative">
        <div className="w-[16rem] bg-[#fff] px-[28px] py-[18px] rounded-lg fixed top-[90px] left-[64px]">
          <div className="borderDel mb-4 border-b-2">
            <p className="tracking-wide font-medium mb-2">Danh mục ảnh</p>
            <div className="mb-4 flex flex-wrap">
              <div className="mx-2">
                <input type="checkbox" id="Biển" value="Biển" />
                <label htmlFor="Biển" className="ml-1 my-1 cursor-pointer">
                  Biển
                </label>
              </div>
              <div className="mx-2">
                <input type="checkbox" id="" />
                <label htmlFor="" className="ml-1 my-1">
                  Núi
                </label>
              </div>
              <div className="mx-2">
                <input type="checkbox" id="" />
                <label htmlFor="" className="ml-1 my-1">
                  Ăn uống
                </label>
              </div>
              <div className="mx-2">
                <input type="checkbox" id="" />
                <label htmlFor="" className="ml-1 my-1">
                  Nghỉ ngơi
                </label>
              </div>
              <div className="mx-2">
                <input type="checkbox" id="" />
                <label htmlFor="" className="ml-1 my-1">
                  Em
                </label>
              </div>
              <div className="mx-2">
                <input type="checkbox" id="" />
                <label htmlFor="" className="ml-1 my-1">
                  Rừng
                </label>
              </div>
              <div className="mx-2">
                <input type="checkbox" id="" />
                <label htmlFor="" className="ml-1 my-1">
                  Bảo tàng
                </label>
              </div>
              <div className="mx-2">
                <input type="checkbox" id="" />
                <label htmlFor="" className="ml-1 my-1">
                  Nghỉ ngơi
                </label>
              </div>
            </div>
          </div>
          <div className="borderDel mb-4 border-b-2">
            <p className="tracking-wide font-medium mb-2">Người đăng</p>
            <div className="mb-4 flex flex-wrap">
              <div className="mx-2">
                <input type="checkbox" id="Đạt" value="name" />
                <label htmlFor="Đạt" className="ml-1 my-1 cursor-pointer">
                  Đạt
                </label>
              </div>
              <div className="mx-2">
                <input type="checkbox" id="Trang" value="name" />
                <label htmlFor="Trang" className="ml-1 my-1">
                  Trang
                </label>
              </div>
              <div className="mx-2">
                <input type="checkbox" id="An" value="name" />
                <label htmlFor="An" className="ml-1 my-1">
                  An
                </label>
              </div>
              <div className="mx-2">
                <input type="checkbox" id="Nghĩa" value="name" />
                <label htmlFor="Nghĩa" className="ml-1 my-1">
                  Nghĩa
                </label>
              </div>
            </div>
          </div>
          <div className="borderDel mb-4 border-b-2">
            <p className="tracking-wide font-medium mb-2">Năm</p>
            <div className="mb-4 flex flex-wrap">
              <div className="mx-2">
                <input type="checkbox" id="2024" value="2024" />
                <label htmlFor="2024" className="ml-1 my-1  cursor-pointer">
                  2024
                </label>
              </div>
              <div className="mx-2">
                <input type="checkbox" id="" />
                <label htmlFor="" className="ml-1 my-1">
                  2025
                </label>
              </div>
              <div className="mx-2">
                <input type="checkbox" id="" />
                <label htmlFor="" className="ml-1 my-1">
                  2026
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[68rem] ml-[292px] p-[28px] bg-[#fff] rounded-lg flex flex-wrap gap-0 justify-between">
          <div className="w-[20rem] h-[240px] mb-4 bg-slate-200 shimmer-effect flex justify-center items-center">
            <div className="loader"></div>
          </div>
          <div className="w-[20rem] h-[240px] mb-4 bg-slate-200 shimmer-effect flex justify-center items-center">
            <div className="loader"></div>
          </div>
          <div className="w-[20rem] h-[240px] mb-4 bg-slate-200 shimmer-effect flex justify-center items-center">
            <div className="loader"></div>
          </div>
          <div className="w-[20rem] h-[240px] mb-4 bg-slate-200 shimmer-effect flex justify-center items-center">
            <div className="loader"></div>
          </div>
          <div className="w-[20rem] h-[240px] mb-4 bg-slate-200 shimmer-effect flex justify-center items-center">
            <div className="loader"></div>
          </div>
          <div className="w-[20rem] h-[240px] mb-4 bg-slate-200 shimmer-effect flex justify-center items-center">
            <div className="loader"></div>
          </div>
          <div className="w-[20rem] h-[240px] mb-4 bg-slate-200 shimmer-effect flex justify-center items-center">
            <div className="loader"></div>
          </div>
          <div className="w-[20rem] h-[240px] mb-4 bg-slate-200 shimmer-effect flex justify-center items-center">
            <div className="loader"></div>
          </div>
          <div className="w-[20rem] h-[240px] mb-4 bg-slate-200 shimmer-effect flex justify-center items-center">
            <div className="loader"></div>
          </div>
          <div className="w-[20rem] h-[240px] mb-4 bg-slate-200 shimmer-effect flex justify-center items-center">
            <div className="loader"></div>
          </div>
          <div className="w-[20rem] h-[240px] mb-4 bg-slate-200 shimmer-effect flex justify-center items-center">
            <div className="loader"></div>
          </div>
          <div className="w-[20rem] h-[240px] mb-4 bg-slate-200 shimmer-effect flex justify-center items-center">
            <div className="loader"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
