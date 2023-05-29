// ArcGIS imports
import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import SceneView from "@arcgis/core/views/SceneView";

// basemap object - necessary hard type here
interface Basemaps {
  [key: string]: string;
}
const basemaps: Basemaps = {"imagery": "arcgis-imagery", "terrain": "arcgis-terrain",
                            "topographic": "arcgis-topographic", "topographic + oceans": "arcgis-oceans",
                            "light": "arcgis-light-gray", "light hillshade": "arcgis-hillshade-light"}

// initalize ArcGIS map
export function initializeMap3D(ref: HTMLDivElement, searchParams: any) {

  // configure API key
  esriConfig.apiKey = "AAPK9186db7ac712462f993ee74dbab2ea5alOWylmpxBi7cBhK6aozgfEB32gpqW0j48pmktA-Re0TWMR1mtLC0evuyqI_hAiSh"

  // array of search param key value pairs
  const params: any[] = [];
  searchParams.forEach((value: string, key: string) => {
      params.push([key, value])
  });



  // reconstruct object from search params key value pairs
  const currentSearchParams = Object.fromEntries(params);

  /************************************ 
  // Setup 3D Scene View
  ************************************/

// 3D scene
const scene = new Map({
    basemap: basemaps[currentSearchParams['Basemap']],
    ground: "world-elevation"
});

// configure initial scene view
const sceneView = new SceneView({
    map: scene, 
    camera: {
    position: {
        x: -52.55, // St. John's
        y: 47.556,
        z: 8000 // meters
    },
    heading: 280,
    tilt: 55
    },
    container: ref
});

  // return 3D view
  return sceneView

}