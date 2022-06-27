import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { Artist } from "../pages/api/artists/[artist]";

type Item = { displayValue: string; id: string };

type Props = {
  onInputChange: (input: string) => void;
  items: Item[];
  onSelect: (item: Item) => void;
};
export default function AutoComplete({
  onInputChange,
  items,
  onSelect,
}: Props) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  async function itemSelected(item: Item) {
    setSelectedItem(item);
    onSelect(item);
  }

  async function inputChanged(input: string) {
    onInputChange(input);
  }

  return (
    <div className={"flex w-full gap-4"}>
      <Combobox value={selectedItem} onChange={itemSelected}>
        <div className={"relative w-full"}>
          <Combobox.Input
            placeholder={"Search here"}
            className={"h-20 w-full bg-gray-800 pl-2 text-3xl text-gray-300"}
            onChange={(event) => inputChanged(event.target.value)}
          />
          <Combobox.Options>
            <div
              className={"absolute w-full  bg-gray-800 text-xl text-gray-400"}
            >
              <p className={"pl-1"}>Search results</p>
              <div>
                {items.map(({ displayValue, id }, i) => (
                  <Combobox.Option
                    key={displayValue + i}
                    value={{ displayValue, id }}
                  >
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
