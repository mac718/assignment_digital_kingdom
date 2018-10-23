const fs = require('fs');

const getKingdomInfo = () => {
  return new Promise(resolve => {
    fs.readFile('./data/kingdoms.json', (err, kingdomData) => {
      if (err) throw err;
      
      kingdomData = JSON.parse(kingdomData);
      let kingdoms = [];
      let kingdomInfo = {}
      for (var key in kingdomData) {
        kingdomInfo[kingdomData[key].name] = {king: '', queen: '', castleCount: kingdomData[key].castleIds.length }
        //console.log(kingdomInfo[kingdomData[key].name].king);
          

      }

      
        //console.log(kingdoms)
        fs.readFile('./data/kings.json', (err, kingData) => {
          
          kingData = JSON.parse(kingData);
          for (var key in kingdomData) {
          //console.log(kingdomInfo[kingdomData[key].name]);
          kingdomInfo[kingdomData[key].name].king = kingData[kingdomData[key].kingId].name

        }
        //kingdoms.push(kingdomInfo)
        })

        fs.readFile('./data/queens.json', (err, queenData) => {
          
          queenData = JSON.parse(queenData);
          for (var key in kingdomData) {
          //console.log(kingdomInfo[kingdomData[key].name])
          kingdomInfo[kingdomData[key].name].queen = queenData[kingdomData[key].queenId].name

        }
        resolve(JSON.stringify(kingdomInfo));
        //kingdoms.push(kingdomInfo)
        })
    })
  })
}

const getCastleInfo = (kingdomName) => {
  return new Promise(resolve => {
    fs.readFile('./data/kingdoms.json', (err, kingdomData) => {
      if (err) throw err;

      let selectedKingdom;

      kingdomData = JSON.parse(kingdomData);
      //console.log(kingdomData);
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
        //console.log(castleInfo);
        resolve(JSON.stringify(castleInfo));
      })
    })
  })
}

// const getKingdomRoyalty = () => {
//   return new Promise(resolve => {
//     fs.readFile('./data/kingdoms.json', (err, data) =>{
//       if (err) throw err;
      
//       data = JSON.parse(data);
//       let royalty = {};
      
//       for (var key in data) {
//         kingdoms.push(data[key].name);
//       }
//       resolve(kingdoms);
//     })
//   })
// }

module.exports = {
  getKingdomInfo,
  getCastleInfo
}