//const { fetchMyIP } = require('./iss_promised');
//const { fetchCoordsByIP } = require('./iss_promised');
//const { fetchISSFlyOverTimes } = require('./iss_promised');
const { nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTimes = function(passTimes) {
    for (const item of JSON.parse(passTimes).response) {
        const date = new Date(0);
        date.setUTCSeconds(item.risetime)
        console.log(`Next pass at ${date} for ${item.duration} seconds!`);
    }
}

nextISSTimesForMyLocation()
.then((body) => printPassTimes(body))
.catch((error) => {
    console.log("It didn't work: ", error.message);
  });



