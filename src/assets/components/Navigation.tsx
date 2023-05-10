// React imports
// import { Fragment } from 'react'; - future implementation
// Router import
import { NavLink } from 'react-router-dom';
// API import
import { Disclosure } from '@headlessui/react'; // Menu, and Transition - future implementaiton
// Local imports
import logo from '../../images/minsight/MinsightRockLogo.png';

/*
Refactored from the "Simple dark with menu button on left" navbar example from the following link
https://tailwindui.com/components/preview#component-10058606cac5398d7fa2c73b64089874
*/

const navigation = [
  { name: 'Home', to: '/'},
  { name: 'Data Room', to: 'dataroom'},
  { name: 'Contact', to: 'Contact'},
  // { name: 'Account', to: 'account'}, - future implementation
]

// function for mapping nav links to the nav bar
function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export function Navigation() {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {() => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                
                {/* Logo */}
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:block"
                    src={logo}
                    alt="Minsight"
                  />
                </div>

                {/* Web-app Navigation */}
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.to}
                        className={({isActive}) => classNames(
                          isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium' 
                        )}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>

            {/* Profile section for Future Implementation 
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={profile}
                        alt="Profile"
                      />
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
                      <Menu.Item>
                        {({ active }) => (
                          // Need to change a tag to Link when linked page is avaliable?
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          // Need to change a tag to Link when linked page is avaliable?
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          // Need to change a tag to Link when linked page is avaliable?
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              */}
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
}