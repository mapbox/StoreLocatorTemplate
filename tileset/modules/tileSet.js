import { geojsonData, map } from '../js/app.js'


function makeGeoJSON() {
  let storeFeatures = map.queryRenderedFeatures({ layers: ['storeLocations'] })
  var geoJSON = {
    "name": "storeLocations",
    "type": "FeatureCollection",
    "features": []
  };
  function buildGeoJSON(item, index) {

    //featureTemplate
    let tempFeature = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": []
      },
      "properties": null
    }
    //push geom into it
    tempFeature.geometry.coordinates.push(storeFeatures[index].properties.Lng, storeFeatures[index].properties.Lat);
    //set feature properties
    tempFeature.properties = storeFeatures[index].properties;
    //add id to be used for sidebar connections
    tempFeature.properties.id = index;

    //append to geoJSON features
    geoJSON.features.push(tempFeature);

  };


  storeFeatures.forEach(buildGeoJSON)


  //return geoJSON
  let geojsonDataLocal = geoJSON;
  //buildLocationList(geojsonDataLocal);

  return geojsonDataLocal;
}

export { makeGeoJSON };