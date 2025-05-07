import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import React from 'react';

export const FilterOption = ({ title, options, selected, setSelected }) => (
  <Menu as="div" className="relative inline-block text-left">
    <div>
      <Menu.Button className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none">
        {selected || title}
        <ChevronDownIcon className="w-4 h-4 ml-2" aria-hidden="true" />
      </Menu.Button>
    </div>

    <Menu.Items className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
      <div className="py-1">
        {options.map((option, index) => (
          <Menu.Item key={index}>
            {({ active }) => (
              <button
                onClick={() => setSelected(option)}  // ✅ handles selection
                className={`${
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                } block px-4 py-2 text-sm w-full text-left`}
              >
                {option}
              </button>
            )}
          </Menu.Item>
        ))}
      </div>
    </Menu.Items>
  </Menu>
);
