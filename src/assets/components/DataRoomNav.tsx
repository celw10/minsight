// React imports
import { Fragment } from 'react';
// API import
import { Disclosure, Menu, Transition } from '@headlessui/react';
// Local import
import { ToggleSketch } from '../esri/styling';


// menu object 
type toolList = {
    id: number;
    name: string; 
    fields: Array<string>;
    operator: Array<any>;
}
const toolList = [
    {id: 0, name: "Widgets", fields: ["sketch", "zoom", "view"], operator: ["sketch", "zoom", "view"]},
    {id: 1, name: "Analysis", fields: ["Plot", "Table"], operator: ["Plot", "Table"]},
    {id: 2, name: "Perspective", fields: ["2D", "3D"], operator: ["2D", "3D"]},
]

// funciton to map variably sized objects to menu items
function populateToolList(fields: Array<string>, operator: Array<any>) {
    const items: Array<any> = [];
    for (let i: number = 0; i < fields.length; i++) {
        items.push(
        <Menu.Item key={i}>
            {({ active }) => (
            // This is going to have to be linked to JS that adds the menu widget
            <button
                onClick={(event: any) => {
                    <ToggleSketch/> //console.log(operator[i])
                }} // i need a mousebutton click funciton here to enable the action
                className={classNames(active ? 'bg-gray-100' : '', 'w-full block px-4 py-2 text-sm text-gray-700')}
            >
                {fields[i]}
            </button>
            )}
        </Menu.Item>
        )
    }
    return <Menu.Items>{items}</Menu.Items>
}

// this is for the drop down user menu
function classNames(...classes: any[]) { // typescript for spread operator?
    return classes.filter(Boolean).join(' ')
}

export function DataRoomNav() {
    return (
        <Disclosure as="nav" className="bg-black">
            <div className="mx-auto w-full px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16">
                    <div className="flex flex-1 justify-center sm:items-stretch sm:justify-end">                     
                        {/* Key warning starts here */}
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {toolList.map((tool) => (
                                <Menu key={tool.id} as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="flex rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <div className='text-white px-3 py-2 text-sm font-medium'> {tool.name} </div>
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {populateToolList(tool.fields, tool.operator)}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Disclosure>
    );
}