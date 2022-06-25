import type { NextPage } from "next";
import { useEffect } from "react";
import AutoComplete from "../components/auto-complete";

const Home: NextPage = () => {
  fetch("/api/hello");
  return (
    <div className={"grid h-screen w-screen grid-cols-6 bg-black pt-10"}>
      <div className={"col-span-4 col-start-2"}>
        <AutoComplete onInputChange={(s) => {}} />;
      </div>
    </div>
  );
};

export default Home;
