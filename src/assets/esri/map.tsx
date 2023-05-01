// React imports
import { useRef, useEffect, useState } from "react";
// ArcGIS imports
import View from "@arcgis/core/views/MapView";
// Local imports
import { initializeMap } from "./initmap";

export const MapView = (args: any) => {
    const mapRef = useRef() as any;
    const [view, setView] = useState<View | null>(null);

    useEffect(() => {
        const view = initializeMap(mapRef.current);
        setView(view);
    }, []); //only after first render of div(?)

    return <div className='h-full w-full p-0 m-0' ref={mapRef}></div>;
}