const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');


/*fetchMyIP((error, IP) => {
    if (error) {
        console.log("It didn't work!" , error);
        return;
    }
    console.log('It worked! Returned IP:' , IP);
});*/

/*fetchCoordsByIP('72.140.153.203', (error, coordinates) => {
    if (error) {
        console.log("It didn't work!" , error);
        return;
    }
    console.log('It worked! Returned coordinates:' , coordinates);
})*/

/*fetchISSFlyOverTimes({latitude: 43.8841, longitude: -79.0607}, (error, passTimes) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned flyover times:' , passTimes);
});*/


nextISSTimesForMyLocation((error, passTimes) => {
    if (error) {
      return console.log("It didn't work!", error);
    }
    // success, print out the deets
    for (const item of passTimes) {
        const date = new Date(0);
        date.setUTCSeconds(item.risetime)
        console.log(`Next pass at ${date} for ${item.duration} seconds!`);
    }
});

