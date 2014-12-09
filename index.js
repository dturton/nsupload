var request = require('request')
  , _ = require('underscore')
  , path = require('path')
  , through = require('through');

var URL_TEMPLATE = 'https://<%= domain %>/app/site/hosting/restlet.nl';
var url;

var AUTH_STRING = 'NLAuth  nlauth_account=<%= account %>, nlauth_email=<%= email %>, nlauth_signature=<%= password %>';

//Catch files
function sendFile (file) {
  var authHeader = _.template(AUTH_STRING)(config);

  //Upload them to netsuite by name
  var fileName = path.basename(file.path);

  if(file._contents) {

    //Pipe the response
    request({
      uri: url,
      qs: {
        deploy: 1,
        script: config.script
      },
      method: 'PUT',
      headers: {
        Authorization: authHeader
      },
      json: {
        name: fileName,
        path: file.path,
        content: file._contents.toString()
      }
    }, function(err, res, data) {
      if(err || !res) {
        console.log('Error uploading file ' + file.path);
        console.log(err);
      } else if(res.body && res.body.statusCode && res.body.statusCode !== 200){
        console.log('Error');
        console.log(res.statusCode);
      } else {
        console.log('Successfully uploaded file ' + file.path);
      }
    });
  }
}

module.exports = function(options) {
  options.domain = options.domain || 'rest.sandbox.netsuite.com';

  url = _.template(URL_TEMPLATE)(options);
  if(!(options && options.email && options.password && options.account && options.script)) {
    throw new Error('Options are required. Please provide {email:\'\', password:\'\', account: 123, script:123}');
  }

  config = options;
  return through(sendFile);
};

module.exports.send = sendFile;
