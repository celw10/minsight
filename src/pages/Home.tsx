// Import local
import { AvailableData } from "../assets/components/AvailableData";
import { Goal } from "../assets/components/Goal";
import { Leadership } from "../assets/components/Leadership";

export const Home = () => {
    return(
        <>
            <div className="relative isolate overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
                <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
                <Goal />
                <Leadership/>
            </div>
            <AvailableData/>
        </>
    );
}
