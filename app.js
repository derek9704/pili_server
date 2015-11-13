'use strict';

var SwaggerConnect = require('swagger-connect');
var app = require('connect')();

var config = {
  appRoot: __dirname
};

SwaggerConnect.create(config, function(err, swaggerConnect) {
  if (err) { throw err; }

  // install middleware
  swaggerConnect.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);
});
