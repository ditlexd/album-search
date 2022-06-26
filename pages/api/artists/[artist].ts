import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  artists: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { artist } = req.query;

  if (typeof artist !== "string") {
    res.status(400).end();
    return;
  }

  const artists = await fetch(
    `https://api.deezer.com/search/artist?q=${artist}`
  );
  const { data }: { data: any[] } = await artists.json();
  console.log(data.slice(0, 5).map((i) => i.name));
  const artistList: string[] = data.slice(0, 10).map(({ name }) => name);
  res.status(200).json({ artists: artistList });
}
