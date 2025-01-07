"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWR from "swr";
// import { Suspense } from "react";  dùng dể load ptu tạm thời khi ptu con trong nó chưa load xong

import Picture from "@/app/models/picture.js";
import api from "../../api/api.js";
import Gallery from "../../components/gallery";
import GalleryLoading from "../../components/galleryLoading";

function GalleryPage() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(api.picturesAPI, fetcher, {
    refreshInterval: 1000,
  });

  if (!data) return <GalleryLoading />;
  if (error) return <div>Lỗi fetching: {error.massage}</div>;
  return (
    // <Suspense fallback={<GalleryLoading />}>
    <Gallery data={data.pictures} />
    // </Suspense>
  );
}
export default GalleryPage;
