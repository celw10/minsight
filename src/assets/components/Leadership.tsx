// Import images
import chris from "../../images/personnel/cw_headshot.jpg";
import brandon from "../../images/personnel/br_headshot.jpg";

const people = [
    {
        name: 'Chris Williams',
        role: 'Co-Founder / CEO',
        imageUrl: chris,
        bio: 'Chris has a BSc. and MSc. from MUN in Earth Sciences. He worked as a geoscientist in mineral exploration for over two years and is currently a student at Get Coding.', 
    },
    {
        name: 'Brandon Randell',
        role: 'Co-Founder / COO',
        imageUrl: brandon,
        bio: 'Brandon has a BSc in Earth Sciences and Education. He is a current MBA student at MUN while working as a Financial Advisor at TD.',
    },
]

/*
Refactored from the "With Small Images" teams page from the following link
https://tailwindui.com/components/preview#component-10058606cac5398d7fa2c73b64089874
*/

export function Leadership() {
    return (
        <div className="py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
            <div className="max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our founders</h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                    Working hard to make historical mineral exploraiton data more accessable for all.
                </p>
            </div>
            <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
            {people.map((person) => (
                <li key={person.name}>
                    <div className="flex items-center gap-x-6">
                        <img className="h-16 w-16 rounded-full" src={person.imageUrl} alt="" />
                        <div>
                            <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                            <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                        </div>
                    </div>
                    <p className="mt-2 text-base leading-8 text-gray-600">
                        {person.bio}
                    </p>
                </li>
            ))}
            </ul>
        </div>
        </div>
    );
}