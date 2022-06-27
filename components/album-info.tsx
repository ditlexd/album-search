import { Album } from "../pages/api/artists/albums/[artistId]";
import { useEffect, useState } from "react";
import { Track } from "../pages/api/artists/albums/tracks/[albumId]";
import { getTrackListByAlbumId } from "../lib/data-provider-utils";

type Props = { album: Album };

export default function AlbumInfo({ album }: Props) {
  const [trackList, setTrackList] = useState<Track[]>([]);

  useEffect(() => {
    async function getTrackList(album: Album) {
      const tracklist = await getTrackListByAlbumId(album.id);
      setTrackList(tracklist);
    }
    getTrackList(album);
  }, [album]);

  if (trackList.length === 0) return null;

  return (
    <div className={"flex w-full pt-20"}>
      <img className={"h-1/3"} src={album.coverLink} />
      <div className={"ml-8 w-full"}>
        <h2 className={"mb-10 text-5xl text-cyan-500"}>{album.title}</h2>
        <table className={"w-full text-left text-gray-300"}>
          <thead className={"font-bold text-gray-200"}>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Artist</th>
              <th>Time</th>
              <th>Released</th>
            </tr>
          </thead>
          <tbody className={"bg-gray-900"}>
            {trackList.map((track, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{track.title}</td>
                  <td>{track.artist.name}</td>
                  <td>{track.duration}</td>
                  <td>2011</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
