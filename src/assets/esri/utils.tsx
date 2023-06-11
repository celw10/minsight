// CONTENT IN UTILS INTENDED TO BE STATIC, CHANGES HERE ALTER UI

/************************************ 
 // Data Room Navigation Utilities
************************************/

// content for the Data Room navigation bar
export const toolList = [
    {id: 0, name: "Widgets", fields: ["legend"]},
    {id: 1, name: "Utilities", fields: ["sketch", "coordinate conversion", "export map image"]},
    {id: 3, name: "Basemap", fields: ["imagery", "terrain", "topographic", "topographic + oceans", "light", "light hillshade"]}, // dark themed option
] 

/*
Others to implement:

- Measurements widget is implemented as event listners tagged to buttons. 
    Implement at a later time, not critical for now. 
    2d and 3d implementations avaliable

- Swipe slider is implemented with two datasets that you can dynamically toggle between. 
    I think this will be useful with geophysical data & topography
    Only avaliable in 2D
    https://developers.arcgis.com/javascript/latest/sample-code/widgets-swipe/

- Scroll slider is implemented with infinite scroll will be increadibly useful visualizing multi-element geochemistry.
    I'll have to wait until I implement some ME geochemistry
    https://developers.arcgis.com/javascript/latest/sample-code/widgets-swipe-scroll/
*/

/************************************ 
 // Popup Templates for Government Data
************************************/

// gis
const claims = {
    "title": "Mineral Exploration Claim",
    "content": "<b>Company: </b>{MIRIAD.MIRIAD_LICENSES.CLIENT_NAME}<br> <b>License Number: </b>{MIRIAD.MIRIAD_LICENSES.LICENSE_NBR}<br> <b>Date Staked: </b>{MIRIAD.MIRIAD_LICENSES.STAKEDATE}<br>"  
};
const gazetted = {
    "title": "Notices Gazetted",
    "content": "<b>License Number: </b>{LICENSE_NBR}<br> <b>Available: </b>{ENDDATE}<br>"  
};
const tenure = {
    "title": "Mineral Tenure",
    "content": "<b>Company: </b>{COMPANY_NAME}<br> <b>Tenure Name: </b>{FEATURENAME}<br> <b>Mineral Tenure Type: </b>{TYPEDESC}<br>"  
};
// geology
const generalGeology = {
    "title": "Generalized Bedrock Geology",
    "content": "<b>Lithology: </b>{LITHOLOGY}<br> <b>Age: </b>{AGE}<br> <b>Tectonic Domain: </b>{TECTONIC}<br> <b>Reference: </b>{REFERENCE}<br>"
}
const detailedGeology = {
    "title": "Detailed Bedrock Geology",
    "content": "<b>Unit Name: </b>{G_UNITNAME}<br> <b>Rock Type: </b>{G_ROCKTYPE}<br> <b>Age: </b>{G_AGERANGE}<br> <b>Geofile: </b>{GEOFILE}<br>"
}
// geochemistry
const plutonicRockGeochem = {
    "title": "Plutonic Rock Geochemistry",
    "content": "<b>SIO2 [%]: </b>{SIO2}<br> <b>K2O [%]: </b>{K2O}<br> <b>NA2O [%]: </b>{NA2O}<br> <b>CAO [%]: </b>{CAO}<br> <b>AL2O3 [%]: </b>{AL2O3}<br>"
}
const tillGeochem = {
    "title": "Till Geochemistry",
    "content": "<b>Gold [ppb]: </b>{AU1_PPB}<br> <b>Silver [ppm]: </b>{AG6_PPM}<br> <b>Cu [ppm]: </b>{CU2_PPM}<br> <b>Lead [ppm]: </b>{PB2_PPM}<br> <b>Zinc [ppm]: </b>{ZN2_PPM}<br>"
}
const lakeSedGeochem = {
    "title": "Lake Sediment Geochemistry",
    "content": "<b>Gold [ppb]: </b>{AU1_PPB}<br> <b>Silver [ppm]: </b>{AG6_PPM}<br> <b>Cu [ppm]: </b>{CU3_PPM}<br> <b>Lead [ppm]: </b>{PB3_PPM}<br> <b>Zinc [ppm]: </b>{ZN3_PPM}<br>"
}
const streamSedGeochem = {
    "title": "Stream Sediment Geochemistry",
    "content": "<b>Gold [ppb]: </b>{AU1_PPB}<br> <b>Silver [ppm]: </b>{AG6_PPM}<br> <b>Cu [ppm]: </b>{Cu4_ppm}<br> <b>Lead [ppm]: </b>{Pb4_ppm}<br> <b>Zinc [ppm]: </b>{Zn4_PPM}<br>"
}
// geophysics - implement later, raster has to be an imagery layer
const geophysNL = {
    "title": "Newfoundland Residual Magnetics",
}
const geophysLab = {
    "title": "Labrador Residual Magnetics",
}
// drilling
const drillCollar = {
    "title": "Drill Collar",
    "content": "<b>Company: </b>{Company}<br> <b>Year: </b>{Year_Drill}<br> <b>Hole ID: </b>{HoleID}<br> <b>Geofile: </b>{GEOFILE_NO}<br>"
}
// mineralisation
const mods = {
    "title": "Mineral Showing",
    "content": "<b>Deposit Name:</b> {DEPNAME}<br> <b>Commodity:</b> {COMNAME}<br> <b>Minerals:</b> {OREMIN}"
}

