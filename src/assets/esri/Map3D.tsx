// React imports
import { useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
// ArcGIS imports
import Scene from "@arcgis/core/views/SceneView";
// Local imports
import { initializeMap3D } from "./initalizeMap3D";

export const MapView3D = () => {

    // setup container div and map
    const containerRef = useRef<HTMLDivElement>(null!);

    // 3D scene view initialization
    let mapView: Scene | null = null;

    // use searchparams for data filtering
    const [searchParams, _] = useSearchParams({Basemap: "imagery", Utilities: "", Widgets: "", Sliders: "", filters:""});

    useEffect(() => {
        if (mapView === null) {
            // initalize ArcGIS API
            mapView = initializeMap3D(containerRef.current, searchParams)
        } 

    }, [searchParams]); // dependency for re-rendeing 
    
    return <div className='h-screen w-screen p-0 m-0' ref={containerRef}></div>;
}