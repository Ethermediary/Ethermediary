// Read and write statistics about Ethermediary usage

const fs = require("fs");
const path = require("path");
const Q = require("q");
const schedule = require("node-schedule");

const logPath = path.join(__dirname, "log");

function formattedDate() {
  let today = new Date();

  return (
    today.getUTCDate() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getFullYear()
  );
}

class Monitor {
  constructor() {
    this.reset();
  }

  reset() {
    this.json2add = {};
  }

  incrementStat(name) {
    if (name in this.json2add) this.json2add[name]++;
    else this.json2add[name] = 1;
  }

  startScheduledSaving() {
    // run everyday at midnight (NOT TESTED)
    schedule.scheduleJob("0 0 * * *", () => {
      this.writeLog().then(() => this.reset());
    });

    // catch ctrl+c event & call writeLog(1) function before quitting
    process.on("SIGINT", () => this.writeLog(true));
    process.on("uncaughtException", (err) => {
      this.writeLog(true);
    });
  }

  /** Load or create log file */
  loadLog() {
    console.log("Log setup ...");

    let todayFile = path.join(logPath, formattedDate() + ".json");

    if (fs.existsSync(todayFile)) {
      console.log("Log file for today already exists. Loading ...");
      let logFile = JSON.parse(fs.readFileSync(todayFile).toString());
      this.json2add = logFile;
    } else {
      console.log("Log file for today does not exist. Creating ...");
    }
    console.log("Log setup done.");
  }

  /** Write log and exit if true passed as parameter */
  writeLog(exit = false) {
    process.stdin.resume();

    //don't save empty objects
    if (Object.keys(this.json2add).length == 0) {
      if (exit) process.exit();
      return;
    }

    let todayDate = formattedDate();

    console.log(
      "\nHalt requested. Writing log.json file for " +
        todayDate +
        ". Content is :\n",
      this.json2add
    );

    let todayFile = path.join(logPath, todayDate + ".json");

    return Q.nfcall(fs.writeFile, todayFile, JSON.stringify(this.json2add))
      .then(() => {
        console.log(" ");
        if (exit) process.exit();
      })
      .catch((err) => {
        if (exit) {
          console.error(err);
          process.exit(1);
          return;
        }
        //throw the error back if we don't exit,
        //that way other .then won't be hit
        throw err;
      });
  }
}

module.exports = new Monitor();
