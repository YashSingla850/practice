// EXTRA
// write file sync karne ke liye content str me hona chaiye to uske liye sabse phele hame ek empty array me
// sara data phejna pade ga (arr.push) method se phir uske baad use string bnanana pade ga (arr.join("\n"))
// method se tabhi hoga

// HOW TO CREATE BIG FILE
///////////////// CODE///////////////////

// let minimist = require("minimist");
// let fs = require("fs");
// let args = minimist(process.argv);
// let arr = [];
// for (let i = 1; i < 50000; i++) {
//   arr.push(i);
// }
// let str = arr.join("\n");
// // console.log(str);
// fs.writeFileSync(args.dest, str, "utf-8");
// fs.appendFiledSync(args.dest, str, "utf-8");
/////////////////////////////////////////////////////

/////////////////////////////////////////////////////
//  LACK OF CALLBACK
// ti read a file(disk)
// t2 calculate  prime number(cpu)
// t2 will be done after t1
// node lecture5.js --source=big.data --n=7000

///////////////// CODE///////////////////

// let minimist = require("minimist");
// let fs = require("fs");
// // const { log, time } = require("console");
// let args = minimist(process.argv);

// // task1

// let t1 = Date.now(); //number of milisecond since 1st jan 1970
// console.log("task1 , started at" + (t1 % 10000));
// let data = fs.readFileSync(args.source);

// let t2 = Date.now();
// console.log("task1 , finished at" + (t2 % 10000));
// console.log(t2 - t1);

// // task2
// function IsPrime(x) {
//   let isPrime = true;

//   for (let div = 2; div <= x - 1; div++) {
//     if (x % div == 0) {
//       isPrime = false;
//       break;
//     }
//   }

//   return isPrime;
// }
// let t3 = Date.now(); // number of milliseconds elapsed since 1st jan 1970
// console.log("Task2 started at " + (t3 % 100000));

// let arr = [];
// for (let i = 2; i < args.n; i++) {
//   let isPrime = IsPrime(i);
//   if (isPrime == true) {
//     arr.push(i);
//   }
// }

// let t4 = Date.now();
// console.log("Task2 finished at " + (t4 % 100000));
// console.log(t4 - t3);

// console.log("total time" + (t4 - t1));
////////////////////////////////////////////////

////////////////////////////////////////////////
//  LECTURE-6
// CALL BACK FUNCTION

// let minimist = require("minimist");
// let fs = require("fs");
// // const { log, time } = require("console");
// let args = minimist(process.argv);

// // task1

// let t1 = Date.now(); //number of milisecond since 1st jan 1970
// console.log("task1 , started at" + (t1 % 10000));
// let data = fs.readFile(args.source, function (err, data) {
//   let t2 = Date.now();
//   console.log("task1 , finished at" + (t2 % 10000));
//   console.log(t2 - t1);
// });

// let t2 = Date.now();
// console.log("task1 , finished at" + (t2 % 10000));
// console.log(t2 - t1);

// // task2
// function IsPrime(x) {
//   let isPrime = true;

//   for (let div = 2; div <= x - 1; div++) {
//     if (x % div == 0) {
//       isPrime = false;
//       break;
//     }
//   }

//   return isPrime;
// }
// let t3 = Date.now(); // number of milliseconds elapsed since 1st jan 1970
// console.log("Task2 started at " + (t3 % 100000));

// let arr = [];
// for (let i = 2; i < args.n; i++) {
//   let isPrime = IsPrime(i);
//   if (isPrime == true) {
//     arr.push(i);
//   }
// }

// let t4 = Date.now();
// console.log("Task2 finished at " + (t4 % 100000));
// console.log(t4 - t3);

// console.log("total time" + (t4 - t1));

// //////////////////////////////////////
// DOWNLOADING DATA FROM WEB USING AXIOS
// AXIOS(NPM INSTALL AXIOS)
// node lecture5.js url="https://www.espncricinfo.com/series/ipl-2021-1249214/match-schedule-fixtures" --dest="download.html"

// let minimist = require("minimist");
// let fs = require("fs");
// let axios = require("axios");

// let args = minimist(process.argv);
// let dwnldPromise = axios.get(args.url);

// dwnldPromise
//   .then(function (response) {
//     let html = response.data;
//     fs.writeFileSync(args.dest, html, "utf-8");
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
////////////////////////////////////////////////
//  LECTURE-7
////////////////////////////////////////////////

