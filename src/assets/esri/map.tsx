// React imports
import { useRef, useEffect, useContext } from "react";
// ArcGIS imports
import View from "@arcgis/core/views/MapView";
import Scene from "@arcgis/core/views/SceneView";
// Local imports
import { initializeMap } from "./initmap";
import { searchContext } from '../../pages/DataRoom'

export const MapView = () => {

    // setup container div and map
    const containerRef = useRef<HTMLDivElement>(null!);

    // mapView type 2D view or 3D scene, init as null
    // On page refresh this goes to null - prevent this? 
    let mapView: View | Scene | null = null;


    // get state as searchParams
    const [searchParams, setSearchParams] = useContext(searchContext);

    useEffect(() => {
        if (mapView === null) {
            // initalize ArcGIS API
            mapView = initializeMap(containerRef.current, searchParams)
        } 

    }, [searchParams]); // dependency for re-rendeing 
    
    return <div className='h-screen w-screen p-0 m-0' ref={containerRef}></div>;
}