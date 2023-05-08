// local import
import { MapView } from "../assets/esri/map";
import { DataRoomAside } from "../assets/components/DataRoomAside"
import { DataRoomNav } from "../assets/components/DataRoomNav"


export const DataRoom = () => {
    return (
        <div className="flex flex-col "> 
            <DataRoomNav/>
            <div className="flex h-screen flex-row">
                <DataRoomAside/>
                <MapView/>
            </div>
        </div>
    );
}