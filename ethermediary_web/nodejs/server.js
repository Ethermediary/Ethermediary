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

app.use(function(req, res, next){
  console.log(req.method + ":" + req.url);
  next();
})

////////////////////////////////////////////////////////////////////////////////

// Every page parser
app.get('/:page', function(req, res) {
  res.render(req.params.page);
});
app.post('/:page', function(req, res) {
  res.render(path.join(__dirname, 'views', path.basename(req.params.page) + '.dust'));
});

// Root page parser
app.get('/', function (req, res) {
  res.render('index.dust', {req : req});
});

app.use(formular);

var ser = app.listen(3000, function () {
  console.log('Listening on port 3000!');
});

// Event management with sockets.io
//io.sockets.on('connection', function (socket) {
//    console.log('Un client est connecté !');
//    socket.on('message', function (message) {
//        console.log('Un client me parle ! Il me dit : ' + message);
//    });
//    socket.broadcast.emit('message', 'Un autre client vient de se connecter !');
//});
