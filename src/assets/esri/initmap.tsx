// ArcGIS imports
import MapView from "@arcgis/core/views/MapView";
import SceneView from "@arcgis/core/views/SceneView";
import Map from "@arcgis/core/Map";
import esriConfig from "@arcgis/core/config";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import LayerList from "@arcgis/core/widgets/LayerList";
import Sketch from "@arcgis/core/widgets/Sketch";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer"; // render 2D features to 3D
// Local imports
import { popups, toolList, toolItems } from './styling';

// initalize ArcGIS map
export function initializeMap(ref: HTMLDivElement, widget: any) { //, toggleSketch: Boolean

  // configure API key
  esriConfig.apiKey = "AAPK9186db7ac712462f993ee74dbab2ea5alOWylmpxBi7cBhK6aozgfEB32gpqW0j48pmktA-Re0TWMR1mtLC0evuyqI_hAiSh"

  // define navigation menu utilities
  const tools: Array<string> = toolItems(toolList)

  /************************************ 
  // Setup 2D or 3D Map and View
  ************************************/

  // initalize
  interface config {
    graphics: any;
    mapView: any;
    sceneView: any;
  }; // tried to be smart with config interface wasted a lot of time, just set to any
  const configArcGIS: config = {
    graphics: null,
    mapView: null,
    sceneView: null, 
  };

  // 2D map
  const map = new Map({
    basemap: "arcgis-imagery" // Basemap layer service
  });

  // configure initial map view
  configArcGIS.mapView = new MapView({
    container: ref,
    map: map,
    center: [-57.6604, 53.1355], // Longitude, latitude, center of NL
    zoom: 5 // Zoom level
  });

  // graphics layer for sketches
  configArcGIS.graphics = new GraphicsLayer();

  // toggle to 3D perspective
  if (widget[tools.indexOf('3D')] === true) { // lookup index dynamically
    // 3D scene
    const scene = new Map({
      basemap: "arcgis-imagery",
      ground: "world-elevation"
    });
  
    // configure initial scene view
    configArcGIS.sceneView = new SceneView({
      map: scene, 
      camera: {
        position: {
          x: -52.7453, // St. John's
          y: 47.5556,
          z: 4000 // meters
        },
        tilt: 75
      },
      container: ref
    });

  }

  /************************************ 
  // Add Widgets
  ************************************/

  // add layer list to the UI - Add different widgets to the UI here based on mousebutton clicks?
  configArcGIS.mapView.when(() => {    
    // add sketch widget
    const sketch = new Sketch({
      layer: configArcGIS.graphics,
      view: configArcGIS.mapView,
      creationMode: "update",
    });
    // add list of layers widget with toggle option
    const layerList = new LayerList({
      view: configArcGIS.mapView
    });
    // add basemap toggle widget
    const toggle = new BasemapToggle({
      view: configArcGIS.mapView,
      nextBasemap: 'topo-vector'
    })

    // toggle sketch widget to UI
    if (widget[tools.indexOf('sketch')] === true) {
      configArcGIS.mapView.ui.add(sketch, "bottom-right")
    } 
    // toggle layerList widget to UI
    if (widget[tools.indexOf('layers')] === true) {
      configArcGIS.mapView.ui.add(layerList, "top-right")
    } 
    // toggle sketch widget to UI
    if (widget[tools.indexOf('basemap')] === true) {
      configArcGIS.mapView.ui.add(toggle, "bottom-left")
    } 
  });

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

  // // render 2D view layers for 3D scene
  // function render2DLayer() {
  //   const render = new UniqueValueRenderer({
  //     field: "MIRIAD.MIRIAD_LICENSES.CLIENT_NAME"
  //   });

  // }

  //NOTE: Times are formatted 2.5 hours earlier than they should be? 

  // MORE DATA TO IMPORT (Drill Core, Drill Holes, MODS)
  // https://dnrmaps.gov.nl.ca/arcgis/rest/services/GeoAtlas/Map_Layers/MapServer
  // DATA TO IMPORT (Geochemistry)
  // https://dnrmaps.gov.nl.ca/arcgis/rest/services/GeoAtlas/Geochemistry_All/MapServer

  // return appropate view
  if (widget[tools.indexOf('2D')] === true) { // lookup index dynamically
    return configArcGIS.mapView
  } {
    return configArcGIS.sceneView
  }

  // return 2D View 
  // return view;
  // return 3D scene
  // return sceneView;
}