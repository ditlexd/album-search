import { NextApiRequest, NextApiResponse } from "next";
import { Album } from "../[artistId]";

export type Track = {
  title: string;
  duration: number;
  artist: { name: string };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Track[]>
) {
  const { albumId } = req.query;

  if (typeof albumId !== "string") {
    res.status(400).end();
    return;
  }

  const trackList = await fetch(
    `https://api.deezer.com/album/${albumId}/tracks`
  ).then((res) => res.json());

  const list = trackList.data.map(({ title, duration, artist }: Track) => ({
    title,
    duration: parseDuration(duration),
    artist,
  }));

  res.status(200).send(list);
}
function parseDuration(duration: number) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return minutes + ":" + seconds;
}
