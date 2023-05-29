// Local import
import { MapView2D } from "../assets/esri/Map2D";
import { DataRoomAside } from "../assets/components/DataRoomAside";
import { DataRoomNav } from "../assets/components/DataRoomNav";

// data room parent page
export const DataRoom2D = () => {

    // return the 2D data room components
    return (
        <div className="flex flex-col"> 
            <DataRoomNav />
            <div className="flex h-screen flex-row">
                <DataRoomAside />
                    <MapView2D />
            </div>
        </div>
    );
}