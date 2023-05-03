// Import images
import banner from '../../images/minsight/banner.jpg';

/*
Refactored from the "With Stats" page header example from the following link
https://tailwindui.com/components/preview#component-10058606cac5398d7fa2c73b64089874
*/

// Update numbers below according to how much data is in the database

const fullDataBase = [
    { name: 'Drilling', value: '0' },
    { name: 'Geochemistry', value: '0' },
    { name: 'Geophysics', value: '0'},
    { name: 'Reports', value: '0' },
]

const weeklyDataBase = [
    { name: 'Drilling', value: '0' },
    { name: 'Geochemistry', value: '0' },
    { name: 'Geophysics', value: '0'},
    { name: 'Reports', value: '0' },
]

export function AvailableData() {
return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img
            src={banner}
            alt="Minsight Banner"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        />
        <div className="m-5 max-w-auto p-10 rounded-lg backdrop-blur-sm">
            <div className="mx-auto max-w-3xl lg:mx-0">
                <h1 className="mt-5 text-4xl font-bold leading-8 text-black">
                    Available in the Data Room
                </h1>
                <div className="mx-auto mt-5 max-w-2xl">
                    <dl className="mt-5 grid grid-cols-4 gap-4 ">
                        {fullDataBase.map((stat) => (
                        <div key={stat.name} className="flex flex-col-reverse">
                            <dt className="text-lg leading-7 text-black">{stat.name}</dt>
                            <dd className="text-2xl font-semibold leading-9 tracking-tight text-black">{stat.value}</dd>
                        </div>
                        ))}
                    </dl>
                </div>
                <h2 className="mt-5 text-3xl font-bold leading-8 text-black">
                    Added this month
                </h2>
                <div className="mx-auto mt-5 max-w-2xl">
                    <dl className="mt-5 grid grid-cols-4 gap-4 ">
                        {weeklyDataBase.map((stat) => (
                        <div key={stat.name} className="flex flex-col-reverse">
                            <dt className="text-lg leading-7 text-black">{stat.name}</dt>
                            <dd className="text-2xl font-semibold leading-9 tracking-tight text-black">{stat.value}</dd>
                        </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    </div>
)
}
