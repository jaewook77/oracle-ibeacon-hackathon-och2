// server.js (Express 4.0)
var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var path 		   = require('path');
var main 		   = require('./main');
var app            = express();

app.use(express.static(path.join(__dirname, './uploads')));
//app.use(express.static(__dirname + '/public')); 	// set the static files location /public/img will be /img for users
app.use(morgan('dev')); 					// log every request to the console
app.use(bodyParser({
    uploadDir: __dirname + '/uploads',
    keepExtensions: true
})); 						// pull information from html in POST
app.use(methodOverride()); 					// simulate DELETE and PUT

app.post('/images', main.addImage); // endpoint to post new images
app.get('/images', main.getImages); // endpoint to get list of images

app.listen(3000, function () {
    console.log('PictureFeed server listening on port 3000');
});