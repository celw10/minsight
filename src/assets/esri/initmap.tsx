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
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
// Local imports
import { popups } from './styling';

// function to create 2D map or 3D scene
function createView(params: any, type: string) {
  let view;
  if (type === "2d") {
    view = new MapView(params);
    return view;
  } else {
    view = new SceneView(params);
  }
  return view;
}

// initalize ArcGIS map
export function initializeMap(ref: HTMLDivElement, widget: any) { //, toggleSketch: Boolean

  // configure API key
  esriConfig.apiKey = "AAPK9186db7ac712462f993ee74dbab2ea5alOWylmpxBi7cBhK6aozgfEB32gpqW0j48pmktA-Re0TWMR1mtLC0evuyqI_hAiSh"

  // configure for map (2D) or scene (3D) view
  interface config {
    mapView: any;
    sceneView: any;
    activeView: any; 
    container: any;
  }; // trying to be smart with config interface wasted a lot of time, just set to any
  const configView: config = {
    mapView: null,
    sceneView: null, 
    activeView: null,
    container: ref,
  };

  // initial view configuraiton
  const initViewParams = {
    container: configView.container,
    center: [-57.6604, 53.1355], // Longitude, latitude, center of NL
    zoom: 5
  }

  // initalize 2D map
  const map = new Map({
    basemap: "arcgis-imagery" // default imagery
  });

  // initalize 3D scene
  const scene = new Map({
    basemap: "arcgis-imagery",
    ground: "world-elevation"
  });

  // initalize API with 2D map view
  configView.mapView = createView(initViewParams, "2d");
  configView.mapView.map = map;
  configView.activeView = configView.mapView;

  // create 3D view, wont initalize until container is set
  initViewParams.container = null;
  // initViewParams.map = scene;
  configView.sceneView = createView(initViewParams, "3d");

  // reference a button to switch on/off 2D/3D?
  // I have the boolean array from my toggle buttons. 
  // this is the same issue as previuos, change this map view based on a change in button state???

  // I have my "widget" array that will cahnge from true/false based on 2D/3D view
  // Again, how do I render based on this change?

  // funciton to switch 2D and 3D view // I need this function to be associated with a button
  function switchView() {
    const is3D = configView.activeView.type === '3d';

    // remove reference to previous container
    configView.activeView.container = null;
 
    if (is3D) {
      const activeViewpoint = configView.activeView.viewpoint.clone();
      configView.mapView.viewpoint = activeViewpoint;
      configView.mapView.container = configView.container;
      configView.activeView = configView.mapView;
      // switch button reference
    } else {
      const activeViewpoint = configView.activeView.viewpoint.clone();
      configView.sceneView.viewpoint = activeViewpoint;
      configView.sceneView.container = configView.container;
      configView.activeView = configView.sceneView;
      // switchbutton reference
    }
  }

  /************************************ 
  // Setup Map (2D)
  ************************************/

  // create from a web map
  // const map = new Map({
  //   basemap: "arcgis-imagery" // Basemap layer service
  // });
  
  // initialize map view
  const view = new MapView({
    container: ref,
    map: map,
    center: [-57.6604, 53.1355], // Longitude, latitude, center of NL
    zoom: 5 // Zoom level
  });

  // add graphics layer for sketching
  const graphicsLayer = new GraphicsLayer();

  /************************************ 
  // Setup Scene (3D)
  ************************************/

  // const scene = new Map({
  //   basemap: "arcgis-imagery",
  //   ground: "world-elevation"
  // });

  const sceneView = new SceneView({
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

  /************************************ 
  // Add Widgets
  ************************************/

  // add layer list to the UI - Add different widgets to the UI here based on mousebutton clicks?
  view.when(() => {
    // add list of layers widget with toggle option
    const layerList = new LayerList({
      view: view
    });
    // add sketch widget
    const sketch = new Sketch({
      layer: graphicsLayer,
      view: view,
      creationMode: "update",
    });
    // add basemap toggle widget
    const toggle = new BasemapToggle({
      view: view,
      nextBasemap: 'topo-vector'
    })

    // add widgets to UI
    view.ui.add(sketch, "bottom-right");
    view.ui.add(layerList, "top-right");
    view.ui.add(toggle, "bottom-left");

    // remove widgets from UI
    view.ui.remove(sketch);
    view.ui.remove(layerList);
    view.ui.remove(toggle);

    });

    // I need to control weter or not the ui is added or removed based on boolean array widget
    console.log(widget)

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

  // render 2D view layers for 3D scene
  function render2DLayer() {
    const render = new UniqueValueRenderer({
      field: "MIRIAD.MIRIAD_LICENSES.CLIENT_NAME"
    });

  }

  //NOTE: Times are formatted 2.5 hours earlier than they should be? 

  // MORE DATA TO IMPORT (Drill Core, Drill Holes, MODS)
  // https://dnrmaps.gov.nl.ca/arcgis/rest/services/GeoAtlas/Map_Layers/MapServer
  // DATA TO IMPORT (Geochemistry)
  // https://dnrmaps.gov.nl.ca/arcgis/rest/services/GeoAtlas/Geochemistry_All/MapServer

  // return 2D View 
  // return view;
  // return 3D scene
  return sceneView;
}