import { useState } from "react";
import { Combobox } from "@headlessui/react";

type Props = {
  onInputChange: (input: string) => void;
  items: { displayValue: string }[];
};
export default function AutoComplete({ onInputChange, items }: Props) {
  const [selectedPerson, setSelectedPerson] = useState(null);

  async function inputChanged(input: string) {
    onInputChange(input);
  }

  return (
    <div className={"flex w-full gap-4"}>
      <Combobox
        value={selectedPerson}
        onChange={(person) => setSelectedPerson(person)}
      >
        <div className={"relative w-full"}>
          <Combobox.Input
            className={"h-20 w-full bg-gray-800 pl-2 text-3xl text-gray-300"}
            onChange={(event) => inputChanged(event.target.value)}
          />
          <Combobox.Options>
            <div
              className={"absolute w-full  bg-gray-800 text-xl text-gray-400"}
            >
              <p className={"pl-1"}>Search results</p>
              <div>
                {items.map(({ displayValue }, i) => (
                  <Combobox.Option key={displayValue + i} value={displayValue}>
                    {({ selected, active }) => (
                      <p className={active ? "bg-white" : "" + "pl-3"}>
                        {displayValue}
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
