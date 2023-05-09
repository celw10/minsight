// React import 
import { useEffect, useRef, useState } from "react"
// Local import
import { MapView } from "../assets/esri/map";
import { DataRoomAside } from "../assets/components/DataRoomAside"
import { DataRoomNav } from "../assets/components/DataRoomNav"


export const DataRoom = () => {
    
    // const [toggleTools, setToggleTools] = useState()
    let toggleTools: Array<Boolean> = []
    const pull_data: any = (data:any) => {
        toggleTools = data // Initial state
    }
    ///
    // const [widget, setWidget] = useState(toggleTools)

    // function to pull props from child to parent
    useEffect(() => {
         console.log(toggleTools) // This can give me an array of falses or trues, but how do I get this to re-render???
    }, [])

    return (
        <div className="flex flex-col"> 
            <DataRoomNav func={pull_data}/>
            <div className="flex h-screen flex-row">
                <DataRoomAside/>
                <MapView widgets={toggleTools} />
            </div>
        </div>
    );

}

// const mapRef = useRef() as any;
// const [view, setView] = useState<View | null>(null);

// useEffect(() => {
//     const view = initializeMap(mapRef.current, widgets);
//     setView(view);
// }, []); //only after first render of div(?)

// return <div className='h-screen w-screen p-0 m-0' ref={mapRef}></div>;