const fs = require('fs');

const getKingdomInfo = () => {
  return new Promise(resolve => {
    fs.readFile('./data/kingdoms.json', (err, kingdomData) => {
      if (err) throw err;
      
      kingdomData = JSON.parse(kingdomData);
      console.log(kingdomData);
      let kingdoms = [];
      let kingdomInfo = {}
      for (var key in kingdomData) {
        kingdomInfo[kingdomData[key].name] = {id: kingdomData[key].id, king: '', queen: '', castleCount: kingdomData[key].castleIds.length }
      }

      fs.readFile('./data/kings.json', (err, kingData) => {
        
        kingData = JSON.parse(kingData);
        for (var key in kingdomData) {
          kingdomInfo[kingdomData[key].name].king = kingData[kingdomData[key].kingId].name
        }
      })

      fs.readFile('./data/queens.json', (err, queenData) => {
        
        queenData = JSON.parse(queenData);
        for (var key in kingdomData) {
          kingdomInfo[kingdomData[key].name].queen = queenData[kingdomData[key].queenId].name
        }
      resolve(JSON.stringify(kingdomInfo));
      })
    })
  })
}

const getInfo = (objectName) => {
  fs.readFile('./data/kingdoms.json', (err, kingdomData) => {
      if (err) throw err;

      let selectedKingdom;

      kingdomData = JSON.parse(kingdomData);
      for (var key in kingdomData) {
        if (kingdomData[key].name == kingdomName) {
          selectedKingdom = kingdomData[key];
        }
      }

      console.log(selectedKingdom);

      let castleIds = selectedKingdom.castleIds;
      let castleInfo = {};

      fs.readFile('./data/castles.json', (err, castleData) => {
        castleData = JSON.parse(castleData);

        castleIds.forEach( id => {
          let castleName = castleData[id].name;
          let liegeCount = castleData[id].liegeIds.length;
          castleInfo[castleName] = liegeCount;
        })
        resolve(JSON.stringify(castleInfo));
      })
    })
}

const getCastleInfo = (kingdomName) => {
  return new Promise(resolve => {
    fs.readFile('./data/kingdoms.json', (err, kingdomData) => {
      if (err) throw err;

      let selectedKingdom;

      kingdomData = JSON.parse(kingdomData);
      for (var key in kingdomData) {
        if (kingdomData[key].name == kingdomName) {
          selectedKingdom = kingdomData[key];
        }
      }

      console.log(selectedKingdom);

      let castleIds = selectedKingdom.castleIds;
      let castleInfo = {};

      fs.readFile('./data/castles.json', (err, castleData) => {
        castleData = JSON.parse(castleData);

        castleIds.forEach( id => {
          let castleName = castleData[id].name;
          let liegeCount = castleData[id].liegeIds.length;
          castleInfo[castleName] = liegeCount;
        })
        resolve(JSON.stringify(castleInfo));
      })
    })
  })
}

const getLiegeInfo = (castleName) => {
  return new Promise(resolve => {
    fs.readFile('./data/castles.json', (err, castleData) => {
      if (err) throw err;

      let selectedCastle;

      castleData = JSON.parse(castleData);
      for (var key in castleData) {
        if (castleData[key].name == castleName) {
          selectedCastle = castleData[key];
        }
      }

      let liegeIds = selectedCastle.liegeIds;
      let liegeInfo = {};

      fs.readFile('./data/lieges.json', (err, liegeData) => {
        liegeData = JSON.parse(liegeData);

        liegeIds.forEach( id => {
          let liegeName = liegeData[id].name;
          let vassalCount = liegeData[id].vassalIds.length;
          liegeInfo[liegeName] = vassalCount;
        })
        resolve(JSON.stringify(liegeInfo));
      })
    })
  })
}

const addKingdom = (name, king, queen) => {
  return new Promise(resolve => {
    fs.readFile('./data/kingdoms.json', (err, kingdomData) => {
      kingdomData = JSON.parse(kingdomData);
      let newKingdomId = Object.keys(kingdomData).length + 1;
      kingdomData[newKingdomId] = {};
      kingdomData[newKingdomId].id = newKingdomId;
      kingdomData[newKingdomId].name = name;
      kingdomData[newKingdomId].castleIds = [];
      fs.readFile('./data/kings.json', (err, kingData) => {
        kingData = JSON.parse(kingData);
        let newKingId = Object.keys(kingData).length + 1;
        kingData[newKingId] = {};
        kingdomData[newKingdomId].kingId = newKingId;
        kingData[newKingId].id = newKingId;
        kingData[newKingId].name = king;
        fs.writeFile('./data/kings.json', JSON.stringify(kingData, null, 2), (err) => { if (err) throw err; });
        fs.readFile('./data/queens.json', (err, queenData) => {
          queenData = JSON.parse(queenData);
          let newQueenId = Object.keys(queenData).length + 1;
          queenData[newQueenId] = {};
          kingdomData[newKingdomId].queenId = newQueenId;
          queenData[newQueenId].id = newQueenId;
          queenData[newQueenId].name = queen;
          fs.writeFile('./data/queens.json', JSON.stringify(queenData, null, 2), (err) => { if (err) throw err; });
          fs.writeFile('./data/kingdoms.json', JSON.stringify(kingdomData, null, 2), (err) => { if (err) throw err; });
          resolve();
        })
      })
    })
  })
}

const addCastle = (name, kingdomId) => {

  return new Promise( resolve => {
    fs.readFile('./data/castles.json', (err, castleData) => {
      if (err) throw err;

      castleData = JSON.parse(castleData);
      let newCastleId = Object.keys(castleData).length + 1;
      castleData[newCastleId] = {};
      castleData[newCastleId].id = newCastleId;
      castleData[newCastleId].name = name;
      castleData[newCastleId].liegeIds = [];
      fs.writeFile('./data/castles.json', JSON.stringify(castleData, null, 2), (err) => { if (err) throw err; });

      fs.readFile('./data/kingdoms.json', (err, kingdomData) => {
        kingdomData = JSON.parse(kingdomData);
        kingdomData[kingdomId].castleIds.push(newCastleId);
        fs.writeFile('./data/kingdoms.json', JSON.stringify(kingdomData), (err) => {if (err) throw err;})
        resolve();
      })
    })
  })
}

module.exports = {
  getKingdomInfo,
  getCastleInfo,
  getLiegeInfo,
  addKingdom,
  addCastle
}