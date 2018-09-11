'use strict'

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const api = require('./api');
const fixtures = require('./api/fixtures');
const app = express();
const router = express.Router();

// Application configuration options
const config = require('./config');

const port = config.API_PORT || 3001;
process.env.NODE_ENV = config.NODE_ENV || 'development';

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Database and auth setup
const databaseURI = `mongodb://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_DB_URL}/${config.MONGO_DB_NAME}`;
mongoose.Promise = global.Promise;
mongoose.connect(databaseURI, {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useMongoClient: true
}).then(() =>  {
    console.log('MongoDB Successfully connected');

    // Initialize fixture data
    fixtures.initialize();
}).catch((err) => console.error(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use('/', api);

// Error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json(res);
});

// Starts the server and listens for requests
app.listen(port, () => {
    console.log(`API running on port ${port}`);
});
