// // React imports
// import { useEffect } from "react";
// // ArcGIS imports
// import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
// // import { json } from "react-router-dom";

// // Pulling live data from GovNL ArcGIS Rest server (Departnment of Natural Resources: DNR)
// // https://dnrmaps.gov.nl.ca/arcgis/rest/services/GeoAtlas/Mineral_Lands/MapServer


// export function LiveNlClaims() {

//     // dynamic paramet for request concatenation to GeoAtlas REST server
//     const geom: string = 'geometry=1110133.6740690994,5317107.545221473,1222954.4243231,5422590.360499603' + '&'

//     // statatic parameters for request concatentation to GeoAtlas REST server
//     const base: string = 'https://dnrmaps.gov.nl.ca/arcgis/rest/services/GeoAtlas/Mineral_Lands/MapServer/'
//     const id: string = '0' 
//     const action: string = '/query?'
//     const geomType: string = 'geometryType=esriGeometryEnvelope' + '&'
//     const spatialRel: string = 'spatialRel=esriSpatialRelIntersects' + '&'
//     const returnGeom: string = 'returnGeometry=true' + '&'
//     const returnIdsOnly: string = 'returnIdsOnly=false' + '&'
//     const returnCountOnly: string = 'returnCountOnly=false' + '&'
//     const returnElevZ: string = 'returnZ=false' + '&'
//     const returnElevM: string = 'returnM=false' + '&'
//     const returnDistinct: string = 'returnDistinctValues=false' + '&'
//     const outFmt: string = 'f=JSON'

//     // concatenate the request
//     const concatRequest: string = base + id + action + geom + geomType + spatialRel + returnGeom + returnIdsOnly + returnCountOnly + returnElevZ + returnElevM + returnDistinct + outFmt
    
//     useEffect(() => {
//         fetch(concatRequest)
//             .then((response) => response.json())
//             .then(data => console.log(data));
//     }, []);
    
//     // style rendering of mienral exploraiton claims
//     const claimsRender: any = {
//         type: "simple",
//         symbol: {
//             type: "simple-fill",
//             color: "grey",
//             outline: {
//                 width: 1,
//                 color: "black"
//             }
//         }
//     };

//     // popup lables when mineral exploration claims are clicked
//     const popupClaims: any = {
//         "title": "Mineral Exploration Claim",
//         "content": "<b>Company: </b>{CLIENT_NAM}<br> <b>License Number: </b>{LICENSE_NB}<br> <b>Date Staked: </b>{STAKEDATE}<br> <b>Expiry Date: </b>{EXPIRYDATE}<br> <b>Expenditures: </b>{TOTAL_EXP}<br> " 
//     };

//     // Trying to construct a feature layer based on the data I am exporting sources:
//     // https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
//     // https://dnrmaps.gov.nl.ca/arcgis/rest/services/GeoAtlas/Mineral_Lands/MapServer/0
//     // Also checkout Generate Renderer ??
//     const claims = new FeatureLayer({
//         url: base + id,
//         renderer: claimsRender,
//         outFields: ["CLIENT_NAM","LICENSE_NB","STAKEDATE", "EXPIRYDATE", "TOTAL_EXP"],
//         popupTemplate: popupClaims,
//         opacity: 0.5
//     });

//     return claims
// }