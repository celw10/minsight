// React imports
import { Fragment, useContext } from 'react';
// API import
import { Disclosure, Menu, Transition } from '@headlessui/react';
// Local import
import { toolList } from '../esri/utils';
import { WidgetContext } from '../../pages/DataRoom'

// funciton to map variably sized objects to menu items
function populateToolList(fields: Array<string>, toggle: Function, tools: Array<string>, active: Array<Boolean>) {

    // initiate array to form drop down menu
    const items: Array<any> = [];

    // map fields to array of menu items
    fields.map((field) => (
        items.push(
            <Menu.Item as='div' key={tools.indexOf(field)}>
                {() => (
                // button to toggle ArcGIS widgets
                <button
                    onClick={() => {
                        // update state
                        toggle(tools, tools.indexOf(field), fields)               
                    }} 
                    // style button based on active
                    className={classNames(active[tools.indexOf(field)] ? 'bg-gray-100' : '', 'w-full block px-4 py-2 text-sm text-gray-700')}
                >
                    {field}
                </button>
                )}
            </Menu.Item>
            )
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
    
    //flattened array of tool options
    const tools: Array<string> = toolList.map(({fields}) => fields).flat()

    // get state defined in dataroom as context 
    const [widget, setWidget] = useContext(WidgetContext); 

    // toggle boolean value in stateful array 
    function toggle(tools: Array<string>, j: number, menu: string[]) {

        // create mutable object from widget
        let updateWidget: Array<Boolean> = widget.slice()

        // set boolean array to false for other fields in menu item - ONLY ONE ACTIVE WIDGET PER MENU
        for (let i: number = tools.indexOf(menu[0]); i < tools.indexOf(menu[menu.length - 1]) + 1; i ++) {
            updateWidget[i] = false
        }

        // toggle index in boolean array
        updateWidget[j] = !widget[j]

        // update state of widget
        setWidget(updateWidget)
    }

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
                                            {populateToolList(tool.fields, toggle, tools, widget)}
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