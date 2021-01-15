const request = require('request-promise-native');

const fetchMyIP = function() {
  //request-promise-native returns a promise when called so you dont have to create it manually, it is promise friendly!!
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
   return request('https://freegeoip.app/json/' + JSON.parse(body).ip);   
}

const fetchISSFlyOverTimes = function(body) {
    const co = {latitude: JSON.parse(body).latitude, longitude: JSON.parse(body).longitude};
    return request(`http://api.open-notify.org/iss-pass.json?lat=${co.latitude}&lon=${co.longitude}`)
}

const nextISSTimesForMyLocation = function() {
    return fetchMyIP().then(fetchCoordsByIP).then(fetchISSFlyOverTimes).then((body) => {
        return body;
    })
}


//module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
module.exports = { nextISSTimesForMyLocation }