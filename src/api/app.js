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
  const url = 'http://stats.nba.com/stats/scoreboardV2?DayOffset=0&LeagueID=00&gameDate=04/09/2017';
  reqwest(url).then((response) => {
    res.json(transformer(response.resultSets[0]));
  });
});

app.get('/leaguedashplayerstats', (req, res) => {
  const url = 'http://stats.nba.com/stats/leaguedashplayerstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=&DraftYear=&GameScope=&GameSegment=&Height=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2016-17&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&StarterBench=&TeamID=0&VsConference=&VsDivision=&Weight=';
  reqwest(url).then((response) => {
    res.json(transformer(response.resultSets[0]));
  });
});

const transformer = (result) => {
  return {
    headers: result.headers.map((item, index) => filterHeader(item, index)).filter(i => i),
    values: result.rowSet.slice(0, 50).map((item) => {
      return Object.assign({}, item);
    }),
  };
};

const filterHeader = (item, index) => {
  const header = ['PLAYER_NAME', 'AGE', 'GP', 'W', 'L', 'W_PCT', 'MIN', 'FGM', 'FGA', 'FG_PCT', 'FG3M', 'FG3A', 'FG3_PCT'];
  const headerFixed = ['PLAYER_NAME'];
  if (header.indexOf(item) > -1) {
    let obj = {
      title: item,
      key: index,
      width: 100,
    };

    if (headerFixed.indexOf(item) > -1) {
      obj = Object.assign({}, obj, {fixed: 'left', width: 150, sortable: true});
    }

    return obj;
  }
};

const reqwest = (url) => {
  return fetch(url, {
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
  }).then(res => res.json()).catch(res => console.log(res));
};

app.listen(9081, () => {
  console.log('Express server listening on %d', 9081);
});
