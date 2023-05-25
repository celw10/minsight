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
import Legend from "@arcgis/core/widgets/Legend";
import Print from "@arcgis/core/widgets/Print";
import Sketch from "@arcgis/core/widgets/Sketch";
// import Swipe from "@arcgis/core/widgets/Swipe";
// Local imports
import { dataList, govNLDataLoc } from './utils';

// basemap object - necessary hard type here
interface Basemaps {
  [key: string]: string;
}
const basemaps: Basemaps = {"imagery": "arcgis-imagery", "terrain": "arcgis-terrain",
                            "topographic": "arcgis-topographic", "topographic + oceans": "arcgis-oceans",
                            "light": "arcgis-light-gray", "light hillshade": "arcgis-hillshade-light"}

// initalize ArcGIS map
export function initializeMap(ref: HTMLDivElement, searchParams: any) {

  // configure API key
  esriConfig.apiKey = "AAPK9186db7ac712462f993ee74dbab2ea5alOWylmpxBi7cBhK6aozgfEB32gpqW0j48pmktA-Re0TWMR1mtLC0evuyqI_hAiSh"

  // array of search param key value pairs
  const params: any[] = [];
  searchParams.forEach((value: string, key: string) => {
      params.push([key, value])
  });

  // manipulate filter portion of the route and convert to array
  const dataFilter = params[params.length-1].slice(1)[0].split('-')

  // reconstruct object from search params key value pairs
  const currentSearchParams = Object.fromEntries(params);

  /************************************ 
  // Setup 2D/3D Map and Basemap
  ************************************/

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
    basemap: basemaps[currentSearchParams['Basemap']],
    ground: "world-elevation"
  });

  // configure initial map view
  configArcGIS.mapView = new MapView({
    container: ref,
    map: map,
    center: [-52.7453, 47.5556], // Longitude, latitude, St. John's
    zoom: 13 // Zoom level
  });

  // graphics layer for sketches
  configArcGIS.graphics = new GraphicsLayer();

  // toggle to 3D perspective
  if (currentSearchParams["Perspective"] === '3D') {
    // 3D scene
    const scene = new Map({
      basemap: basemaps[currentSearchParams['Basemap']],
      ground: "world-elevation"
    });
  
    // configure initial scene view
    configArcGIS.sceneView = new SceneView({
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
    if (currentSearchParams["Utilities"] === 'sketch') {
      configArcGIS.mapView.ui.add(sketch, utilLocation)
    }
    // toggle coordinate conversion widget on UI
    if (currentSearchParams["Utilities"] === 'coordinate conversion') {
      configArcGIS.mapView.ui.add(coordinateConversion, utilLocation)
    } 
    // toggle elevation profile widget on UI
    if (currentSearchParams["Utilities"] === 'elevation profile') {
      configArcGIS.mapView.ui.add(elevationProfile, utilLocation)
    }
    // toggle map export widget on UI
    if (currentSearchParams["Utilities"] === 'export map image') {
      configArcGIS.mapView.ui.add(print, utilLocation)
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

  // data rendering levels
  const zLevels = dataList.map(({zLevel}) => zLevel).flat()

  // data type array
  const dType = dataList.map(({name, fields}) => Array(fields.length).fill(name)).flat()

  // toggle indicies of tool based on searchParams
  const visible = Array(featureLayers.length).fill(false)
  // only if data option is toggled
  if (dataFilter.length > 1) {
    for (const s of dataFilter){
      if (s != "") {
        visible[featureLayers.indexOf(s)] = !visible[featureLayers.indexOf(s)]
      }
    }
  }

  const govNLData = [... Array(featureLayers.length).keys()].map((id, index) => { 
    return{
      id: id, 
      dType: dType[index],
      name: featureLayers[index],
      url: govNLDataLoc[urlIDs[index]].url, 
      urlext: urlExts[index],
      visible: visible[index], 
      popup: popup[index], 
      zLevel: zLevels[index],
    }
  });
  
  // allowed data types for feature layer and image layer imput
  const allowedFeatureLayer = ["GIS", "Geology", "Geochemistry", "Drilling", "Mineralisation"]
  // const allowedImageLayer = ["Geophysics"]
  
  // feature layers
  const govFeatures = govNLData.filter( item => allowedFeatureLayer.includes(item.dType));
  govFeatures.map(item => {
    const govFeaturesImport = new FeatureLayer({
      url: item.url + item.urlext,
      title: item.name,
      visible: item.visible,
      popupTemplate: item.popup,
      labelsVisible: false,
      outFields: ['*'],
      //Others?
    })
    map.add(govFeaturesImport, item.zLevel)
  });

  // image layers
  // not loading as image layer?
  // const govImages = govNLData.filter( item => allowedImageLayer.includes(item.dType));
  // govImages.map(img => {
  //   const govImageImport = new ImageLayer({
  //     url: img.url + img.urlext,
  //     format: "tiff", // tiff?
  //     visible: img.visible,
  //   })
  //   map.add(govImageImport, img.zLevel)
    // they include the image layer directly in the map definition
    // check out these docs: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-ImageryLayer.html?#renderingRule
  // })

  /************************************ 
  // Customizable Widgets - only in 2D for now
  ************************************/

  // define utility render location
  const widgetLocation = 'bottom-right'

  // initialize widget configuration
  configArcGIS.mapView.when(() => {    
    // add a lengend widget
    const legend = new Legend({
      view: configArcGIS.mapView,
    });

    // toggle legned widget on UI
    if (currentSearchParams["Widgets"] === 'legend') {
      configArcGIS.mapView.ui.add(legend, widgetLocation)
    }
  });

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
  if (currentSearchParams["Perspective"] === '2D') {
    return configArcGIS.mapView
  }
  
  // return 3D view
  return configArcGIS.sceneView
}