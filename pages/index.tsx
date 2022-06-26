import type { NextPage } from "next";
import { useEffect, useState } from "react";
import AutoComplete from "../components/auto-complete";

const people = [
  "Prince",
  "Prince & The Revolution",
  "Prince Royce",
  "Eminem",
  "Nirvana",
];

const Home: NextPage = () => {
  const [artists, setArtists] = useState<string[]>([]);

  async function fetchArtists(query: string) {
    console.log("Fetching");
    const fetchedArtists = await fetch("/api/artists/" + query).then((res) =>
      res.json()
    );

    console.log(fetchedArtists);

    setArtists(fetchedArtists.artists);
  }

  return (
    <div className={"grid h-screen w-screen grid-cols-6 bg-black pt-10"}>
      <div className={"col-span-4 col-start-2"}>
        <AutoComplete
          onInputChange={fetchArtists}
          items={artists.map((p) => {
            return { displayValue: p };
          })}
        />
        ;
      </div>
    </div>
  );
};

export default Home;
