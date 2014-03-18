var http = require('http');
var fs = require('fs');

http.createServer(function(request, response) {
  fs.readFile('html/losSignup.html', function(err, content) {
    response.writeHead(200, {
  'Content-Length': content.length,
  'Content-Type': 'text/html' });
    response.write(content);

    response.end();
  });
}).listen(8080);

console.log("Listening to port 8080");
