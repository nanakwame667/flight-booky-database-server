const express   = require("express");
const db        = require('./config/database');

const app       = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

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
