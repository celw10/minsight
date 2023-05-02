// ArcGIS imports
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import esriConfig from "@arcgis/core/config";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
// Local imports
// import {LiveNlClaims} from "../test"

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

  /************************************ 
  // NL Live Mineral Exploration Claims
  ************************************/

  // add live claims to map
  const base: string = 'https://dnrmaps.gov.nl.ca/arcgis/rest/services/GeoAtlas/Mineral_Lands/MapServer/'
  const mapStakedClaims: string = '0' 

  // style rendering of mienral exploraiton claims
  const claimsRender: any = {
    type: "simple",
    symbol: {
        type: "simple-fill",
        color: "grey",
        outline: {
            width: 1,
            color: "black"
        }
    }
  };

  // popup lables when mineral exploration claims are clicked
  const popupClaims: any = {
      "title": "Mineral Exploration Claim",
      "content": "<b>Company: </b>{MIRIAD.MIRIAD_LICENSES.CLIENT_NAME}<br> <b>License Number: </b>{MIRIAD.MIRIAD_LICENSES.LICENSE_NBR}<br> <b>Date Staked: </b>{MIRIAD.MIRIAD_LICENSES.STAKEDATE}<br>"  
    };

  // Trying to construct a feature layer based on the data I am exporting sources:
  const claims: any = new FeatureLayer({
      url: base + mapStakedClaims,
      renderer: claimsRender, // override default renderer on REST server
      outFields: ["*"],
      popupTemplate: popupClaims,
      opacity: 0.5
  });

  map.add(claims, 0)

  // There are 11 other layers I can add like this including
  // 1) original boundaries
  // 2) Historical Claims
  // 3) Mineral Rights Cancelled
  // 4) Notices Gazetted
  // 5) Mineral Tenure
  // 6) Six layers about quarries...

  return view;
}