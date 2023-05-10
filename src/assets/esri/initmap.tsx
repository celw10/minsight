// ArcGIS imports
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import esriConfig from "@arcgis/core/config";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import LayerList from "@arcgis/core/widgets/LayerList";
import Sketch from "@arcgis/core/widgets/Sketch";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
// Local imports
import { popups } from './styling';

export function initializeMap(ref: HTMLDivElement, widgets: any) { //, toggleSketch: Boolean

  // configure API key
  esriConfig.apiKey = "AAPK9186db7ac712462f993ee74dbab2ea5alOWylmpxBi7cBhK6aozgfEB32gpqW0j48pmktA-Re0TWMR1mtLC0evuyqI_hAiSh"
  
  /************************************ 
  // Setup Map
  ************************************/

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

  // add graphics layer for sketching
  const graphicsLayer = new GraphicsLayer();

  /************************************ 
  // Add Widgets
  ************************************/

  // add layer list to the UI - Add different widgets to the UI here based on mousebutton clicks?
  view.when(() => {
    const layerList = new LayerList({
      view: view
    });
    const sketch = new Sketch({
      layer: graphicsLayer,
      view: view,
      creationMode: "update",
    });
    //layerlist for item feature layer toggeling
    view.ui.add(layerList, "top-right");
    // sketch toolbar to draw shapefiles
    if (widgets[0]===true) {
      view.ui.add(sketch, "bottom-right")
    }
  });

  //Able to directly generate data selection tools with SKETCH!

  /************************************ 
  // NL Live GeoAtlas Data
  ************************************/

  // base path to GovNL GeoAtlas REST server
  const base: string = 'https://dnrmaps.gov.nl.ca/arcgis/rest/services/GeoAtlas/Mineral_Lands/MapServer/';

  // object for customization and importing government REST server data
  // https://dnrmaps.gov.nl.ca/arcgis/rest/services/GeoAtlas/Mineral_Lands/MapServer/
  type govServerItems = {
    id: number; 
    name: string;
    ext: string;
    visible: boolean;
    popup: object;
  }
  const govServerItems = [
      {id: 0, name: "Mineral Exploraiton Claims", ext: '0', visible: true, popup: popups[0]},
      {id: 1, name: "Historical Exploraiton Claims", ext: '2', visible: false, popup: popups[1]},
      {id: 2, name: "Mineral Rights Cancelled", ext: '3', visible: false, popup: popups[2]},
      {id: 3, name: "Notices Gazetted", ext: '4', visible: false, popup: popups[3]},
      {id: 4, name: "Mineral Tenure", ext: '5', visible: false, popup: popups[4]},
  ]

  // map government data to feature layers: use government styling for now
  govServerItems.map(item => {
    const govImport = new FeatureLayer({
      url: base + item.ext,
      title: item.name,
      visible: item.visible,
      popupTemplate: item.popup,
      labelsVisible: false,
      outFields: ['*'],
      //Others?
    })
    map.add(govImport, item.id)
  });

  //NOTE: Times are formatted 2.5 hours earlier than they should be? 

  // MORE DATA TO IMPORT (Drill Core, Drill Holes, MODS)
  // https://dnrmaps.gov.nl.ca/arcgis/rest/services/GeoAtlas/Map_Layers/MapServer
  // DATA TO IMPORT (Geochemistry)
  // https://dnrmaps.gov.nl.ca/arcgis/rest/services/GeoAtlas/Geochemistry_All/MapServer
  return view;
}