var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }
    var dotoffset = req.url.lastIndexOf('.');
    var mimetype = dotoffset == -1 ? 'text/plain'
                                   : {
                                       '.html' : 'text/html',
                                       '.ico' : 'image/x-icon',
                                       '.jpg' : 'image/jpeg',
                                       '.png' : 'image/png',
                                       '.gif' : 'image/gif',
                                       '.css' : 'text/css',
                                       '.js' : 'text/javascript'
                                       }[ req.url.substr(dotoffset) ];
    res.writeHead(200, {'Content-Type': mimetype});
    res.write(data);
    console.log(res);
    return res.end();
  });
}).listen(8080);