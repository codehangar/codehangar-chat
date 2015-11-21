var express = require('express');
var app = express();
var port = parseInt(process.env.PORT || 3500)

app.use(express.static(__dirname + '/public'));

var server = app.listen(port, function () {

});