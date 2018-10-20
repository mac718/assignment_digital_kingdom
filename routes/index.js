const express = require('express');

const router = express.Router();
const kingdom = require('../lib/kingdom');

router.get('/', (req, res) => {
  kingdom.getKingdoms().then(result => { res.render('index', {result}) });
})

module.exports = router;