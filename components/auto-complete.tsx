import { useState } from "react";
import { Combobox } from "@headlessui/react";

const people = [
  "Prince",
  "Prince & The Revolution",
  "Prince Royce",
  "Eminem",
  "Nirvana",
];

type Props = {
  onInputChange: (input: string) => void;
};
export default function AutoComplete({ onInputChange }: Props) {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className={"flex w-full gap-4"}>
      <Combobox value={selectedPerson} onChange={setSelectedPerson}>
        <div className={"relative w-full"}>
          <Combobox.Input
            className={"h-20 w-full bg-gray-800 pl-2 text-3xl text-gray-300"}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Options>
            <div
              className={"absolute w-full  bg-gray-800 text-xl text-gray-400"}
            >
              <p className={"pl-1"}>Search results</p>
              <div>
                {filteredPeople.map((person) => (
                  <Combobox.Option key={person} value={person}>
                    {({ selected, active }) => (
                      <p className={active ? "bg-white" : "" + "pl-3"}>
                        {person}
                      </p>
                    )}
                  </Combobox.Option>
                ))}
              </div>
            </div>
          </Combobox.Options>
        </div>
      </Combobox>
      <button className={"w-1/6 rounded-sm bg-teal-300"}>Search</button>
    </div>
  );
}
