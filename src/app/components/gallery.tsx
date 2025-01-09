"use client";
import Link from "next/link";
import Picture from "../models/picture";
import Category from "../models/category";
import Author from "../models/author";
// import { useEffect, useState } from "react";

export default function GalleryPage({
  pictures,
  categories,
  authors,
}: {
  pictures: Picture[];
  categories: Category[];
  authors: Author[];
}) {
  return (
    <section className="w-full my-[60px]">
      <div className="w-[90vw] mx-auto flex justify-between items-center">
        <div className="w-[18rem] font-lg tracking-wide capitalize">
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
        <div className="w-[66rem] flex space-x-4">
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

      <div className="w-[90vw] mx-auto my-[10px]">
        <div className="w-[18rem] bg-[#fff] px-[28px] py-[18px] rounded-lg fixed top-[236px] left-[64px]">
          <div className="borderDel mb-4 border-b-2">
            <p className="tracking-wide font-medium mb-2">Danh mục ảnh</p>
            <div className="mb-4 flex flex-wrap">
              {categories.map((category) => (
                <div key={category._id} className="mx-2 flex justify-center">
                  <input
                    type="checkbox"
                    id={`${category._id}`}
                    value={`${category.name}`}
                  />
                  <label
                    htmlFor={`${category._id}`}
                    className="ml-1 my-1 cursor-pointer"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="borderDel mb-4 border-b-2">
            <p className="tracking-wide font-medium mb-2">Người đăng</p>
            <div className="mb-4 flex flex-wrap">
              {authors.map((author) => (
                <div key={author._id} className="mx-2 flex justify-center">
                  <input
                    type="checkbox"
                    id={`${author._id}`}
                    value={`${author.name}`}
                  />
                  <label
                    htmlFor={`${author._id}`}
                    className="ml-1 my-1 cursor-pointer"
                  >
                    {author.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="borderDel mb-4 border-b-2">
            <p className="tracking-wide font-medium mb-2">Năm</p>
            <div className="mb-4 flex flex-wrap">
              <div className="mx-2 flex justify-center">
                <input type="checkbox" id="2024" value="2024" />
                <label htmlFor="2024" className="ml-1 my-1 cursor-pointer">
                  2024
                </label>
              </div>
              <div className="mx-2 flex justify-center">
                <input type="checkbox" id="2025" value="2025" />
                <label htmlFor="2025" className="ml-1 my-1 cursor-pointer">
                  2025
                </label>
              </div>
              <div className="mx-2 flex justify-center">
                <input type="checkbox" id="2026" value="2026" />
                <label htmlFor="2026" className="ml-1 my-1 cursor-pointer">
                  2026
                </label>
              </div>
              <div className="mx-2 flex justify-center">
                <input type="checkbox" id="2027" value="2027" />
                <label htmlFor="2027" className="ml-1 my-1 cursor-pointer">
                  2027
                </label>
              </div>
              <div className="mx-2 flex justify-center">
                <input type="checkbox" id="2028" value="2028" />
                <label htmlFor="2028" className="ml-1 my-1 cursor-pointer">
                  2028
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[66rem] ml-[328px] p-[28px] bg-[#fff] rounded-lg flex flex-wrap gap-0 justify-between">
          {pictures.map((picture) => (
            <Link
              key={picture._id}
              href={`/pages/gallery/picture?id=${picture._id}`}
            >
              <div className="w-[20rem] h-[240px] mb-4 p-[14px] hover:border-l-[3px] hover:border-b-[3px] border-slate-200 hover:shadow-lg cursor-pointer">
                <img
                  src={`/images/${picture.urlImage}`}
                  alt={picture.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
