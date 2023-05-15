// React imports
import { useRef, useEffect, useContext } from "react";
// ArcGIS imports
import View from "@arcgis/core/views/MapView";
import Scene from "@arcgis/core/views/SceneView";
// Local imports
import { initializeMap } from "./initmap";
import { WidgetContext } from '../../pages/DataRoom'

export const MapView = () => {

    // setup container div and map
    const containerRef = useRef<HTMLDivElement>(null!);

    // mapView type 2D view or 3D scene, init as null
    let mapView: View | Scene | null = null;

    // get state defined in dataroom as context 
    const [widget, setWidget] = useContext(WidgetContext); // This context is changing but NOT REACTIVE?

    useEffect(() => {
        if (mapView === null) {
            // initalize ArcGIS API
            mapView = initializeMap(containerRef.current, widget)
        }
    }, [widget]); // widget as a dependancy for re-rendering

    return <div className='h-screen w-screen p-0 m-0' ref={containerRef}></div>;
}