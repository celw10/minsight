// React import 
import { createContext, useState } from "react";
// Local import
import { MapView } from "../assets/esri/Map";
import { DataRoomAside } from "../assets/components/DataRoomAside";
import { DataRoomNav } from "../assets/components/DataRoomNav";
import { toolList } from "../assets/esri/styling";

// reference tools array with all nav tool options
// Make this a function I use it twice!
let count: number = 0;
let tools: Array<string> = [];
for (let i: number = 0; i < toolList.length; i++) {
    count += toolList[i].fields.length
    tools.push(...toolList[i].fields)
}

export const WidgetContext = createContext<any>(null);

export const DataRoom = () => {

    // initiate boolean array for nav tool toggling - set initial view in 2D
    const [widget, setWidget] = useState(Array(count).fill(false)
                                .fill(true, tools.indexOf('2D'), tools.indexOf('2D')+1))

    return (
        <div className="flex flex-col"> 
            {/* <DataRoomNav func={pull_data}/> */}
            <WidgetContext.Provider value={[widget, setWidget]}>
                <DataRoomNav />
                {/* In above: setValue={setValue} props={value} */}
                <div className="flex h-screen flex-row">
                    <DataRoomAside/>
                        <MapView />
                        {/* props={value} */}
                </div>
            </WidgetContext.Provider>
        </div>
    );

}