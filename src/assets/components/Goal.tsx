// Image import
import name from '../../images/minsight/MinsightWordLogo.png';

/*
Refactored from the "Simple Centered" page testimonials example from the following link
https://tailwindui.com/components/preview#component-10058606cac5398d7fa2c73b64089874
*/

export function Goal() {
    return (
      <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <img className="mx-auto h-12" src={name} alt="Minsight" />
          <figure className="mt-10">
            <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
              <p>
                We aim to digitize and compose a complete database of historical mineral exploration results for explorers and investors in the industry.
              </p>
            </blockquote>
          </figure>
        </div>
      </section>
    )
  }