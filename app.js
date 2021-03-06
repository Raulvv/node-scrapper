const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const app          = express();
const mongoose     = require('mongoose');
const schema       = require('./api/schemas/schema');
const graphql      = require('graphql');
const GraphQLHTTP  = require('express-graphql');

require("dotenv").config();


mongoose.connect(process.env.MONGODB_URI);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/graphql', GraphQLHTTP({
    schema,
    // mutation,
    graphiql: true
  })
);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({error: err.message});
});

module.exports = app;
