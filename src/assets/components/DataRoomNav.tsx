// React imports
import { Fragment } from 'react';
import { useSearchParams } from "react-router-dom";

// API import
import { Disclosure, Menu, Transition } from '@headlessui/react';
// Local import
import { toolList } from '../esri/utils';

// funciton to map variably sized objects to menu items
function populateToolList(buttonName: string, buttonOptions: string[]) {
    // buttonName: name of the button being rendered in external map function
    // buttonOptions: dropdown options associated with each button

    // flattened array of tool options in dropdown
    const tools: Array<string> = toolList.map(({fields}) => fields).flat()

    // get state as URL search params from context
    const [searchParams, setSearchParams] = useSearchParams({Basemap: "imagery", Utilities: "", Widgets: "", Sliders: "", filters:""}); 

    // set active list for button styling
    let active =  Array(tools.length).fill(false)

    // array of search param key value pairs
    const params: any[] = [];
    searchParams.forEach((value: string, key: string) => {
        params.push([key, value])
    });
    
    // get all the active nav menu button options
    for (const s of params.map(x => x[1])){
        if ( s != "" && s != "filters") {
            active[tools.indexOf(s)] = !active[tools.indexOf(s)]
        }
    }
        

    // map fields to array of menu items
    const items = buttonOptions.map((field) => (
        <Menu.Item as='div' key={tools.indexOf(field)}>
            <button
                onClick={() => {
                    // reconstruct object from search params key value pairs
                    const currentSearchParams = Object.fromEntries(params);

                    // menu toggling options
                    if (["Basemap"].includes(buttonName)) {
                        // these fields cannot be toggled off
                        currentSearchParams[buttonName] = field;
                    } else if (currentSearchParams[buttonName] === field) {
                        // toggle off 
                        currentSearchParams[buttonName] = ""
                    } else {
                        // toggle on
                        currentSearchParams[buttonName] = field;
                    }

                    // set the new search params
                    setSearchParams(currentSearchParams)

                    let test = new URLSearchParams(document.location.search)
                    console.log(new URLSearchParams(document.location.search).get(buttonName) === field)
                    // console.log(field in params.get(buttonName))
                }} 

                // style button based on active
                className={classNames(active[tools.indexOf(field)] ? 'bg-gray-100' : '', 'w-full block px-4 py-2 text-sm text-gray-700')}
            >
                {field}
            </button>
        </Menu.Item>
    ));

    // return individual drop down menu
    return <Menu.Items>{items}</Menu.Items>
}

// this is for the drop down user menu
function classNames(...classes: any[]) { // typescript for spread operator?
    return classes.filter(Boolean).join(' ')
}

// navigation tool bar for the data room
export function DataRoomNav() {

    return (
        <Disclosure as="nav" className="bg-gray-900">
            <div className="mx-auto w-full px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16">
                    <div className="flex flex-1 justify-center sm:items-stretch sm:justify-end">                     
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {toolList.map((tool) => (
                                // insert the menu buttons
                                <Menu key={tool.id} as="div" className="relative ml-3 z-auto">
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
                                        {/* construct the drop down menu */}
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {populateToolList(tool.name, tool.fields)}
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