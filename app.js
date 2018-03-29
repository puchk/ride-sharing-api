const routes = require('./routes/routes');
const express = require('express');
const app = express();

routes(app);

module.exports = app;