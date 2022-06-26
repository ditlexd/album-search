import { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";

type Data = {
  title: string;
  coverLink: string;
  trackList: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { artistId } = req.query;

  if (typeof artistId !== "string") {
    res.status(400).end();
    return;
  }

  const albums = await fetch(
    `https://api.deezer.com/artist/${artistId}/albums`
  ).then((r) => r.json());

  console.log(albums);
}
