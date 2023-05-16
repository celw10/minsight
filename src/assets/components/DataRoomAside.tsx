// React imports
import { Fragment, useContext } from 'react';
// API import
import { Disclosure, Menu, Transition  } from '@headlessui/react';
// Local import
import { dataList } from '../esri/utils';
import { DataContext } from '../../pages/DataRoom'

// funciton to map variably sized objects to menu items
function populateToolList(fields: Array<string>, toggle: Function, features: Array<string>, active: Array<Boolean>) {

  // initiate array to form drop down menu
  const items: Array<any> = [];

  // map fields to array of menu items
  fields.map((field) => (
      items.push(
          <Menu.Item as='div' key={field}>
              {() => (
              // button to toggle datasets or feature layers
              <button
                  onClick={() => {
                      // update state
                      toggle(features.indexOf(field))
                  }} 
                  // style button based on active
                  className={classNames(active[features.indexOf(field)] ? 'bg-gray-100' : '', 'w-full block px-4 py-2 text-sm text-gray-700')}
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

// aside data list for the data room
export function DataRoomAside() {

  //flattened array of tool options
  const features: Array<string> = dataList.map(({fields}) => fields).flat()

  // get state defined in dataroom as context 
  const [data, setData] = useContext(DataContext); 

  // toggle boolean value in stateful array 
  function toggle(j: number) {

      // create mutable object from widget
      let updateData: Array<Boolean> = data.slice()

      // toggle index in boolean array
      updateData[j] = !data[j]

      // update state of widget
      setData(updateData)

   }

  return (
    <Disclosure as="aside" className="bg-gray-900">
        <div className="mx-auto max-w-sm px-2 sm:px-6 lg:px-8">
          <div className="relative flex flex-col items-center justify-between">
            <div className="flex flex-col justify-center sm:items-stretch sm:justify-end">                     
              <div className="absolute inset-y-0 left-0 flex flex-col items-left pt-2 sm:static sm:inset-auto sm:mt-6 sm:pt-0">
                {dataList.map((item) => (
                  // insert the menu buttons
                  <Menu key={item.id} as="div" className="relative mb-3 z-auto">
                    <div>
                      <Menu.Button className="flex flex-col rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <div className='text-white px-3 py-2 text-sm font-medium'> {item.name} </div>
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
                      <Menu.Items className="absolute left-0 z-10 mt-2 w-48 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {populateToolList(item.fields, toggle, features, data)}
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