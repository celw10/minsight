// React imports
import { useRef, useEffect, useContext } from "react";
// ArcGIS imports
import View from "@arcgis/core/views/MapView";
// Local imports
import { initializeMap } from "./initmap";
import { WidgetContext } from '../../pages/DataRoom'

export const MapView = () => {

    // setup container div and map
    const containerRef = useRef() as any;
    let mapView: View | null = null;

    // get state defined in dataroom as context 
    const [widget, setWidget] = useContext(WidgetContext); // This context is changing but NOT REACTIVE?

    useEffect(() => {
        if (mapView === null) {
            // initalize ArcGIS API
            mapView = initializeMap(containerRef.current, widget)
        }
    }, [widget]); // widget is a dependancy as it change this boolean array with mousebutton clicks in DataRoom nav
    // However, the map is not re-rendering when widget is changed to redraw the map with toggled ArcGIS widgets, why?
    // how can I update the rendering of map 

    return <div className='h-screen w-screen p-0 m-0' ref={containerRef}></div>;
}