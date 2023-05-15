// ArcGIS imports
import esriRequest from '@arcgis/core/request'
// Local imports
import { popups } from '../esri/utils'

// base path to GovNL GeoAtlas REST server
const base: string = 'https://dnrmaps.gov.nl.ca/arcgis/rest/services/GeoAtlas/Mineral_Lands/MapServer/';

export const Test = () => {
    esriRequest(base + "3", {
        responseType:'text'
        }).then(function(response){
            let geoJson = response.data;
            console.log(geoJson)
        })
    return(
        <div></div>
    );
}