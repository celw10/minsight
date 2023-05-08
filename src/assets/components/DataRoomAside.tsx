// API import
import { Disclosure } from '@headlessui/react';

export function DataRoomAside() {
    return (
      <Disclosure as="aside" className="bg-black">
        {() => (
          <>
            <div className="mx-auto max-w-sm px-2 sm:px-6 lg:px-8">
              <div className="relative flex flex-col items-center justify-between">

                <span className='text-white'> Content </span>

              </div>
            </div>
          </>
        )}
      </Disclosure>
    )
  }