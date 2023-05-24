// React import 
import { createContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
// Local import
import { MapView } from "../assets/esri/Map";
import { DataRoomAside } from "../assets/components/DataRoomAside";
import { DataRoomNav } from "../assets/components/DataRoomNav";
import { toolList, dataList } from "../assets/esri/utils";

// flattened array of tool options
const tools: Array<string> = toolList.map(({fields}) => fields).flat()

// context for widget state 
export const WidgetContext = createContext<any>(null);

// flattened array of data options
const features: Array<string>  = dataList.map(({fields}) => fields).flat()

// context for data state
export const DataContext = createContext<any>(null);

// data room parent page
export const DataRoom = () => {

    // initiate boolean array for nav tool toggling - initial configuation of 2D view + imagery
    const [widget, setWidget] = useState(Array(tools.length).fill(false)
                                .fill(true, tools.indexOf('2D'), tools.indexOf('2D') + 1) // default 2D view
                                .fill(true, tools.indexOf('imagery'), tools.indexOf('imagery') + 1)) // default imagery basemap

    // initialize boolean array for aside tool toggling
    const [data, setData] = useState(Array(features.length).fill(false))

    return (
        <div className="flex flex-col"> 
            <WidgetContext.Provider value={[widget, setWidget]}>
                <DataContext.Provider value={[data, setData]}>
                    <DataRoomNav />
                    <div className="flex h-screen flex-row">
                        <DataRoomAside />
                            <MapView />
                    </div>
                </DataContext.Provider>
            </WidgetContext.Provider>
        </div>
    );
}