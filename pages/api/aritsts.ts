import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const artist = await fetch(`https://api.deezer.com/search/artist?q=emine`);
  const { data }: { data: any[] } = await artist.json();
  console.log(data.slice(0, 5));
  res.status(200).json({ name: "json" });
}
