const express = require('express');
const app = express();
const fs = require('fs');
const expressLayouts = require('express-ejs-layouts');
const index = require('./routes/index');

app.set('view engine', 'ejs');

app.use(expressLayouts);

app.use(express.static(`${__dirname}/public`))

app.use('/', index);

app.listen(3000, 'localhost', () => {
  console.log('listening...');
})