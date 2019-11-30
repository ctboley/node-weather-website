const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiY3Rib2xleSIsImEiOiJjazNka2dmcmcwOTV0M25ud2tlbnVrNWZpIn0.EbaYXDY37wa5PhFS2CasDQ";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!");
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.");
    } else {
      const latitude = body.features[0].center[1];
      const longitude = body.features[0].center[0];
      const location = body.features[0].place_name;
      callback(undefined, {
        latitude: latitude,
        longitude: longitude,
        location: location
      });
    }
  });
};

module.exports = geocode;
