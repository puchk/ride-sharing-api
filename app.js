const routes = require('./routes/routes');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/rideshare');

app.use(bodyParser.json());
routes(app);

module.exports = app;