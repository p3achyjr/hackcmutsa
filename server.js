var http = require('http');
var url = require('url');
var fs = require('fs');
var speedTest = require('speedtest-net');
// var mongo = require('mongodb').MongoClient
//   , format = require('util').format;

function mongoPush(data) {
  console.log(data);
  console.log("connected to mongodb");
}

function getSpeedTest(res) {
  console.log('in block');
  test = speedTest({maxTime:5000});
  
  test.on('data',function(data){
    console.log(data);
    data = JSON.stringify(data);
    fs.appendFile('./master-wifi-data.txt', ",".concat(data.concat("\n")), function (err) {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log("file updated");
    });
    console.log('file should be updated');
    res.end(data);
  });

  test.on('error',function(err){
    console.error(err);
  }); 
}

function setFileRequests(res, url) {
  if(url == '/js/script-index.js') {
    console.log("loading js")
    fs.readFile('./views/js/script-index.js', function(err, data) {
      res.end(data);
    });
  }
  else if(url == '/css/style.css') {
    fs.readFile('./views/css/style.css', function(err, data) {
      res.end(data);
    });
  }
}

var server = http.createServer(function (req, res) {
  var url_parts = url.parse(req.url);
  console.log(url_parts);
  //access homepage
  if(url_parts.pathname == '/') {
    fs.readFile('./views/index.html', function(err, data) {
      res.end(data);
    });
  }
  // continuous get requests
  else if(url_parts.pathname == '/wifi/get') {
    // wifi code
    getSpeedTest(res);
  } 
  // initial get request
  else if(url_parts.pathname == '/wifi/init-get') {
    fs.readFile('./master-wifi-data.txt', 'utf8', function (err, data) {
      res.end(data.concat(']'));
    });
  }
  // get javascript
  else {
    setFileRequests(res, url_parts.pathname);
  }


  // res.end("Hello world");
})
server.listen(process.env.PORT || 8080, function() {
  console.log("Server listening on port 8080");
});
