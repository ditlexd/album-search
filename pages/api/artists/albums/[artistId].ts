import { NextApiRequest, NextApiResponse } from "next";
import exp from "constants";

export type Album = {
  title: string;
  coverLink: string;
  tracklist: string;
  id: string;
  release_date: Date;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Album[]>
) {
  const { artistId } = req.query;

  if (typeof artistId !== "string") {
    res.status(400).end();
    return;
  }

  const albums: { data: Array<Album & { cover_medium: string }> } = await fetch(
    `https://api.deezer.com/artist/${artistId}/albums`
  ).then((r) => r.json());

  const list: Album[] = albums.data.map(
    ({ title, cover_medium, tracklist, id, release_date }) => ({
      title,
      coverLink: cover_medium,
      tracklist,
      id,
      release_date: new Date(release_date),
    })
  );

  res.status(200).send(list);
}
