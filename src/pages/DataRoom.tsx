// React import 
import { createContext, useState } from "react";
// Local import
import { MapView } from "../assets/esri/Map";
import { DataRoomAside } from "../assets/components/DataRoomAside";
import { DataRoomNav } from "../assets/components/DataRoomNav";
import { toolList } from "../assets/esri/utils";

// flattened array of tool options
const tools: Array<string> = toolList.map(({fields}) => fields).flat()


export const WidgetContext = createContext<any>(null);

export const DataRoom = () => {

    // initiate boolean array for nav tool toggling - set initial view in 2D
    const [widget, setWidget] = useState(Array(tools.length).fill(false)
                                .fill(true, tools.indexOf('2D'), tools.indexOf('2D') + 1) // default 2D view
                                .fill(true, tools.indexOf('imagery'), tools.indexOf('imagery') + 1)) // default imagery basemap

    return (
        <div className="flex flex-col"> 
            {/* <DataRoomNav func={pull_data}/> */}
            <WidgetContext.Provider value={[widget, setWidget]}>
                <DataRoomNav />
                {/* In above: setValue={setValue} props={value} */}
                <div className="flex h-screen flex-row">
                    <DataRoomAside />
                        <MapView />
                        {/* props={value} */}
                </div>
            </WidgetContext.Provider>
        </div>
    );
}