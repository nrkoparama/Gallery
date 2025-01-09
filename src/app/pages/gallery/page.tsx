"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWR from "swr";
// import { Suspense } from "react";  dùng dể load ptu tạm thời khi ptu con trong nó chưa load xong

import api from "../../api/api.js";
import GalleryPage from "../../components/gallery";
import GalleryLoading from "../../components/galleryLoading";

function GalleryWrap() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data: picturesData, error: picturesError } = useSWR(
    api.picturesAPI,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  const { data: categoriesData, error: categoriesError } = useSWR(
    api.categoriesAPI,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );
  const { data: authorsData, error: authorsError } = useSWR(
    api.authorsAPI,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  if (!picturesData || !categoriesData || !authorsData)
    return <GalleryLoading />;
  if (picturesError || categoriesError || authorsError)
    return (
      <div>
        Lỗi fetching: {picturesError.message} và {categoriesError.message} và{" "}
        {authorsError.message}
      </div>
    );
  return (
    // <Suspense fallback={<GalleryLoading />}>
    <GalleryPage
      pictures={picturesData.pictures}
      categories={categoriesData.categories}
      authors={authorsData.authors}
    />
    // </Suspense>
  );
}
export default GalleryWrap;
