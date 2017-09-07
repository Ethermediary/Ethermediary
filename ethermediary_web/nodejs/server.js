const express = require('express');
app = express();
fs = require('fs');
qs = require('querystring');
favicon = require('serve-favicon');
path = require('path');
hoffman = require('hoffman');
request = require('request');
cookieParser = require('cookie-parser');
bodyParser = require('body-parser');
expressValidator = require('express-validator');
const { check, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
server = require('http').createServer(app);
io = require('socket.io')(server);
dustjshelpers = require("dustjs-helpers");
validator = require('validator');

formular = require('./formular.js');

// Set path ...
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
doCache = process.env.DEBUG == false;
app.use(favicon(path.join(__dirname, "public", "imgs", "favicon.ico")));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.engine('dust', hoffman.__express());
//set the view engine to dust
app.set('view engine', 'dust');
//indicate to express where the views directory is
app.set('views', path.join(__dirname, 'views'));
app.set('view cache', doCache);
app.enable('trust proxy');

////////////////////////////////////////////////////////////////////////////////

// Every page parser
app.get('/:page', function(req, res) {
  res.render(path.join(__dirname, 'views', path.basename(req.params.page) + '.dust'));
});

// Root page parser
app.get('/', function (req, res) {
  res.render('index.dust', {req : req});
});

// All the code handling formular datas
formular();

// A boolean filter fo dustjs
hoffman.isTrue = function(chunk, context, bodies, params) {
  return context.resolve(params.key) != 0;
}



////////////////////////////////////////////////////////////////////////////////

server.listen(3000, function () {
  console.log('Listening on port 3000!');
});

// Event management with sockets.io
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
    socket.on('message', function (message) {
        console.log('Un client me parle ! Il me dit : ' + message);
    });
    socket.broadcast.emit('message', 'Un autre client vient de se connecter !');
});
