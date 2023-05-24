// React imports
import { useRef, useEffect, useContext } from "react";
// ArcGIS imports
import View from "@arcgis/core/views/MapView";
import Scene from "@arcgis/core/views/SceneView";
// Local imports
import { initializeMap } from "./initmap";
// import { WidgetContext, DataContext } from '../../pages/DataRoom'
import { searchContext } from '../../pages/DataRoom'


export const MapView = () => {

    // setup container div and map
    const containerRef = useRef<HTMLDivElement>(null!);

    // mapView type 2D view or 3D scene, init as null
    // On page refresh this goes to null - prevent this? 
    let mapView: View | Scene | null = null;

    // get state for widget navbar as context 
    // const [widget, setWidget] = useContext(WidgetContext);

    // get state defined in aside menu as context
    // const [data, setData] = useContext(DataContext);
    const [searchParams, setSearchParams] = useContext(searchContext);

//    console.log(widget.length, data.length, concatState.length)

    useEffect(() => {
        if (mapView === null) {
            // initalize ArcGIS API
            // mapView = initializeMap(containerRef.current, widget, data)
            mapView = initializeMap(containerRef.current, searchParams)
        } 

    }, [searchParams]);//[widget, data]); // widget & data as dependencies for re-rendering
    
    return <div className='h-screen w-screen p-0 m-0' ref={containerRef}></div>;
}