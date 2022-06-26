import type { NextApiRequest, NextApiResponse } from "next";

export type Artist = { name: string; id: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Artist[]>
) {
  const { artist } = req.query;

  if (typeof artist !== "string") {
    res.status(400).end();
    return;
  }

  const { data }: { data: any[] } = await fetch(
    `https://api.deezer.com/search/artist?q=${artist}`
  ).then((r) => r.json());

  const artistList = data.slice(0, 10).map(({ name, id }) => ({ name, id }));
  res.status(200).json(artistList);
}
