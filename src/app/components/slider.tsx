"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";

import type Picture from "../models/picture";

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [arr, setArray] = useState<Picture[]>([]);
  const [animation, setAnimation] = useState(false);

  const fetcher = async (url: string) => fetch(url).then((res) => res.json());
  const { data: Data, error: DataError } = useSWR(
    "http://localhost:3000/pictures",
    fetcher,
    {
      refreshInterval: 10000,
    }
  );

  // Hàm xử lý chỉ số vòng lặp
  const getCircularIndex = (index: number, length: number) => {
    return (index + length) % length;
  };

  useEffect(() => {
    if (!Data || !Data.pictures) return; // Đảm bảo dữ liệu tồn tại
    const allPictures = Data.pictures as Picture[];
    const newArr = [
      allPictures[getCircularIndex(currentIndex - 1, allPictures.length)],
      allPictures[getCircularIndex(currentIndex, allPictures.length)],
      allPictures[getCircularIndex(currentIndex + 1, allPictures.length)],
    ];
    setArray(newArr);
  }, [currentIndex, Data]);

  useEffect(() => {
    if (!Data || !Data.pictures) return; // Đảm bảo dữ liệu tồn tại
    const timer = setTimeout(() => {
      setAnimation(true); // Bắt đầu animation
      setTimeout(() => {
        setAnimation(false); // Kết thúc animation sau 1 giây
        console.log("old index:", currentIndex);
        setCurrentIndex((prev) =>
          getCircularIndex(prev + 1, Data.pictures.length)
        );
      }, 1000); // Thời gian animation zoom
    }, 3000); // Thời gian giữa các lần lướt

    return () => clearTimeout(timer); //clear setTimeout()
  }, [currentIndex, Data]);

  const handleImage = (index: number) => setCurrentIndex(index);

  // if (!Data) return <div>Loading...</div>;
  // if (DataError) return <div>Lỗi fetching data : {DataError.message}</div>;

  return (
    <section className="my-[20px] h-[480px] my-[20px] flex items-center">
      <div
        className={`w-full text-center text-lg flex justify-evenly items-center transition-transform duration-1000 ${
          animation ? "animate-slide" : ""
        }`}
      >
        {arr.map((picture, index) => {
          const position =
            index === 1
              ? "w-[600px] text-2xl font-medium tracking-wide"
              : "w-[400px] ";
          return (
            <div
              key={picture._id}
              className={`border-dashed border-[4px] border-[#C0C8CA] p-4 transition-all duration-1000 ease-in-out ${position}`}
            >
              <img
                src={`/images/${picture.urlImage}`}
                alt={`${picture.name}`}
                className="w-full"
              />
              <p className="my-4">{picture.name}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Slider;
