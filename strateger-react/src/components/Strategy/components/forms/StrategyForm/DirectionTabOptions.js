import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const dropdownOptions = ['1m', '5m', '15m', '30m', '1h', '4h','D', 'W', 'M']; // Example options

const renderDropdownMenu = (label, name, value, handleChange) => (
  <div className="mb-1 grid grid-cols-4 gap-4">
    <label className="block text-gray-700 mr-2 col-span-3 text-right">{label}</label>
    <Menu as="div" className="text-left col-span-1">
      <Menu.Button className="inline-flex justify-between w-full border border-gray-300 rounded-md shadow-sm p-2 text-left bg-white text-gray-700 hover:bg-gray-50">
        {value}
        <ChevronDownIcon className="w-5 h-5 text-gray-500" />
      </Menu.Button>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 mt-2 w-full bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none">
          {dropdownOptions.map((option) => (
            <Menu.Item key={option}>
              {({ active }) => (
                <button
                  type="button"
                  onClick={() => handleChange({ target: { name, value: option } })}
                  className={`${
                    active ? 'bg-blue-100' : ''
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  {option}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  </div>
);

const renderInputField = (label, name, value, handleChange) => (
  <div className="mb-4 grid grid-cols-4 gap-4">
    <label className="block text-gray-700 col-span-3 text-right pt-2">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={handleChange}
      className="border border-gray-300 rounded-md shadow-sm p-2 col-span-1"
    />
  </div>
);

const DirectionTabOptions = ({ prefix, formState, handleChange }) => (
  <div className="grid grid-cols-2 gap-4">
    <div className="col-span-1">
      {renderDropdownMenu(`${prefix} Entry Order`, `${prefix.toLowerCase()}EntryOrder`, formState[`${prefix.toLowerCase()}EntryOrder`], handleChange)}
      {renderDropdownMenu(`${prefix} Close Order`, `${prefix.toLowerCase()}CloseOrder`, formState[`${prefix.toLowerCase()}CloseOrder`], handleChange)}
      {renderDropdownMenu(`${prefix} Entry Indicator`, `${prefix.toLowerCase()}EntryIndicator`, formState[`${prefix.toLowerCase()}EntryIndicator`], handleChange)}
      {renderDropdownMenu(`${prefix} Close Indicator`, `${prefix.toLowerCase()}CloseIndicator`, formState[`${prefix.toLowerCase()}CloseIndicator`], handleChange)}
    </div>
    <div className="col-span-1">
      {renderInputField(`${prefix} Pyramiding`, `${prefix.toLowerCase()}Pyramiding`, formState[`${prefix.toLowerCase()}Pyramiding`], handleChange)}
      {renderInputField(`${prefix} Leverage`, `${prefix.toLowerCase()}Leverage`, formState[`${prefix.toLowerCase()}Leverage`], handleChange)}
      {renderInputField(`${prefix} Quantity`, `${prefix.toLowerCase()}Quantity`, formState[`${prefix.toLowerCase()}Quantity`], handleChange)}
    </div>
  </div>
);

export default DirectionTabOptions;
