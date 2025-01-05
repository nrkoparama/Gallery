"use client";
import { useState, useEffect } from "react";
import Picture from "../models/picture";

function Slider() {
  //define pics là mảng loại Picture
  const [pics, setPics] = useState<Picture[]>([]);
  const [currIndex, setCurrIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/pictures");
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        setPics(data.pictures);
      } catch (err) {
        console.log("Lỗi fetching data: ", err);
      }
    };
    fetchData();
  }, []);

  if (pics.length === 0)
    return (
      <div className="w-full text-2xl font-medium flex justify-center">
        Đang tải...
      </div>
    );

  return (
    <section className="my-[80px]">
      <div className="w-5/6 mx-auto overflow-hidden flex">
        {pics.map((pic, index) => (
          <div key={index} className="w-2/6">
            <img
              src={`/images/${pic.urlImage}`}
              alt={`${pic.name}`}
              className="w-[100px] h-[100px]"
            />
            <p className="">{pic.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Slider;
