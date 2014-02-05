var path = require('path');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');

module.exports.handleRequest = function (req, res) {

  var fileLocation;
  var pathname = url.parse(req.url).pathname;
  var contentType = '';

  var setResponseBodyFromFile = function(fileLocation){
    var responseBody, statusCode;

    if(fs.existsSync(fileLocation)){
      statusCode = 200;
      responseBody = fs.readFileSync(fileLocation);
    } else {
      statusCode = 404;
      responseBody = 'Could not find HTML file.';
    }

    completeResponse(statusCode, responseBody);
  };

  var checkContentType = function(req){
  	var result;

    if (req.url.indexOf('.js') != -1){
    	result = 'text/javascript';
    } else if (req.url.indexOf('.css') != -1){
    	result = 'text/css';
    } else if (req.url.indexOf('.gif') != -1){
      result = 'image/gif';
    } else if (req.url.indexOf('.png') != -1){
      result = 'image/png';
    } else if (req.url.indexOf('.jpg') != -1){
      result = 'image/jpg';
    } else {
      result = 'text/html';
    }

    return result;
  }

  var completeResponse = function(statusCode, responseBody){

    var headers = {
      // "access-control-allow-origin": "*",
      // "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
      // "access-control-allow-headers": "content-type, accept",
      // // "access-control-max-age": 1,
      "Content-Type": contentType
    };

    res.writeHead(statusCode, headers);
    console.log("*****", contentType);
    if (contentType.slice(0, 5) === 'image'){
      res.end(responseBody, 'binary');
    } else {
      res.end(responseBody);
    }
  };


  contentType = checkContentType(req);
  console.log("contentType", contentType);

  console.log("path name", pathname);
  switch(req.method){
    case 'GET':
      if (pathname === '/') {
        fileLocation = path.join(__dirname, '../../app/views/index.html');
        setResponseBodyFromFile(fileLocation);
      } else {
        fileLocation = path.join(__dirname, '../../../public/app' + pathname);
        setResponseBodyFromFile(fileLocation);
      }
      break;

    default:
      completeResponse(404, 'Not found');
  }
  console.log('test123');
};