/************************************ 
 // Styling Government Data
************************************/

// MODS feature layer styling - I'm going to have to style some of this data, unfortunately
// But I don't want to style all of it, I'll have to implement a second filter funciton
// const modsRender = {
//     "type": "simple",
//     symbol: {
//         type: "simple-marker",
//         size: 4,
//         color: "white",
//         outline: { 
//           width: 0.4,
//           color: "black"
//         }
//       }
// };

// //Label mineral occurrences
// const modsLabels = {
//     symbol: {
//         type: "text",
//         color: "black",
//         haloColor: "white",
//         haloSize: "2px",
//         font: {
//         size: "12px",
//         family: "Noto Sans",
//         style: "italic",
//         weight: "normal"
//         }
//     },

//     labelPlacement: "above-center",
//     labelExpressionInfo: {
//         expression: "$feature.MODSLABEL" //Access a feature in the data to label
//     }
// };

/************************************ 
 // Data Room Aside Menu
************************************/

// content for the Data Room aside bar
// urlID and urlExt directly linked to GovNLDataLoc object and the datas location on the REST Server
export const dataList = [
    // GIS data 
    {id: 0, name: "GIS", fields: ["exploraiton claims", "histoircal claims", "cancelled claims", "avaliable claims", "mineral tenure"], 
    urlID: [0, 0, 0, 0, 0], urlExt: ["0", "2", "3", "4", "5"], popup: [claims, claims, claims, gazetted, tenure],
    zLevel: [4, 5, 6, 7, 8]},
    // PROBLEM: Mineral doesn't load?
    
    // Geological data
    {id: 1, name: "Geology", fields: ["detailed geology", "generalized geology"],
    urlID: [2, 2], urlExt: ["19", "23"], popup: [detailedGeology, generalGeology], 
    zLevel: [0, 1]}, 
    // name: Geology (detailed) - Labrador detailed geology separated at urlext no. 16, nfld at urlext no. 19 - how to merge?
    

    // Geochemical data
    {id: 2, name: "Geochemistry", fields: ["rock", "till", "lake sediment", "stream sediment"], 
    urlID: [3, 3, 3, 3], urlExt: ["0", "4", "84", "296"], popup: [plutonicRockGeochem, tillGeochem, lakeSedGeochem, streamSedGeochem], 
    zLevel: [9, 10, 11, 12]},
    // name: Geochemsitry (rock) - urlExt 1 (volcanic major) and 2 (volcanic minor) additionally avaliable

    // Geophysical data
    {id: 3, name: "Geophysics", fields: ["NL. Magnetics", "Lab. Magnetics"], 
    urlID: [5, 4], urlExt: ["157", "50"], popup: [geophysNL, geophysLab], 
    zLevel: [2, 3]},
    // RASTER FORMAT NOT SUPPORTED - geophysical data will have to be an imagery layer
    // just importing two residual mag datasets in NL and Labrador, need more data types and data consolodation here

    // Drilling data
    {id: 4, name: "Drilling", fields: ["drill collars"], urlID: [1], urlExt: ["2"], popup: [drillCollar], 
    zLevel: [13]},

    // Mineralisation data
    {id: 5, name: "Mineralisation", fields: ["MODS Database"], urlID: [1], urlExt: ["3"], popup: [mods], 
    zLevel: [14]},
    // PROBLEM: MODS layer doesn't load?
]

/************************************ 
 // Government of NL Geoscience Atlas
************************************/

// base paths to GovNL Geoscience Atlas REST server data
export const govNLDataLoc = [
    {id: 0, name: 'Mineral Lands', url: 'https://dnrmaps.gov.nl.ca/arcgis/rest/services/GeoAtlas/Mineral_Lands/MapServer/'},
    {id: 1, name: 'Map Layers', url: 'https://dnrmaps.gov.nl.ca/arcgis/rest/services/GeoAtlas/Map_Layers/MapServer/'},
    {id: 2, name: 'Geology', url: 'https://dnrmaps.gov.nl.ca/arcgis/rest/services/GeoAtlas/Bedrock_Geology_All/MapServer/'},
    {id: 3, name: 'Geochemistry', url: 'https://dnrmaps.gov.nl.ca/arcgis/rest/services/GeoAtlas/Geochemistry_All/MapServer/'},
    {id: 4, name: 'Geophysics Lab.', url: 'https://dnrmaps.gov.nl.ca/arcgis/rest/services/GeoAtlas/Geophysics_Labrador/MapServer/'},
    {id: 5, name: 'Geophysics NL.', url: 'https://dnrmaps.gov.nl.ca/arcgis/rest/services/GeoAtlas/Geophysics_Newfoundland/MapServer/'},
    {id: 6, name: 'Indexes', url: 'https://dnrmaps.gov.nl.ca/arcgis/rest/services/GeoAtlas/Indexes/MapServer/'},
]

