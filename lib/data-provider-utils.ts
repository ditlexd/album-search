import { Artist } from "../pages/api/artists/[artist]";
import { Album } from "../pages/api/artists/albums/[artistId]";
import { Track } from "../pages/api/artists/albums/tracks/[albumId]";

const throwIfNotOk = (res: Response) => {
  if (!res.ok) {
    throw new Error("Could not fetch artists. Error code: " + res.status);
  }
  return res;
};

export function getArtistByQuery(query: string): Promise<Artist[]> {
  return fetch("/api/artists/" + query)
    .then(throwIfNotOk)
    .then((res) => res.json());
}

export function getAlbumsByArtistId(artistId: string): Promise<Album[]> {
  return fetch(`/api/artists/albums/${artistId}`)
    .then(throwIfNotOk)
    .then((res) => res.json());
}

export function getTrackListByAlbumId(albumId: string): Promise<Track[]> {
  return fetch("/api/artists/albums/tracks/" + albumId)
    .then(throwIfNotOk)
    .then((res) => res.json());
}
