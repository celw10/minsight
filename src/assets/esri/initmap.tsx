// ArcGIS imports
import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import SceneView from "@arcgis/core/views/SceneView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
// ArcGIS widgets
import CoordinateConversion from '@arcgis/core/widgets/CoordinateConversion';
import ElevationProfile from '@arcgis/core/widgets/ElevationProfile';
// import Expand from '@arcgis/core/widgets/Expand';
import LayerList from "@arcgis/core/widgets/LayerList";
import Print from "@arcgis/core/widgets/Print";
import Sketch from "@arcgis/core/widgets/Sketch";
// import Swipe from "@arcgis/core/widgets/Swipe";
// Local imports
import { toolList, dataList, govNLDataLoc } from './utils';

// basemap options - linked to utils.tsx
const basemaps: string[] = ["arcgis-imagery", "arcgis-terrain", "arcgis-topographic", "arcgis-oceans", "arcgis-light-gray", "arcgis-hillshade-light"]

// initalize ArcGIS map
export function initializeMap(ref: HTMLDivElement, widget: any, features: Array<Boolean>) { //, toggleSketch: Boolean

  // configure API key
  esriConfig.apiKey = "AAPK9186db7ac712462f993ee74dbab2ea5alOWylmpxBi7cBhK6aozgfEB32gpqW0j48pmktA-Re0TWMR1mtLC0evuyqI_hAiSh"

  /************************************ 
  // Setup 2D/3D Map and Basemap
  ************************************/

  // define navigation menu utilities
  const tools: Array<string> = toolList.map(({fields}) => fields).flat()

  // user-selected basemap, first true in state starting at basemap index
  const basemapIndex: number = widget.indexOf(true, tools.indexOf('imagery')) - tools.indexOf('imagery')

  // initalize - not sure how to interface without any, TS inferring type nulls if I don't set to any. 
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
    basemap: basemaps[basemapIndex],
    ground: "world-elevation"
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
  if (widget[tools.indexOf('3D')]) {
    // 3D scene
    const scene = new Map({
      basemap: basemaps[basemapIndex],
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
  // Customizable Utilities - only in 2D for now
  ************************************/

  // define utility render location
  const utilLocation = 'top-right'

  // initialize widget configuration
  configArcGIS.mapView.when(() => {    
    // add sketch widget
    const sketch = new Sketch({
      layer: configArcGIS.graphics,
      view: configArcGIS.mapView,
      creationMode: "update",
    });
    // add coordinate conversion widget
    const coordinateConversion = new CoordinateConversion({
      view: configArcGIS.mapView,
    });
    // add elevation profile widget
    const elevationProfile = new ElevationProfile({
      view: configArcGIS.mapView, 
      profiles: [{type: "ground"}],
      visibleElements: {selectButton: false}
    });
    // add printing or map export option
    const print = new Print({
      view: configArcGIS.mapView,
      printServiceUrl: "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
    });

    // toggle sketch widget on UI
    if (widget[tools.indexOf('sketch')]) {
      configArcGIS.mapView.ui.add(sketch, utilLocation)
    }
    // toggle coordinate conversion widget on UI
    if (widget[tools.indexOf('coordinate conversion')]) {
      configArcGIS.mapView.ui.add(coordinateConversion, utilLocation)
    } 
    // toggle elevation profile widget on UI
    if (widget[tools.indexOf('elevation profile')]) {
      configArcGIS.mapView.ui.add(elevationProfile, utilLocation)
    }
    // toggle map export widget on UI
    if (widget[tools.indexOf('export map image')]) {
      configArcGIS.mapView.ui.add(print, utilLocation)
    }
  });

  /************************************ 
  // Customizable Widgets - only in 2D for now
  ************************************/

  // define utility render location
  const widgetLocation = 'bottom-right'

  // initialize widget configuration
  configArcGIS.mapView.when(() => {    
    // add list of layers widget with toggle option
    const layerList = new LayerList({
      view: configArcGIS.mapView
    });
    // add a time slider for historical data & claims


    // toggle layerList widget to UI
    if (widget[tools.indexOf('layers')]) {
      configArcGIS.mapView.ui.add(layerList, widgetLocation)
    } 
  });

  /************************************ 
  // NL Live Feature Layers
  ************************************/

  // flattened array of tool options
  const featureLayers = dataList.map(({fields}) => fields).flat()

  // flattened array of URL ID's
  const urlIDs = dataList.map(({urlID}) => urlID).flat()

  // flattened array of URL extensions
  const urlExts = dataList.map(({urlExt}) => urlExt).flat()

  // flattened array of popup templates
  const popup = dataList.map(({popup}) => popup).flat()

  type govNLData = {
    id: Number, 
    name: String, 
    url: String, 
    urlext: String, 
    visible: Boolean, 
    popup: any,
  }
  const govNLData = [... Array(featureLayers.length).keys()].map((id, index) => { 
    return{
      id: id, 
      name: featureLayers[index],
      url: govNLDataLoc[urlIDs[index]].url, 
      urlext: urlExts[index],
      visible: features[index], 
      popup: popup[index], 
    }
  })

  // map government data to feature layers with provided styling
  govNLData.map(item => {
    const govImport = new FeatureLayer({
      url: item.url + item.urlext,
      title: item.name,
      visible: item.visible, // why error here?
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

  /************************************ 
  // Customizable 2D sliders - After Data Import
  ************************************/

  // Define the leading and/or trailing data layers before implementation

  // // initialize widget configuration
  // configArcGIS.mapView.when(() => {    
  //   // add list of layers widget with toggle option
  //   const swipe = new Swipe({
  //     leadingLayers: // Geophysics #1,
  //     trailingLayers: // Geophysics#2
  //     position: 35,
  //     view: configArcGIS.mapView // not avaliable in 3D
  //   });

  //   // toggle layerList widget to UI
  //   if (widget[tools.indexOf('layers')]) {
  //     configArcGIS.mapView.ui.add(swipe)
  //   } 
  // });

  /************************************ 
  // Return 2D or 3D view
  ************************************/

  // return default 2D view
  if (widget[tools.indexOf('2D')]) {
    return configArcGIS.mapView
  }
  
  // return 3D view
  return configArcGIS.sceneView
}