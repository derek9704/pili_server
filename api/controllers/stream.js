'use strict';
var pili = require('pili');

module.exports = {
	getStream: getStream,
	createStream: createStream,
	listStreams: listStreams
};

var ACCESS_KEY  = 'uJ_9jcgK5oVywFOJlbXXKh_INgwtAbJLCu_nf9xg';
var SECRET_KEY  = 'fD3EbV_GB6066ZVnoKLfPb65saiWHQWNFkHuGZP7';
var HUB = 'faceworld';
var credentials = new pili.Credentials(ACCESS_KEY, SECRET_KEY);
var hub = new pili.Hub(credentials, HUB);

function getStream(req, res) {
  var id = req.swagger.params.id.value;
	hub.getStream(id, function(err, stream) {
    if (!err) {
      res.json(stream.toJSONString());
    }else{
    	res.statusCode = 400;
  		res.json(err.errorCode);
    }
	});
}

function createStream(req, res) {
	var options = {
	  title          : null,    // optional, auto-generated as default
	  publishKey     : null,    // optional, auto-generated as default
	  publishSecrity : "static" // optional, can be "dynamic" or "static", "dynamic" as default
	};
	hub.createStream(options, function(err, stream) {
	  if (!err) {
    	res.json(stream.toJSONString());
	  } else {
	  	res.statusCode = 400;
    	res.json(err.errorCode);
	  }
	});
}

function listStreams(req, res) {
	var options = {
    marker : null,    // optional
    limit  : null,    // optional
    title  : null     // optional
	};
	hub.listStreams(options, function(err, marker, streams) {
	  if (!err) {
	  	var arr = [];
	  	streams.forEach(function(stream) {
	    	arr.push(stream.toJSONString());
	    });
    	res.json(arr);
	  } else {
	  	res.statusCode = 400;
    	res.json(err.errorCode);
	  }
	});
}