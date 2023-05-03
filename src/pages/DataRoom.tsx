// local import
// import {Navigation, Footer} from "./menu"
import {MapView} from "../assets/esri/map";

export const DataRoom = () => {
    return (
        <div className="flex flex-col h-full w-full p-0 m-0"> 

            <div className="flex-auto">
                <MapView/>
            </div>

        </div>
    );
}