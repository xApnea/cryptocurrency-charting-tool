const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, '/../public')));

app.get('/api', (req, res) => {
  res.status(200).send('Request was good');
})

// https://api.coindesk.com/v1/bpi/historical/close.json
// https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-09-05


const port = process.env.PORT || 3000;
var server = app.listen(port, () => {console.log(`Listening on port: ${port}`)});

module.exports = server;