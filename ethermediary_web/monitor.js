// Read and write statistics about Ethermediary usage

const fs = require('fs')
const path = require('path')

class Monitor{

  constructor(){
    this.json2add = {"nb_index_load":0,
                "nb_new_deal":0,
                "nb_deal_created":0,
                "nb_get_deal":0,
                "nb_how_it_works":0,
                "nb_terms_of_use":0,
                "nb_donation":0}

    this.logPath = path.join(__dirname) + "/log"
  }

  logload () { /////////////////////////////////////////////////////////////////
    console.log('Loading monitoring file ...')

    var today = new Date()
    var todayDate = today.getUTCDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear()
    var todayFile = this.logPath + "/" + todayDate + ".json"

    if (fs.existsSync(todayFile)) {
      console.log("Log file with current date, loading log of the day ...")
      var logFile = JSON.parse(fs.readFileSync(todayFile).toString())
      this.json2add["nb_index_load"] = logFile.nb_index_load
      this.json2add["nb_new_deal"] = logFile.nb_new_deal
      this.json2add["nb_deal_created"] = logFile.nb_deal_created
      this.json2add["nb_get_deal"] = logFile.nb_get_deal
      this.json2add["nb_how_it_works"] = logFile.nb_how_it_works
      this.json2add["nb_terms_of_use"] = logFile.nb_terms_of_use
      this.json2add["nb_donation"] = logFile.nb_donation
    }
    else {
      console.log("Log file does not exist, creating new one ...")
    }
  }

  // Write log and exit if 1 passed as parameter
  logwrite (exit=0) {  /////////////////////////////////////////////////////////
    process.stdin.resume()
    var today = new Date()
    var todayDate = today.getUTCDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear()

    console.log('\nHalt requested. Writing log.json file for ' + todayDate + ". Content is :")
    var todayFile = this.logPath + "/" + todayDate + ".json"
    var that = this.json2add
    console.log(that)

    fs.unlink(todayFile, function(err){
      fs.writeFile(todayFile, JSON.stringify(that), function(err){
        console.log(" ")
        if(exit == 1) { process.exit(2) } // Where the magic append
        if(err){
          console.error(err)
        }
      })
    })
  }

}

module.exports = new Monitor()
