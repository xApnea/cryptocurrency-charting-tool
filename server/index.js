const express = require('express');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, '/../public')));

app.get('/api', (req, res) => {
  const start = req.query.start;
  const end = req.query.end;

  console.log(start);
  console.log(end);

  const path = (start && end) ? `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}` : 'https://api.coindesk.com/v1/bpi/historical/close.json';

  axios.get(path)
    .then((response) => {
      console.log(response.data);
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
})

// https://api.coindesk.com/v1/bpi/historical/close.json
// https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-09-05


const port = process.env.PORT || 3000;
var server = app.listen(port, () => {console.log(`Listening on port: ${port}`)});

module.exports = server;