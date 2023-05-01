// ArcGIS imports
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import esriConfig from "@arcgis/core/config";
// Local imports
import {LiveNlClaims} from "../test"

export function initializeMap(ref: HTMLDivElement) {
  // configure API key
  esriConfig.apiKey = "AAPK9186db7ac712462f993ee74dbab2ea5alOWylmpxBi7cBhK6aozgfEB32gpqW0j48pmktA-Re0TWMR1mtLC0evuyqI_hAiSh"
  
  // create from a web map
  const map = new Map({
    basemap: "arcgis-imagery" // Basemap layer service
  });
  
  // initialize map view
  const view = new MapView({
    container: ref,
    map: map,
    center: [-57.6604, 53.1355], // Longitude, latitude
    zoom: 5 // Zoom level
  });

  // add live claims to map
  // map.add(LiveNlClaims, 0)

  return view;
}