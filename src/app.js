const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
let createError = require('http-errors');
const favicon = require('serve-favicon');
require('dotenv').config({ path: path.join(__dirname, './.env') });

const app = express();

// port
const port = process.env.PORT || 9000;

//import routes
const routes = require('./routes/index');
//const routeApi = require('./routes/googleAPI');

// settings
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));
//const pv_KEY = process.env.PRIVATE_KEY.replace(/\\n/g, "\n")


// routes
app.use('/', routes);
//app.use('/api', routeApi);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use( (err, req, res, next) => {
    process.env.NODE_ENV === 'development' ? next(createError(err)) : next();
});

// listen server on port
app.listen(port, () => {
    console.log(`CORS-enabled, web server listening on port: ${port}`)
});

// process terminated
process.on('SIGTERM', () => {
    app.close(() => {
        console.log('Process terminated')
    })
});
