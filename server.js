var http = require("http");
var handler = require("./server/app/controllers/index");

var port = process.env.PORT || 5000;
var server = http.createServer(handler.handleRequest);
server.listen(port);