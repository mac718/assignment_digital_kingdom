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

router.get('/kingdoms/:kingdom', (req, res) => {
  console.log(req.params.kingdom);
  kingdom.getCastleInfo(req.params.kingdom)
    .then(result => {
      //result = JSON.parse(result);
      console.log(result)
      res.render('kingdoms/show', {result: result, kingdom: req.params.kingdom});
    })    
})

module.exports = router;