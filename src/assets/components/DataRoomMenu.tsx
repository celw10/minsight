// React imports
import { Fragment } from 'react';
// API import
import { Disclosure, Menu, Transition  } from '@headlessui/react';

// consolodate classname
function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

// aside data list for the data room
export function DataRoomMenu(props: any) {
  //* 
  // contents: toolList (nav) or dataList (aside) from utils.tsx
  // type: either "nav" (API tools) or "asid"e (data) from various sources (REST Server, internal database, ect...)
  //*

  // array of search param key value pairs
  const params: any[] = [];
  props.searchParams.forEach((value: string, key: string) => {
      params.push([key, value])
  });

  // manipulate filter portion of the route and convert to array
  let dataFilter = params.filter(([key, _]) => key==='filters')[0].slice(1)[0].split('-')

  return (
    // disclosure as type "aside" (data) or "nav" (API)
    <Disclosure as={props.type} className="bg-gray-900">
        <div className={props.type === "aside" ? "mx-auto max-w-sm px-2 sm:px-6 lg:px-8"
                                         : "mx-auto w-full px-2 sm:px-6 lg:px-8"}>
          <div className={props.type === "aside" ? "relative flex flex-col items-center justify-between" 
                                           : "relative flex h-16"}>
            <div className={props.type === "aside" ? "flex flex-col justify-center sm:items-stretch sm:justify-end"
                                             : "flex flex-1 justify-center sm:items-stretch sm:justify-end"}>                     
              <div className={props.type === "aside" ? "absolute inset-y-0 left-0 flex flex-col items-left pt-2 sm:static sm:inset-auto sm:mt-6 sm:pt-0" 
                                               : "absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"}>
                {/* 
                Render menu buttons as aside or nav
                NOTE: contents is either toolList (nav) or dataList (aside)
                */}
                {props.contents.map((item: any) => (
                  <Menu key={item.id} as="div" className={props.type === "aside" ? "relative mb-3 z-auto" 
                                                                                 : "relative ml-3 z-auto"}>
                    <Menu.Button className={props.type === "aside" ? "flex flex-col rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                                              : "flex rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"}>
                      <div className='text-white px-3 py-2 text-sm font-medium'> 
                        {item.name} 
                      </div>
                    </Menu.Button>
                    
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      {/* 
                      Construct a drop-down menu for each button
                      */}
                      <Menu.Items className={props.type === "aside" ? "absolute left-0 z-10 mt-2 w-48 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                              : "absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"}>
                        {item.fields.map((field: any) => (
                          <Menu.Item as='div' key={item.fields.flat().indexOf(field)}>
                            <button
                                onClick={() => {
                                  // render the appropaite data or features on click
                                  if (props.type === "aside") { //* DATA *//
                                    // remove if field is in array
                                    if (dataFilter.includes(field)) {
                                      dataFilter.splice(dataFilter.indexOf(field), 1)
                                    } else {
                                      // append to array of filter options
                                      dataFilter.push(field)
                                    }        

                                    // reconstruct object from search params key value pairs
                                    let currentSearchParams = Object.fromEntries(params);

                                    // join array based on delimeter to filters
                                    currentSearchParams["filters"] = dataFilter.join('-')

                                    // set the new search params
                                    props.setSearchParams(currentSearchParams)

                                  } else { //* ArcGIS API *//
                                    // reconstruct object from search params key value pairs
                                    const currentSearchParams = Object.fromEntries(params);

                                    // menu toggling options
                                    if (["Basemap"].includes(item.name)) {
                                        // these fields cannot be toggled off
                                        currentSearchParams[item.name] = field;
                                    } else if (currentSearchParams[item.name] === field) {
                                        // toggle off 
                                        currentSearchParams[item.name] = ""
                                    } else {
                                        // toggle on
                                        currentSearchParams[item.name] = field;
                                    }

                                    // set the new search params
                                    props.setSearchParams(currentSearchParams)
                                  };
                                }} 

                              // style button based on active
                              className={classNames(String(new URLSearchParams(document.location.search)
                                                                       .get(props.type === "aside" ? "filters" : item.name))
                                                                       .includes(field) ? 'bg-gray-100' : '', 
                                                                       'w-full block px-4 py-2 text-sm text-gray-700')}
                            >
                              {field}
                            </button>
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ))};
              </div>
            </div>
          </div>
        </div>
    </Disclosure>
    );
  }