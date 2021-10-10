// node project1.js --url="https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/match-results" --dest="scorecard" --read="teams.json" --excel="team.csv" --folder="folder"

let minimist = require("minimist");
let axios = require("axios");
let jsdom = require("jsdom");
let path = require("path");
let fs = require("fs");
let xl = require("excel4node");
let pdf = require("pdf-lib");
let args = minimist(process.argv);
let dwnldData = axios.get(args.url);
dwnldData.then(function (response) {
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

    let scoreCard = JSON.stringify(matches);
    fs.writeFileSync(args.dest, scoreCard, "utf-8");
  }
  let teams = [];
  for (let i = 0; i < matches.length; i++) {
    putTeamsInArray(teams, matches[i]);
  }
  for (let i = 0; i < matches.length; i++) {
    putMatchInApporpriatePlace(
      teams,
      matches[i].t1,
      matches[i].t2,
      matches[i].t1s,
      matches[i].t2s,
      matches[i].result
    );
    putMatchInApporpriatePlace(
      teams,
      matches[i].t2,
      matches[i].t1,
      matches[i].t2s,
      matches[i].t1s,
      matches[i].result
    );
  }
  let teamJson = JSON.stringify(teams);
  fs.writeFileSync("teams.json", teamJson, "utf-8");

  // making excel file
  fs.readFile(args.read, "utf-8", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      let team = JSON.parse(data);
      // console.log(data);

      let wb = new xl.Workbook();

      for (let i = 0; i < team.length; i++) {
        let ws = wb.addWorksheet(team[i].name);
        ws.cell(1, 1).string("selfScore");
        ws.cell(1, 3).string("opponent");
        ws.cell(1, 5).string("oppSore");
        ws.cell(1, 7).string("result");
        for (j = 0; j < team[i].matches.length; j++) {
          ws.cell(3 + j, 1).string(team[i].matches[j].selfScore);
          ws.cell(3 + j, 3).string(team[i].matches[j].vs);
          ws.cell(3 + j, 5).string(team[i].matches[j].oppScore);
          ws.cell(3 + j, 7).string(team[i].matches[j].result);
        }
      }

      wb.write(args.excel);
    }
  });
  // creating folder
  fs.readFile(args.read, "utf-8", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      let team = JSON.parse(data);
      for (let i = 0; i < team.length; i++) {
        let folderName = path.join(args.folder, teams[i].name);
        fs.mkdirSync(folderName);

        for (let j = 0; j < team[i].matches.length; j++) {
          let matchPdf = path.join(folderName, team[i].matches[j].vs + ".pdf");
          createMatchPdf(team[i].name, team[i].matches[j], matchPdf);
        }
      }
    }
  });
});

///////////// functions//////////////////////////
function putTeamsInArray(teams, match) {
  let t1idx = -1; //team 1 index
  for (let i = 0; i < teams.length; i++) {
    if (teams[i].name == match.t1) {
      t1idx = i;
      break;
    }
  }
  if (t1idx == -1) {
    teams.push({
      name: match.t1,
      matches: [],
    });
  }
  let t2idx = -1; //team 2 index
  for (let i = 0; i < teams.length; i++) {
    if (teams[i].name == match.t2) {
      t2idx = i;
      break;
    }
  }
  if (t2idx == -1) {
    teams.push({
      name: match.t2,
      matches: [],
    });
  }
}

function putMatchInApporpriatePlace(
  teams,
  homeTeam,
  vsTeam,
  selfScore,
  vsScore,
  result
) {
  let t1idx = -1; //team 1 index
  for (let i = 0; i < teams.length; i++) {
    if (teams[i].name == homeTeam) {
      t1idx = i;
      break;
    }
  }
  let team = teams[t1idx];
  team.matches.push({
    vs: vsTeam,
    selfScore: selfScore,
    oppScore: vsScore,
    result: result,
  });
}

function createMatchPdf(teamName, match, matchPdf) {
  t1 = teamName;
  t2 = match.vs;
  t1s = match.selfScore;
  t2s = match.oppScore;
  result = match.result;

  let readPdf = fs.readFileSync("template.pdf");
  let pdfPromise = pdf.PDFDocument.load(readPdf);
  pdfPromise.then(function (pdfdoc) {
    let page = pdfdoc.getPage(0);

    page.drawText(t1, {
      x: 360,
      y: 615,
      size: 13,
    });
    page.drawText(t2, {
      x: 360,
      y: 575,
      size: 13,
    });
    page.drawText(t1s, {
      x: 360,
      y: 535,
      size: 13,
    });
    page.drawText(t2s, {
      x: 360,
      y: 500,
      size: 13,
    });
    page.drawText(result, {
      x: 320,
      y: 465,
      size: 10,
    });

    let finalPromise = pdfdoc.save();
    finalPromise.then(function (finalPdf) {
      fs.writeFileSync(matchPdf, finalPdf);
    });
  });
}
