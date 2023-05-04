// API imports (headlessui & heroicons)
import { Disclosure } from '@headlessui/react';
// Image import
import name from '../../images/minsight/MinsightWordLogo.png';
import linkedin from "../../images/social/linkedin_icon2.png";
import github from "../../images/social/github.png";
import email from "../../images/social/email_icon.png";

/*
Refactored from the "Simple dark with menu button on left" navbar example from the following link
https://tailwindui.com/components/preview#component-10058606cac5398d7fa2c73b64089874
*/

export function Footer() {
  return (
    <Disclosure as="footer" className="bg-gray-800">
      {() => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center">
              {/* Name Image */}
              <div className="flex flex-none">
                <img
                className="block h-8 mr-2 w-auto lg:block" // Adjust when image is properly sized
                src={name}
                alt="Minsight"
                />
              </div >
              {/* Slogan */}
              <div className='flex-auto text-gray-300'>
                <span> A geologic database for modern mineral exploration </span>
              </div>
              {/* Social Media Links */}
              <div className="absolute inset-y-0 right-0 flex items-center ml-6 pr-0">
                <a href="https://www.linkedin.com/in/celw10/" className="flex-auto mr-1"> 
                    <img src={linkedin} alt="linkedin" className="h-8 w-8 rounded-lg"></img> 
                </a>

                <a href="https://github.com/celw10" className="flex-auto mx-1"> 
                    <img src={github} alt="github" className="h-8 w-8 rounded-lg"></img>
                </a>

                <a href="mailto:celw10@mun.ca" className="flex-auto ml-1"> 
                    <img src={email} alt="email" className="h-8 w-8 rounded-lg"></img>
                </a>  
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
}