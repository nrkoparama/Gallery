"use client";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

import PicturePage from "../../../components/picture";
import type Picture from "../../../models/picture";

function PictureWrap() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const fetcher = async (url: string) =>
    fetch(url).then((res: any) => res.json());
  const { data, error } = useSWR(
    id ? `http://localhost:3000/pictures/${id}` : null,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );
  if (!data) return <div></div>;
  if (error) return <div>Lỗi fetching data : {error.message}</div>;
  const picture = data.picture as Picture;
  return <PicturePage picture={picture} />;
}
export default PictureWrap;
