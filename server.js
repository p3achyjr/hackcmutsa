var http = require('http');
var url = require('url');
var fs = require('fs');
var speedTest = require('speedtest-net');

// var server = http.createServer(function (req, res) {
//    // parse URL
//    var url_parts = url.parse(req.url);
//    console.log(url_parts);
//    if(url_parts.pathname == '/') {
//       // file serving
//     fs.readFile('./views/index.html', function(err, data) {
//        res.end(data);
//     });
//    } else if(url_parts.pathname.substr(0, 5) == '/wifi') {
//     // polling code here
//     console.log("PLEASEEEEE");
//     testData = {};
//     test=speedTest({maxTime:5000});

//     test.on('data',function(data){
//       testData = data;
//     });

//     test.on('error',function(err){
//       console.error(err);
//     });
//   } 
// })
// server.listen(8080, 'localhost');
// console.log('Server running.');

var server = http.createServer(function (req, res) {
  var url_parts = url.parse(req.url);
  console.log(url_parts);
  if(url_parts.pathname == '/') {
    fs.readFile('./views/index.html', function(err, data) {
      res.end(data);
    });
  } else if(url_parts.pathname.substr(0, 5) == '/wifi') {
    // polling code here
    console.log('in block');
    test=speedTest({maxTime:5000});
    
    test.on('data',function(data){
      console.log(data);
      res.end(JSON.stringify(data));
    });

    test.on('error',function(err){
      console.error(err);
    }); 
  } else if(url_parts.pathname == '/js/script-index.js') {
    console.log("loading js")
    fs.readFile('./views/js/script-index.js', function(err, data) {
      console.log(data);
      res.end(data);
    });
  }


  // res.end("Hello world");
})
server.listen(process.env.PORT || 8080, function() {
  console.log("Server listening on port 8080");
});
