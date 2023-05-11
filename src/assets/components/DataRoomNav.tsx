// React imports
import { Fragment, useContext } from 'react';
// API import
import { Disclosure, Menu, Transition } from '@headlessui/react';
// Local import
import { toolList } from '../esri/styling';
import { WidgetContext } from '../../pages/DataRoom'

// funciton to map variably sized objects to menu items
function populateToolList(fields: Array<string>, toggle: Function, tools: Array<string>, active: Array<Boolean>) {
    
    // initiate array to form drop down menu
    const items: Array<any> = [];

    // loop through fields in each nav tools butotn
    for (let i: number = 0; i < fields.length; i++) {
        let index: number = tools.indexOf(fields[i]);
        items.push(
        <Menu.Item as='div' key={i}>
            {() => (
            // button to toggle ArcGIS widgets
            <button
                onClick={() => {
                    // update props
                    toggle(index)               
                }} 
                // style button based on active
                className={classNames(active[index] ? 'bg-gray-100' : '', 'w-full block px-4 py-2 text-sm text-gray-700')}
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

export function DataRoomNav() { //props: any
    
    // reference tools array with all nav tool options
    let count: number = 0;
    let tools: Array<string> = [];
    for (let i: number = 0; i < toolList.length; i++) {
        count += toolList[i].fields.length
        tools.push(...toolList[i].fields)
    }

    // get state defined in dataroom as context 
    const [widget, setWidget] = useContext(WidgetContext); 


    // toggle boolean value in stateful array
    function toggle(j: number) {
        // // define widget array of previous state
        // let widget: Array<Boolean> = props.props
        // // update state of clicked index 
        // widget[j] = !widget[j]
        // // update props
        // props.setValue(widget);
        // initalize state with array of false
        let updateWidget: Array<Boolean> = widget
        updateWidget[j] = !widget[j]
        setWidget(updateWidget)
        // console.log(widget)
    }

    return (
        <Disclosure as="nav" className="bg-black">
            <div className="mx-auto w-full px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16">
                    <div className="flex flex-1 justify-center sm:items-stretch sm:justify-end">                     
                        {/* Key warning starts here */}
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {toolList.map((tool) => (
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
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {populateToolList(tool.fields, toggle, tools, widget)}
                                            {/* {populateToolList(tool.fields, toggle, tools, props.props)} */}
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