import express from "express";
import compression from "compression";
import index from "./routes/index";
import path from "path";


// Server var
const app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.json())
var cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

// View engine setup
app.set("views", path.join(__dirname, 'static', "views"));
app.set("view engine", "ejs");

// Middleware
app.use(compression());
app.use('/public', express.static(path.join(__dirname, 'static', 'public')));
app.use(express.static(__dirname + "/public"));

//Routes
app.use("/", index);

const port = process.env.PORT || 3070;
app.listen(port, function listenHandler() { console.info(`Running on ${port}`) });