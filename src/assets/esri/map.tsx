// React imports
import { useRef, useEffect, useState } from "react";
// ArcGIS imports
import View from "@arcgis/core/views/MapView";
// Local imports
import { initializeMap } from "./initmap";

export const MapView = (props: any) => {
    const mapRef = useRef() as any;
    const [view, setView] = useState<View | null>(null);

    useEffect(() => {
        let view: View = initializeMap(mapRef.current, props.props);
        setView(view);
    }, []);
    
    return <div className='h-screen w-screen p-0 m-0' ref={mapRef}></div>;
}