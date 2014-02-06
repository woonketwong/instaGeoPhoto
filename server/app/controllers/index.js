var path = require('path');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
var request = require('request');
var config = require('../config.js')

module.exports.handleRequest = function (req, res) {

  var fileLocation;
  var pathname = url.parse(req.url).pathname;
  var contentType = '';
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var statusAndBody;


  var setResponseBodyFromFile = function(fileLocation){
    var responseBody, statusCode;

    if(fs.existsSync(fileLocation)){
      statusCode = 200;
      responseBody = fs.readFileSync(fileLocation);
    } else {
      statusCode = 404;
      responseBody = 'Could not find HTML file.';
    }

    return [statusCode, responseBody];
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

  var completeResponse = function(statusCode, responseBody, type){

    var headers = {
      "Content-Type": type
    };

    res.writeHead(statusCode, headers);
    if (contentType.slice(0, 5) === 'image'){
      res.end(responseBody, 'binary');
    } else {
      res.end(responseBody);
    }
  };


  contentType = checkContentType(req);

  console.log("path name", pathname);

  // Routes
  switch(req.method){
    case 'GET':
      if (pathname === '/') { // index file
        fileLocation = path.join(__dirname, '../../app/views/index.html');
        statusAndBody = setResponseBodyFromFile(fileLocation);
        completeResponse(statusAndBody[0], statusAndBody[1], contentType);
      } else if (pathname === '/instasearch'){ //instagram geo photo search api
        var api = config.instagram.url + config.instagram.search + '?lat=' + query["lat"] + '&lng=' + query["lng"]+'&client_id=' + config.instagram.client_id;
        request(api, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            contentType = 'application/json';
            completeResponse(200, body, contentType);
          } else{
            completeResponse(500, 'Internal server error', contentType);
          }
        })
      } else { // public resources
        console.log("contentType", contentType);
        fileLocation = path.join(__dirname, '../../../public/app' + pathname);
        statusAndBody = setResponseBodyFromFile(fileLocation);
        completeResponse(statusAndBody[0], statusAndBody[1], contentType);
      }
      break;

    default:
      completeResponse(404, 'Not found', contentType);
  }
};