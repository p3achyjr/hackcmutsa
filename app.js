var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname + '/views'));

//Store all HTML files in view folder.

app.get('/', function (req, res) {
  res.send("get on my level ho");
});

app.get('/more', function(req, res) {
  res.send("please work please work")
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});