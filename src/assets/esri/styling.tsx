/************************************ 
 // NL Mineral Lands Data
************************************/

// popup labels for cureent live mineral exploration claims
const claimsPopup: any = {
    "title": "Mineral Exploration Claim",
    "content": "<b>Company: </b>{MIRIAD.MIRIAD_LICENSES.CLIENT_NAME}<br> <b>License Number: </b>{MIRIAD.MIRIAD_LICENSES.LICENSE_NBR}<br> <b>Date Staked: </b>{MIRIAD.MIRIAD_LICENSES.STAKEDATE}<br>"  
};

const historicalClaimsPopup: any = {
    "title": "Historical Exploraiton Claims",
    "content": "<b>Company: </b>{MIRIAD.MIRIAD_LICENSES.CLIENT_NAME}<br> <b>License Number: </b>{MIRIAD.MIRIAD_LICENSES.LICENSE_NBR}<br> <b>Date Staked: </b>{MIRIAD.MIRIAD_LICENSES.STAKEDATE}<br>"  
};

const cancelledPopup: any = {
    "title": "Mineral Rights Cancelled",
    "content": "<b>Company: </b>{MIRIAD.MIRIAD_LICENSES.CLIENT_NAME}<br> <b>License Number: </b>{MIRIAD.MIRIAD_LICENSES.LICENSE_NBR}<br> <b>Date Staked: </b>{MIRIAD.MIRIAD_LICENSES.STAKEDATE}<br>"  
};

const gazettedPopup: any = {
    "title": "Notices Gazetted",
    "content": "<b>License Number: </b>{LICENSE_NBR}<br> <b>Available: </b>{ENDDATE}<br>"  
};

const tenurePopup: any = {
    "title": "Mineral Tenure",
    "content": "<b>Company: </b>{COMPANY_NAME}<br> <b>Tenure Name: </b>{FEATURENAME}<br> <b>Mineral Tenure Type: </b>{TYPEDESC}<br>"  
};

// export popup styling
export const popups = [claimsPopup, historicalClaimsPopup, cancelledPopup, gazettedPopup, tenurePopup]

// menu object, toggle ArcGIS widgets
type toolList = {
    id: number;
    name: string; 
    fields: Array<string>;
}
export const toolList = [
    {id: 0, name: "Widgets", fields: ["sketch", "zoom", "view"]},
    {id: 1, name: "Analysis", fields: ["Plot", "Table"]},
    {id: 2, name: "Perspective", fields: ["2D", "3D"]},
]