const express   = require("express");
const db        = require('./config/database');

const app       = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, auth_token");
  next();
});

//connection test
app.get("/", (req, res)=>{ 
    res.status(200).json({result: 'connection ok'});
});

app.use('/user', require('./routes/user'));

app.use('/admin', require('./routes/admin'));

app.use('/flight', require('./routes/flight'));

app.use('/reservation', require('./routes/reservation'));


module.exports.Database     = db;
module.exports.AppServer    = app;
