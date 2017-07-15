const express = require('express');
const app = express();
const fetch = require('node-fetch');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/', (req, res) => {
  fetch('http://stats.nba.com/stats/scoreboardV2?DayOffset=0&LeagueID=00&gameDate=04/09/2017', {
    method: 'GET',
    headers: {
      'Referer': 'http://stats.nba.com/',
      'DNT': '1',
      'Accept-Encoding': 'gzip, deflate, sdch',
      'Accept-Language': 'en',
      'Accept': '*/*',
      'Connection': 'keep-alive',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
    },
  }).then(res => res.json()).then(json => res.json(json)).catch(json => res.json(json));
});

app.listen(9081, () => {
  console.log('Express server listening on %d', 9081);
});
