const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/ccdee024d47fc286935094f8d1f24059/" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude) +
    "?units=us";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!");
    } else if (body.error) {
      callback("Unable to find location");
    } else {
      const summary = body.daily.data[0].summary;
      const temperature = body.currently.temperature;
      const precipProbability = body.currently.precipProbability;
      const windSpeed = body.currently.windSpeed;
      const windGust = body.currently.windGust;
      callback(
        undefined,
        summary +
          " It is currently " +
          temperature +
          " degrees out. There is a " +
          precipProbability +
          " % chance of rain. Wind speed is " +
          windSpeed +
          " mph with gusts up to " +
          windGust +
          "mph."
      );
    }
  });
};

module.exports = forecast;
