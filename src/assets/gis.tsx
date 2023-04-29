import React, { useState } from 'react';
import WebMap from "@arcgis/core/WebMap.js";

/************************************************************
 * Creates a new WebMap instance. A WebMap must reference
 * a PortalItem ID that represents a WebMap saved to
 * arcgis.com or an on-premise portal.
 ************************************************************/

const webmap: any = new WebMap({
  portalItem: {
    id: "e691172598f04ea8881cd2a4adaa45ba"
  }
});

/************************************************************
 * Set the WebMap instance to the map property in a MapView.
 ************************************************************/
const view: any = new MapView({
  map: webmap,
  container: "viewDiv" //viewDiv was simply in my HTML last time, Can I have this div in App?
});