// React imports
import { Fragment } from 'react';
import { useSearchParams } from "react-router-dom";
// API import
import { Disclosure, Menu, Transition  } from '@headlessui/react';
// Local import
import { dataList } from '../esri/utils';

// funciton to map variably sized objects to menu items
function populateToolList(buttonOptions: string[]) {
  // buttonName: name of the button being rendered in external map function
  // buttonOptions: dropdown options associated with each button

  // flattened array of tool options in dropdown
  const data: Array<string> = dataList.map(({fields}) => fields).flat()

  // get state as URL search params from context
  const [searchParams, setSearchParams] = useSearchParams({Basemap: "imagery", Utilities: "", Widgets: "", Sliders: "", filters:""}); 

  // set active list for button styling
  let active =  Array(data.length).fill(false)

  // array of search param key value pairs
  const params: any[] = [];
  searchParams.forEach((value: string, key: string) => {
      params.push([key, value])
  });

  // manipulate filter portion of the route and convert to array
  const dataFilter = params.filter(([key, _]) => key==='filters')[0].slice(1)[0].split('-')

  // get all the active data menu buttons
  for (const s of dataFilter) {
    active[data.indexOf(s)] = !active[data.indexOf(s)]
  }

  // map fields to array of menu items
  const items = buttonOptions.map((field) => (
    <Menu.Item as='div' key={data.indexOf(field)}>
      <button
          onClick={() => {
            // remove if field is in array
            if (dataFilter.includes(field)) {
              dataFilter.splice(dataFilter.indexOf(field), 1)
            } else {
              // append to array of filter options
              dataFilter.push(field)
            }        

            // reconstruct object from search params key value pairs
            const currentSearchParams = Object.fromEntries(params);

            // join array based on delimeter to filters
            currentSearchParams["filters"] = dataFilter.join('-')

            // set the new search params
            setSearchParams(currentSearchParams)
        }} 

        // style button based on active
        className={classNames(active[data.indexOf(field)] ? 'bg-gray-100' : '', 'w-full block px-4 py-2 text-sm text-gray-700')}
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

// aside data list for the data room
export function DataRoomAside() {

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
                      {populateToolList(item.fields)}
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