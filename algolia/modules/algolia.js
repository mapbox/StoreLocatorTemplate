import { geojsonData, map } from '../js/app.js'

// For the search only version
import algoliasearch from 'algoliasearch/lite';

import { config } from '../config.js';

const client = algoliasearch(config.algoliaAppID, config.algoliaToken);
const index = client.initIndex(config.algoliaIndex);

async function makeGeoJSON() {


  let x = index.search("")
    .then(({ hits }) => {
      var geoJSON = {
        "name": "storeLocations",
        "type": "FeatureCollection",
        "features": []
      };

      function buildGeoJSON(item, index) {
        //console.log(item + ":" + index)

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
        tempFeature.geometry.coordinates.push(storeFeatures[index].Lng, storeFeatures[index].Lat);
        //set feature properties
        tempFeature.properties = storeFeatures[index];
        //add id to be used for sidebar connections
        tempFeature.properties.id = index;

        //console.log(tempFeature)
        //append to geoJSON features
        geoJSON.features.push(tempFeature);


      };

      let storeFeatures = hits
      storeFeatures.forEach(buildGeoJSON)

      return geoJSON

    })
    .catch(err => {
      console.log(err);
    });
  return x

}


export { makeGeoJSON };