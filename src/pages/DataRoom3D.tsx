// React import 
import { createContext } from "react";
// Local import
import { MapView3D } from "../assets/esri/Map3D";
import { DataRoomAside } from "../assets/components/DataRoomAside";
import { DataRoomNav } from "../assets/components/DataRoomNav";

// context for data state
export const searchContext = createContext<any>(null);

// data room parent page
export const DataRoom3D = () => {

    return ( // I need to implement some features in 3D??
        <div className="flex flex-col"> 
            <DataRoomNav />
            <div className="flex h-screen flex-row">
                <DataRoomAside />
                    <MapView3D />
            </div>
        </div>
    );
}