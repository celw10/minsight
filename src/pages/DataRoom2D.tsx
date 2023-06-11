// React import
import { useSearchParams } from "react-router-dom";
// Shadui-tabs import
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
// D3 import
import { PlotD3 } from "../assets/d3/Plot";
// Local import
import { MapView2D } from "../assets/esri/Map2D";
import { DataRoomMenu } from "../assets/components/DataRoomMenu";
import { toolList, dataList } from '../assets/esri/utils';


// data room parent page
export const DataRoom2D = () => {

    // get state as URL search params from context
    const [searchParams, setSearchParams] = useSearchParams({Basemap: "imagery", Utilities: "", Widgets: "", Sliders: "", filters:""}); 

    // return the 2D data room components
    return (
        <div className="h-screen w-screen">
            <div className="flex h-full flex-col"> 
                <DataRoomMenu contents={toolList} type={'nav'} searchParams={searchParams} setSearchParams={setSearchParams}/>
                {/* <Tabs defaultValue="2DMap" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="2DMap">2D Map</TabsTrigger>
                        <TabsTrigger value="Analysis">Data Analysis</TabsTrigger>
                    </TabsList>
                    <TabsContent value="2DMap">
                        <div className="flex h-full flex-row">
                            <DataRoomMenu contents={dataList} type={'aside'} searchParams={searchParams} setSearchParams={setSearchParams}/>
                                <MapView2D searchParams={searchParams}/>
                        </div>
                    </TabsContent>    
                    <TabsContent value="Analysis">
                        <div className="h-max w-max">
                            <PlotD3 top={10} right={50} bottom={50} left={50} width={800} height={400} fill="black" />
                        </div>
                    </TabsContent>            

                </Tabs> */}

                <div className="flex h-full flex-row">
                    <DataRoomMenu contents={dataList} type={'aside'} searchParams={searchParams} setSearchParams={setSearchParams}/>
                        <MapView2D searchParams={searchParams}/>
                </div>
            </div>
        </div>


    );
}