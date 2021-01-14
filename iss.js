const request = require('request');

const fetchMyIP = function(callback) {

  request('https://api.ipify.org/?format=json', (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(null, JSON.parse(body).ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request('https://freegeoip.app/json/' + ip, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    let coordinates = {latitude: JSON.parse(body).latitude, longitude: JSON.parse(body).longitude};
    callback(null, coordinates);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }
  
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    callback(null, JSON.parse(body).response);
  });
};
  
const nextISSTimesForMyLocation = function(callback) {
    fetchMyIP((error, IP) => {
        if (error) {
            console.log("There is an IP search failure!!!   ", error)
        } else {
            fetchCoordsByIP(IP, (error, coordinates) => {
                if (error) {
                    console.log("There is a problem in fetching coordinates!!!  ", error)
                } else {
                    fetchISSFlyOverTimes(coordinates, (error, passTimes) => {
                        if (error) {
                            console.log("There is failure in fetching passTimes of ISS!!   ", error)
                        } else {
                            callback(null, passTimes)
                        }
                    })
                }
            })
        }
    })
}

module.exports = { nextISSTimesForMyLocation };

