// ArcGIS imports
import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import CSVLayer from "@arcgis/core/layers/CSVLayer";
// import geometryEngineAsync from "@arcgis/core/geometry/geometryEngineAsync";
// ArcGIS widgets
import CoordinateConversion from '@arcgis/core/widgets/CoordinateConversion';
import Legend from "@arcgis/core/widgets/Legend";
import Print from "@arcgis/core/widgets/Print";
import Sketch from "@arcgis/core/widgets/Sketch";
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";
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
export function initializeMap2D(ref: HTMLDivElement, searchParams: any) {

  // configure API key
  esriConfig.apiKey = "AAPK9186db7ac712462f993ee74dbab2ea5alOWylmpxBi7cBhK6aozgfEB32gpqW0j48pmktA-Re0TWMR1mtLC0evuyqI_hAiSh"

  // array of search param key value pairs
  const params: any[] = [];
  searchParams.forEach((value: string, key: string) => {
      params.push([key, value])
  });

  // manipulate filter portion of the route and convert to array
  const dataFilter = params.filter(([key, _]) => key==='filters')[0].slice(1)[0].split('-')

  /************************************ 
  // Setup Example CSV Database
  ************************************/

  // TRY TO PROPERLY IMPLEMENT THIS EXAMPLE USING A FEATURE LAYER TABLE
  // https://developers.arcgis.com/javascript/latest/sample-code/sandbox/?sample=highlight-features-by-geometry

  // OR
  //https://developers.arcgis.com/javascript/latest/sample-code/layers-scenelayerview-query-stats/

  const csvLayer = new CSVLayer({
    url: "https://ubatsukh.github.io/arcgis-js-api-demos/devsummit2021/csvLayer-nps/data/nps_establishments.csv",
    delimiter: ",",
    popupTemplate: {
      title: "{unit_name}",
      content: "Established on <b>{date_est}</b> <br/><br/> {description}"
    },
    renderer: setRenderer()
  });

  let csvLayerView: any;
  csvLayer
    .when(() => {
      view.whenLayerView(csvLayer).then(function (layerView) {
        csvLayerView = layerView;
      });
    })
    .catch(errorCallback);

  function errorCallback(error: any) {
    console.log("error happened:", error.message);
  }

  function setRenderer() {
    return {
      type: "simple",
      symbol: {
          type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
          size: 4,
          color: "white",
        }
    };
  }

  /************************************ 
  // Setup 2D Map
  ************************************/

  // graphics layer for data selection sketching
  // const sketchLayer = new GraphicsLayer()

  // 2D map
  const map = new Map({
    basemap: basemaps[params.filter(([key, _]) => key==='Basemap')[0].slice(1)[0]],
    layers: [csvLayer] // link csv layer database in layers here
  });

  // configure initial map view
  const view = new MapView({
    container: ref,
    map: map,
    highlightOptions: {
      color: "#2B65EC",
      fillOpacity: 0.4
    },
    center: [-52.7453, 47.5556], // Longitude, latitude, St. John's
    zoom: 13 // Zoom level
  });

  /************************************ 
  // Add Live NL Layers to Map
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
    });
    map.layers.add(govFeaturesImport, item.zLevel)
  });

  // // image layers
  // // IMPLEMENT WORK AROUND USING LOCAL STORAGE RASTER IMAGES? 
  // const govImages = govNLData.filter( item => allowedImageLayer.includes(item.dType));
  // govImages.map(img => {
  //   const test = new MapImageLayer({
  //     url: img.url + img.urlext,
  //     // format: "tiff", // tiff?
  //     // visible: img.visible,
  //   });
  //   map.add(test)
  // })

  // LOCALLY HOSTING DATA? 
  // https://stackoverflow.com/questions/65875505/storing-features-layer-with-arcgis-or-as-geojson-locally-to-access-database-data

  /************************************ 
  // Adding Graphics
  ************************************/

  // polygon graphics layer will be used by the sketchviewmodel
  // this is showing the polygon being drawn on the view
  const polygonGraphicsLayer = new GraphicsLayer();
  map.add(polygonGraphicsLayer);

  //create a new sketchViewModel and set its layer
  let sketchViewModel = new SketchViewModel({
    view: view,
    layer: polygonGraphicsLayer,
    pointSymbol: {
      type: "simple-marker",
      color: [255, 255, 255, 0],
      size: "1px",
      outline: {
        color: "gray",
        width: 0
      }
    }
  });

  sketchViewModel.on("create", function(event: any) {
    console.log("Create")
    if (event.state === "complete") {
      console.log("Complete")
      console.log(event.graphic.geometry)
      selectFeatures(event.graphic.geometry)
    }
  })

  let highlight: any;

  // selects features from the csv layer that intersect a polygon that user drew using sketch view model
  function selectFeatures(geometry: any) {
    view.graphics.removeAll();
    if (csvLayerView) {
      //create a query and ste geometry parameter to the polygon that was drawn
      const query: any = {
        geometry: geometry,
        outfields: ["*"]
      };
      // query graphics from the csv layer view
      csvLayerView.queryFeatures(query).then(function(results: any) {
        const graphics = results.features;
        if (graphics.length > 0) {
          // zoom to the extent of the query area
          view.goTo(geometry.extent.expand(2));
        }

        // remove existing highlighted features
        if (highlight) {
          highlight.remove();
        }

        // highlight query results 
        highlight = csvLayerView.highlight(graphics);
      })
      .catch(errorCallback)
    }
  }



  /************************************ 
  // Customizable Utilities
  ************************************/

  // define utility render location
  const utilLocation = 'top-right'

  // initialize widget configuration
  view.when(() => {    
    // add sketch widget
    const sketch = new Sketch({
      layer: polygonGraphicsLayer,
      view: view,
      viewModel: sketchViewModel 
      // creationMode: "update",
    });
    // add coordinate conversion widget
    const coordinateConversion = new CoordinateConversion({
      view: view,
    });
    // add printing or map export option
    const print = new Print({
      view: view,
      printServiceUrl: "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
    });

    // toggle sketch widget on UI
    if (searchParams.get("Utilities") === 'sketch') {
      view.ui.add(sketch, utilLocation)
    }
    // toggle coordinate conversion widget on UI
    if (searchParams.get("Utilities") === 'coordinate conversion') {
      view.ui.add(coordinateConversion, utilLocation)
    } 
    // toggle map export widget on UI
    if (searchParams.get("Utilities") === 'export map image') {
      view.ui.add(print, utilLocation)
    }
  });

  /************************************ 
  // Customizable Widgets
  ************************************/

  // define utility render location
  const widgetLocation = 'bottom-right'

  // initialize widget configuration
  view.when(() => {    
    // add a lengend widget
    const legend = new Legend({
      view: view,
    });

    // toggle legned widget on UI
    if (searchParams.get("Widgets") === 'legend') {
      view.ui.add(legend, widgetLocation)
    }
  });

  /************************************ 
  // Customizable 2D
  ************************************/

  // Define the leading and/or trailing data layers before implementation

  // // initialize widget configuration
  // mapView.when(() => {    
  //   // add list of layers widget with toggle option
  //   const swipe = new Swipe({
  //     leadingLayers: // Geophysics #1,
  //     trailingLayers: // Geophysics#2
  //     position: 35,
  //     view: mapView // not avaliable in 3D
  //   });

  //   // toggle layerList widget to UI
  //   if (widget[tools.indexOf('layers')]) {
  //     mapView.ui.add(swipe)
  //   } 
  // });

  // return default 2D view
  return view
}