// node work.js  --source="download.html" --dest="snippet1"
// npm install jsdom
// (js dom ek sasta browser hota hai jo hamare
//  liye html files ko padhne layak bna deta ha)

// let minimist = require("minimist");
// let fs = require("fs");
// let jsdom = require("jsdom");
// // const { stringify } = require("querystring");
// // const { arrayBuffer } = require("stream/consumers");

// let args = minimist(process.argv);
// fs.readFile(args.source, "utf-8", function (err, html) {
//   let dom = new jsdom.JSDOM(html);
//   let document = dom.window.document;
//   let Desc = [];
//   let desc = document.querySelectorAll("p.name");

//   for (let i = 0; i < desc.length; i++) {
//     Desc.push(desc[i].textContent);
//   }
//   let str = Desc.join("\n");
//   let str = stringify(Desc);
//   fs.writeFileSync(args.dest, str, "utf-8");

//   console.log(err);
// });

////////////////////////////////////////////////
//  LECTURE-8
////////////////////////////////////////////////

// FIRST EXPERINCE WITH JSON
// JSON KI FULL FORM HAI (JAVASCRIPT OBJECT NOTATION)
//JSON MEANS SVING DATA IN SAME FORMAT AS OF JAVASCRIPT OBJECT

// node work.js --dest="teams.json"

// let minimist = require("minimist");
// let fs = require("fs");
// let args = minimist(process.argv);
// // console.log(args.dest);

// let team = [
//   {
//     name: "India",
//     rank: 1,
//     matches: [
//       {
//         vs: "Australia",
//         result: "won",
//       },
//       {
//         vs: "England",
//         result: "won",
//       },
//     ],
//   },
//   {
//     name: "Australia",
//     rank: 2,
//     matches: [
//       {
//         vs: "India",
//         result: "Loss",
//       },
//       {
//         vs: "England",
//         result: "won",
//       },
//     ],
//   },
//   {
//     name: "England",
//     rank: 3,
//     matches: [
//       {
//         vs: "Australia",
//         result: "Loss",
//       },
//       {
//         vs: "India",
//         result: "Loss",
//       },
//     ],
//   },
// ];

// // console.log(team[1].matches[0].result);
// let json = JSON.stringify(team);
// fs.writeFileSync(args.dest, json, "utf-8");

//////////////////////////////////////////////////////
// HOW TO READ FILE IN JSON
// FIRST CONVERT JSON FILE IN JSO(JAVA SCRIPT OBJECT) USING PARSE (RESOLVING A SENTENCE INTO ITS COMPONENT)
//

// node work.js --source="teams.json"

// let minimist = require("minimist");
// let fs = require("fs");
// let args = minimist(process.argv);

// fs.readFile(args.source, "utf-8", function (err, data) {
//   if (err) {
//     console.log(err);
//   } else {
// let teams = JSON.parse(data);
// console.log(teams);
// console.log(teams[1].matches[0].result);
//   }
// });

////////////////////////////////////////////////
//  LECTURE-9
////////////////////////////////////////////////

//

// node work.js  --source="teams.json" --dest="team.csv"

// let minimist = require("minimist");
// let xl = require("excel4node");
// let fs = require("fs");
// // const {
// //   colorScheme,
// //   excelColor,
// // } = require("excel4node/distribution/lib/types");
// let args = minimist(process.argv);
// fs.readFile(args.source, "utf-8", function (err, data) {
//   if (err) {
//     console.log(err);
//   } else {
//     let teams = JSON.parse(data);
//     // console.log(teams);
//     let wb = new xl.Workbook();

//     let style = wb.createStyle({
//       font: {
//         color: "red",
//       },
//     });

//     for (let i = 0; i < teams.length; i++) {
//       let ws = wb.addWorksheet(teams[i].name);
//       ws.cell(1, 1).string("opponent").style(style);
//       ws.cell(1, 2).string("result").style(style);
//       ws.cell(1, 4).string("rank").style(style);
//       ws.cell(1, 5).number(teams[i].rank);

//       for (j = 0; j < teams[i].matches.length; j++) {
//         ws.cell(2 + j, 1).string(teams[i].matches[j].vs);
//         ws.cell(2 + j, 2).string(teams[i].matches[j].result);
//       }
//     }
//     wb.write(args.dest);
//   }
// });

////////////////////////////////////////////////
//  LECTURE-9
////////////////////////////////////////////////

//
