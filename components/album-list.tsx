import { useEffect, useState } from "react";
import type { Album } from "../pages/api/artists/albums/[artistId]";

type Props = { artistId: string };

export default function AlbumList({ artistId }: Props) {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    async function fetchAlbums() {
      const albumList = await fetch(`/api/artists/albums/${artistId}`).then(
        (res) => res.json()
      );
      setAlbums(albumList);
    }

    fetchAlbums();
  }, [artistId]);

  return (
    <div className={"col-span-4 col-start-2 mt-20"}>
      <h2 className={"text-cyan-500"}>ALBUMS</h2>
      <div className={"flex flex-wrap justify-center gap-14 text-gray-300"}>
        {albums.map(({ title, coverLink }, i) => {
          return (
            <div
              className={"flex w-1/6 flex-col items-center text-cyan-500"}
              key={title + i}
            >
              <img src={coverLink} className={"mb-6"} />
              <p>{title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
