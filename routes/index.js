const express = require('express');

const router = express.Router();
const kingdom = require('../lib/kingdom');

router.get('/', (req, res) => {
  kingdom.getKingdomInfo()
    .then(result => { 
      result = JSON.parse(result)
      res.render('index', {result}) 
    });
})

router.get('/kingdoms/:kingdom/:id', (req, res) => {
  kingdom.getCastleInfo(req.params.kingdom)
    .then(result => {
      //result = JSON.parse(result);
      console.log(result)
      res.render('kingdoms/show', {result: result, kingdom: req.params.kingdom, id: req.params.id});
    })    
})

router.get('/castles/:castle', (req, res) => {
  kingdom.getLiegeInfo(req.params.castle)
    .then(result => {
      //result = JSON.parse(result);
      res.render('castles/show', {result: result, castle: req.params.castle});
    })    
})

router.post('/kingdom', (req, res) => {
  let name = req.body.name;
  let king = req.body.king;
  let queen = req.body.queen;
  kingdom.addKingdom(name, king, queen)
    .then((result) => {
      res.redirect('/');
    });
  //console.log(req.body.name);
})

router.post('/castle', (req, res) => {
  let name = req.body.castleName;
  let kingdomId = req.body.kingdomId;
  let kingdomName = req.body.kingdomName;
  console.log(kingdomId);
  kingdom.addCastle(name, kingdomId)
    .then(() => {
      res.redirect('back');
    });
})

module.exports = router;