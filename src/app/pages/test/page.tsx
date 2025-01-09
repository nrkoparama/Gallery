"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";

import type Picture from "../../models/picture";

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
  //   useEffect(() => {
  //     setTimeout(() =>{

  //     })
  //   },[currentIndex] )

  if (!Data) return <div>Loading...</div>;
  if (DataError) return <div>Lỗi fetching data : {DataError.message}</div>;
  const allPictures = Data.pictures as Picture[];
  const handleDotImage = (index: number) => setCurrentIndex(index);

  return (
    <section className=" h-[340px] my-[20px] inline-block">
      {allPictures.map((picture, index) => (
        <div key={picture._id} className="w-[400px] mb-[20px] p-[10px] text-center border-dashed border-[3px] border-[#C0C8CA]">
          <img
            src={`/images/${picture.urlImage}`}
            alt={`${picture.name}`}
            className="w-[380px] h-[260px]"
          />
          <p className="my-4 text-lg font-medium tracking-wide">{picture.name}</p>
        </div>
      ))}
    </section>
  );
}

export default Slider;
