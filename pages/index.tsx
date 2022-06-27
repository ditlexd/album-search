import type { NextPage } from "next";
import { useEffect, useState } from "react";
import AutoComplete from "../components/auto-complete";
import AlbumList from "../components/album-list";
import { Artist } from "./api/artists/[artist]";
import AlbumInfo from "../components/album-info";
import { Album } from "./api/artists/albums/[artistId]";
import { getArtistByQuery } from "../lib/data-provider-utils";

const Home: NextPage = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [selectedArtistId, setSelectedArtistId] = useState<Pick<
    Artist,
    "id"
  > | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  async function getArtists(query: string) {
    const fetchedArtists = await getArtistByQuery(query);
    setArtists(fetchedArtists);
  }

  async function onArtistSelected(artist: Pick<Artist, "id">) {
    setSelectedArtistId(artist);
    setSelectedAlbum(null);
  }

  return (
    <div className={"grid min-h-screen w-screen grid-cols-6 bg-black pt-10"}>
      <div className={"col-span-4 col-start-2"}>
        <AutoComplete
          onSelect={onArtistSelected}
          onInputChange={getArtists}
          items={artists.map(({ name, id }) => {
            return { displayValue: name, id };
          })}
        />
        {selectedAlbum && <AlbumInfo album={selectedAlbum} />}
        {selectedArtistId && (
          <AlbumList
            onAlbumSelected={setSelectedAlbum}
            artistId={selectedArtistId.id}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
