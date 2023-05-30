// React imports
import { useRef, useEffect } from "react";
// ArcGIS imports
import View from "@arcgis/core/views/MapView";
// Local imports
import { initializeMap2D } from "./initalizeMap2D";

export const MapView2D = (props: any) => {

    // setup container div and map
    const containerRef = useRef<HTMLDivElement>(null!);

    // 2D map view initialization
    let mapView: View | null = null;

    // use searchparams for data filtering
    //    let searchParams = new URLSearchParams(document.location.search)
    // const [searchParams, _] = useSearchParams({Basemap: "imagery", Utilities: "", Widgets: "", Sliders: "", filters:""});


    useEffect(() => {
        if (mapView === null) {
            // initalize ArcGIS API
            mapView = initializeMap2D(containerRef.current, props.searchParams)
        } 

    }, [props.searchParams]); // dependency for re-rendeing - maybe a button to re-render the map? 
    
    // return ArcGIS map as div element
    return <div className='h-screen w-screen p-0 m-0' ref={containerRef}></div>;
}