import { useEffect, useState } from "react";
import type { Album } from "../pages/api/artists/albums/[artistId]";
import { getAlbumsByArtistId } from "../lib/data-provider-utils";

type Props = { artistId: string; onAlbumSelected: (album: Album) => void };

export default function AlbumList({ artistId, onAlbumSelected }: Props) {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    async function getAlbums() {
      const albumList = await getAlbumsByArtistId(artistId);
      setAlbums(albumList);
    }

    getAlbums();
  }, [artistId]);

  return (
    <div className={"col-span-4 col-start-2 mt-20"}>
      <div className={"flex flex-wrap justify-center gap-14 text-gray-300"}>
        {albums.map(({ title, coverLink, tracklist, id }, i) => {
          return (
            <div
              onClick={() =>
                onAlbumSelected({ title, coverLink, tracklist, id })
              }
              className={
                "flex w-1/6 cursor-pointer  flex-col items-center text-cyan-500"
              }
              key={title + i}
            >
              <img alt={"Album cover art"} src={coverLink} className={"mb-6"} />
              <p>{title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
