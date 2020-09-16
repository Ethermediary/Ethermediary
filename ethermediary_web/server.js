// dapp entry point

require("dotenv").config();

// external dependencies
const express = require("express");
const app = express();
const favicon = require("serve-favicon");
const path = require("path");
const hoffman = require("hoffman");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const ip = require("ip");

// internal dependencies
const monitor = require("./monitor.js");
const formular = require("./formular.js");
//const mailer = require("./mailer.js")

// setup express app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(favicon(path.join(__dirname, "public", "imgs", "favicon.png")));
app.use(express.static(path.join(__dirname, "public")));
app.use(formular);
app.enable("trust proxy");

// setup view rendering engine
app.set("view engine", "dust");
app.engine("dust", hoffman.__express());

//indicate to express where the views directory is
app.set("views", path.join(__dirname, "views"));
app.set("view cache", process.env.DEBUG == false);

// setup log capabilities
monitor.loadLog();
monitor.startScheduledSaving();

// serve root directory
app.get("/", function (req, res) {
  monitor.incrementStat("skeleton");
  res.render("skeleton.dust", { req: req });
});

var ser = app.listen(3000, "127.0.0.1", () => {
  console.log("==========================================================");
  console.log("Server running from " + ip.address() + " on port 3000");
  console.log("==========================================================");
});
