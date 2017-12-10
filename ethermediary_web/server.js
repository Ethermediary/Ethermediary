const express = require('express')
const app = express()
const favicon = require('serve-favicon')
const path = require('path')
const hoffman = require('hoffman')
//const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const ip = require('ip')
const monitor = require('./monitor.js')
const formular = require('./formular.js')
const mailer = require("./mailer.js")

const mailTemplates = require("./mailTemplates.js");

// app.use(function(req, res, next){
//   console.log(req.method + ":" + req.url)
//   next()
// })

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

// For testing purposes
var to = "victor.deleau@gmx.com"
//var to = " "
var subject = "Emails from Ethermediary are working well ✔"
var text = "J'ai créé une adresse email lié au nom de domaine ethermediary.com sur OVH.\n\nNotre vps se connecte au serveur smtp d'OVH pour relayer nos emails. Ca marche à tout les coups sur toute les adresses de réception. On a le droit à 1Go de bande passante par mois => Pour des emails de 5ko et je prends large, ça fait 200 000 mails/mois. Reste à configurer une clé KDIM dans notre entête d'email pour augmenter nos chances de ne pas être dans la catégorie SPAM. Gmail est un peu lent à recevoir nos emails, mais gmx est quasi instantané. Quand on envoi un mail à info@ethermediary.com, une copie est envoyé à l'adresse ethermediary@gmx.com."

mailer.loadTemplate().then(function(){
    mailer.sendMail(to,subject,text)
    //mailer.sendTemplate("acceptedDeal",{},to,subject)
})

app.use(formular);

app.get('/', function (req, res) {
  res.render('skeleton.dust', {req : req});
})

monitor.loadLog();
monitor.startScheduledSaving();

var ser = app.listen(3000, "127.0.0.1",
    () => {
      console.log("==========================================================")
      console.log("Server running from " + ip.address() + " on port 3000")
      console.log("==========================================================")
    })
