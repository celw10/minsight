// local import
import {Navigation, Footer} from "./components/menu"
import {MapView} from "./esri/map"

export const Main = () => {
    return (
        <div className="flex flex-col h-full w-full p-0 m-0">
            <div className="flex-initial w-full">
                <Navigation/>
            </div>

            <div className="flex-auto">
                <MapView/>
            </div>

            <div className="flex-initial w-full">
                <Footer/>
            </div>
        </div>
    );
}