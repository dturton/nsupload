# gulp-nsupload
### A gulp plugin for uploading to NetSuite

If your filename is unique, gulp-nsupload will upload it to netsuite for you. Recommended for use with gulp-watch.

## Installation

Here's what you need to do.

Install and deploy the included Restlet. You'll need the script internal id for the config file.

You'll probably want to use the PUT verb for the function, although NetSuite doesn't allow you to be truly 
restful (no semantic URI), so use a POST if you like it better.

The upload function will return a stream handler, and must be called with the following properties:

- email - The email address of an authorized user
- password - The password for the same user
- account - The netsuite account number (get from Setup > Integration > Webservices)
- script - The script ID of the deployed restlet.

See below for an example gulpfile

```javascript
var upload = require('gulp-nsupload');

gulp.src('foo.js').pipe(upload({
  email: 'a@example.com',
  password: 'password',
  account: 1234,
  script: 1234
}));
```
