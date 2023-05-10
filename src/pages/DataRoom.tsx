// React import 
import { useState } from "react";
// Local import
import { MapView } from "../assets/esri/map";
import { DataRoomAside } from "../assets/components/DataRoomAside";
import { DataRoomNav } from "../assets/components/DataRoomNav";
import { toolList } from "../assets/esri/styling";


export const DataRoom = () => {
    
    // reference tools array with all nav tool options
    let count: number = 0;
    let tools: Array<string> = [];
    for (let i: number = 0; i < toolList.length; i++) {
        count += toolList[i].fields.length
        tools.push(...toolList[i].fields)
    }


    const [value, setValue] = useState(Array(count).fill(false))

    return (
        <div className="flex flex-col"> 
            {/* <DataRoomNav func={pull_data}/> */}
            <DataRoomNav setValue={setValue} props={value}/>
            <div className="flex h-screen flex-row">
                <DataRoomAside/>
                <MapView props={value} />
            </div>
        </div>
    );

}