var http = require("http");
var handler = require("./server/app/controllers/index");

var port = process.env.PORT || 5000;
var ip = process.env.IP || "127.0.0.1";
var server = http.createServer(handler.handleRequest);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);