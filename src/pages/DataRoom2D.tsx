// React import
import { useSearchParams } from "react-router-dom";
// Local import
import { MapView2D } from "../assets/esri/Map2D";
import { DataRoomMenu } from "../assets/components/DataRoomMenu";
// import { DataRoomAside } from "../assets/components/DataRoomAside";
// import { DataRoomNav } from "../assets/components/DataRoomNav";
import { toolList, dataList } from '../assets/esri/utils';

// data room parent page
export const DataRoom2D = () => {

    // get state as URL search params from context
    const [searchParams, setSearchParams] = useSearchParams({Basemap: "imagery", Utilities: "", Widgets: "", Sliders: "", filters:""}); 

    // return the 2D data room components
    return (
        <div className="flex flex-col"> 
            {/* <DataRoomNav /> */}
            <DataRoomMenu contents={toolList} type={'nav'} searchParams={searchParams} setSearchParams={setSearchParams}/>
            {/* problem with screen height here */}
            <div className="flex h-screen flex-row">
                {/* <DataRoomAside /> */}
                <DataRoomMenu contents={dataList} type={'aside'} searchParams={searchParams} setSearchParams={setSearchParams}/>
                    <MapView2D searchParams={searchParams}/>
            </div>
        </div>
    );
}