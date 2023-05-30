// Local import
import { MapView2D } from "../assets/esri/Map2D";
import { DataRoomMenu } from "../assets/components/DataRoomMenu";
// import { DataRoomAside } from "../assets/components/DataRoomAside";
// import { DataRoomNav } from "../assets/components/DataRoomNav";
import { toolList, dataList } from '../assets/esri/utils';

// data room parent page
export const DataRoom2D = () => {

    // return the 2D data room components
    return (
        <div className="flex flex-col"> 
            {/* <DataRoomNav /> */}
            <DataRoomMenu contents={toolList} type={'nav'}/>
            <div className="flex h-screen flex-row">
                {/* <DataRoomAside /> */}
                <DataRoomMenu contents={dataList} type={'aside'}/>
                    <MapView2D />
            </div>
        </div>
    );
}