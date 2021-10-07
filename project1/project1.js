// node project1.js --url="https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/match-results" --dest="score-card"

let minimist = require("minimist");
let axios = require("axios");
let jsdom = require("jsdom");
const { fstat } = require("fs");

let fs = require("fs");
// let excel4node = require("excel4node");
// let pdf = require("pdf.lib");
let args = minimist(process.argv);
let dwnldData = axios.get(args.url);
dwnldData
  .then(function (response) {
    let html = response.data;
    let dom = new jsdom.JSDOM(html);
    let document = dom.window.document;
    let matches = [];
    let desc = document.querySelectorAll("div.match-score-block");
    for (let i = 0; i < desc.length; i++) {
      let match = {};

      let nameTeam = desc[i].querySelectorAll("p.name");
      match.t1 = nameTeam[0].textContent;
      match.t2 = nameTeam[1].textContent;

      let teamScore = desc[i].querySelectorAll("div.score-detail>span.score");

      if (teamScore.length == 2) {
        match.t1s = teamScore[0].textContent;
        match.t2s = teamScore[1].textContent;
      } else if (teamScore.length == 1) {
        match.t1s = teamScore[0].length;
        match.t2s = " ";
      } else {
        match.t1s = " ";
        match.t2s = " ";
      }
      let result = desc[i].querySelector("div.status-text>span");
      match.result = result.textContent;
      matches.push(match);
      //   let str = matches.join("\n");
      let scoreCard = JSON.stringify(matches);
      fs.writeFileSync(args.dest, scoreCard, "utf-8");
    }
  })
  .catch(function (error) {
    console.log(error);
  });
