// React import 
import { createContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
// Local import
import { MapView } from "../assets/esri/Map";
import { DataRoomAside } from "../assets/components/DataRoomAside";
import { DataRoomNav } from "../assets/components/DataRoomNav";

// context for data state
export const searchContext = createContext<any>(null);

// data room parent page
export const DataRoom = () => {

    // test
    const [searchParams, setSearchParams] = useSearchParams({Perspective: "2D", Basemap: "imagery", 
                                                             Utilities: "", Widgets: "", Sliders: "", 
                                                             filters:""});

    return (
        <div className="flex flex-col"> 
                <searchContext.Provider value={[searchParams, setSearchParams]}>
                    <DataRoomNav />
                    <div className="flex h-screen flex-row">
                        <DataRoomAside />
                            <MapView />
                    </div>
                </searchContext.Provider>
        </div>
    );
}