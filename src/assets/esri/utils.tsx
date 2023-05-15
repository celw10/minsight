/************************************ 
 // Data Room Navigation Utilities
************************************/

// content for the Data Room navigation bar
// Note: Only one of Basemap & Perspective are toggled at onces, 2D and imagery left toggled on by default
export const toolList = [
    {id: 0, name: "Widgets", fields: ["layers"]},
    {id: 1, name: "Utilities", fields: ["sketch", "coordinate conversion", "elevation profile", "export map image"]},
    {id: 2, name: "Sliders", fields: ["swipe", "scroll"]},
    {id: 3, name: "Basemap", fields: ["imagery", "terrain", "topographic", "topographic + oceans", "light", "light hillshade"]}, // dark themed option
    {id: 4, name: "Perspective", fields: ["2D", "3D"]},
    {id: 5, name: "Analysis", fields: ["Not", "Implemented"]},
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
 // Data Room Aside Menu
************************************/