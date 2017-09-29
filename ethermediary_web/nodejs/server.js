const express = require('express');
const app = express();
const favicon = require('serve-favicon');
const path = require('path');
const hoffman = require('hoffman');
//const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
//const { check, validationResult } = require('express-validator/check');
//const { matchedData } = require('express-validator/filter');
//server = require('http').createServer(app);
//io = require('socket.io')(server);
const formular = require('./formular.js');
const mailer = require("./mailer.js");
const monitor = require('./monitor.js');


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

//contractInteraction.startWatchingContract();

// var interval = setInterval(function(){
//   mailer.sendMail("plenituz@gmail.com", "petit pd des bois", "salut sdfsdf petit pd des bois"+i);
//   i++;
//   if(i > 49)
//     clearInterval(interval);
// }, 1000);

////////////////////////////////////////////////////////////////////////////////

// Every page parser
/*app.get('/:page', function(req, res) {
  res.render(req.params.page);
});*/

app.use(monitor);

//Load the local logfile and happend to it, else create a new one
var logfile = {};
logload()

app.use(formular);

app.get('/', function (req, res) {
  res.render('skeleton.dust', {req : req});
});

var ip = require('ip');
var ipadress = ip.address();
var ser = app.listen(3000, "127.0.0.1",
    function () {
        console.log("Server running from " + ipadress + " on port " + "3000");
});


// Event management with sockets.io
//io.sockets.on('connection', function (socket) {
//    console.log('Un client est connecté !');
//    socket.on('message', function (message) {
//        console.log('Un client me parle ! Il me dit : ' + message);
//    });
//    socket.broadcast.emit('message', 'Un autre client vient de se connecter !');
//});
