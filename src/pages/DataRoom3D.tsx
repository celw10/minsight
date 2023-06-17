// React import 
import { useSearchParams } from "react-router-dom";
// Local import
import { MapView3D } from "../assets/esri/Map3D";
import { DataRoomMenu } from "../assets/components/DataRoomMenu";
import { toolList, dataList } from '../assets/esri/utils';

// data room parent page
export const DataRoom3D = () => {

    // get state as URL search params from context
    const [searchParams, setSearchParams] = useSearchParams({Basemap: "imagery", Utilities: "", Widgets: "", Sliders: "", filters:""}); 

    return ( // I need to implement some features in 3D??
        <div className="h-screen w-screen">
            <div className="flex h-full flex-col"> 
                <DataRoomMenu contents={toolList} type='nav' searchParams={searchParams} setSearchParams={setSearchParams}/>
                <div className="flex h-full flex-row">
                <DataRoomMenu contents={dataList} type='aside' searchParams={searchParams} setSearchParams={setSearchParams}/>
                        <MapView3D />
                </div>
            </div>
        </div>
    );
}