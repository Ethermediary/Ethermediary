const express = require('express')
const app = express()
const favicon = require('serve-favicon')
const path = require('path')
const hoffman = require('hoffman')
//const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const schedule = require('node-schedule')

// So we can use these variables in the whole app
global.json2add = {"nb_index_load":0,"nb_new_deal":0,"nb_deal_created":0,"nb_get_deal":0,"nb_how_it_works":0,"nb_terms_of_use":0,"nb_donation":0}
const monitor = require('./monitor.js');
monitor();

const formular = require('./formular.js');
const mailer = require("./mailer.js");

app.use(function(req, res, next){
  console.log(req.method + ":" + req.url);
  next();
});

// Set path ...
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
doCache = false;
app.use(favicon(path.join(__dirname, "public", "imgs", "favicon.png")));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(cookieParser());
app.engine('dust', hoffman.__express());
//set the view engine to dust
app.set('view engine', 'dust');
//indicate to express where the views directory is
app.set('views', path.join(__dirname, 'views'));
app.set('view cache', doCache);
app.enable('trust proxy');

// mailer.sendMail("plenituz@gmail.com", "salut", "Bonjour je suis un bonhomme")
// .then(rep => {
//   console.log("rep:", rep);
// })
// .catch(err => {
//   console.log("err:", err);
// })


app.use(formular);

app.get('/', function (req, res) {
  res.render('skeleton.dust', {req : req});
})

var ip = require('ip')
var ipadress = ip.address()
var ser = app.listen(3000, "127.0.0.1",
    function () {
}) // run everyday at midnight (NOT TESTED)
  monitor()
schedule.scheduleJob('0 0 * * *', () => function(){
        console.log(" ")
        console.log("==========================================================")
        console.log("Server running from " + ipadress + " on port " + "3000")
        console.log("==========================================================")
})