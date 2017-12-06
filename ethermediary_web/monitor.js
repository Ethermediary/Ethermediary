// Read and write statistics about Ethermediary usage

const fs = require('fs')
const path = require('path')

module.exports = function monitor(req, res){

    logPath = path.join(__dirname) + "/log";
    var todayLog = {}
    var logFile

    ////////////////////////////////////////////////////////////////////////////
    // All about the behavior when quitting the server /////////////////////////

    // catch ctrl+c event, call logwrite function before quitting
    process.on('SIGINT', function () {
      process.stdin.resume()
        //var tempsJour = Math.floor(Date.now()/ 86400000); // current number of days since 01/01/70
        var today = new Date()
        var todayDate = today.getUTCDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear()
        logwrite(todayDate, json2add)
    })

    //catch uncaught exceptions, call logwrite function before quitting
    /*process.on('uncaughtException', function(e) {
      process.stdin.resume();
      //var tempsJour = floor(Date.now()/ 86400000); // current number of days since 01/01/70
      var today = new Date()
      var todayDate = today.getUTCDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear()
      logwrite(todayDate, todayLog)
    })*/

    ////////////////////////////////////////////////////////////////////////////
    // I/O log /////////////////////////////////////////////////////////////////

    function logload(){// load the previous log
      console.log('Loading monitoring file ...')

      //Today date exist ? if yes load variables and create related objects
      //var todayDate = Math.floor(Date.now()/ 86400000); // current number of days since 01/01/70
      var today = new Date()
      var todayDate = today.getUTCDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear()
      var todayFile = logPath + "/" + todayDate + ".json"

      // file exist ? if not create
      if (fs.existsSync(todayFile)) {
        console.log("Log file with current date, loading log of the day ...")
        var logFile = JSON.parse(fs.readFileSync(todayFile).toString())
        todayLog["nb_index_load"] = logFile.nb_index_load
        todayLog["nb_new_deal"] = logFile.nb_new_deal
        todayLog["nb_deal_created"] = logFile.nb_deal_created
        todayLog["nb_get_deal"] = logFile.nb_get_deal
        todayLog["nb_how_it_works"] = logFile.nb_how_it_works
        todayLog["nb_terms_of_use"] = logFile.nb_terms_of_use
        todayLog["nb_donation"] = logFile.nb_donation
      }
      else {
        console.log("Log file does not exist, creating new one ...")
        todayLog["nb_index_load"] = 0
        todayLog["nb_new_deal"] = 0
        todayLog["nb_deal_created"] = 0
        todayLog["nb_get_deal"] = 0
        todayLog["nb_how_it_works"] = 0
        todayLog["nb_terms_of_use"] = 0
        todayLog["nb_donation"] = 0
      }
      return todayLog
    }

    ////////////////////////////////////////////////////////////////////////////
    json2add = logload()  // load log at launch ///////////////////////////////

    // todayDate is current date
    // json2add is json object to append to logfile, if not provided, new file !
    function logwrite(todayDate, json2add = '{}'){
      console.log('\nHalt requested. Writing log.json file for ' + todayDate + ". Content is :")

      //var fileName = path.join(__dirname) + "/log/" + todayDate + '.json';
      var todayFile = logPath + "/" + todayDate + ".json"
      console.log(json2add)

      fs.unlink(todayFile, function(err){
        fs.writeFile(todayFile, JSON.stringify(json2add), function(err){
          console.log(" ")
          process.exit(2)
          if(err){
            console.error(err)
          }
        })
      })
    }
};

/*
module.exports = (function(){
  function privateFunc(){
    //do stuff only private members can do 
  }
  let privateVar = "private var";

  return {
    publicVar = "public var",

    publicFunc: function(){
      //do stuff that can call private functions if necessary
    }
  }
})();
*/