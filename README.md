# nsupload
### A node module for uploading to netsuite

If your filename is unique, nsupload will upload it to netsuite for you. Recommended for use with watch.

## Installation

Here's what you need to do.

Install and deploy the included Restlet. You'll need the script internal id to configure properly

You'll probably want to use the PUT verb for the function, although NetSuite doesn't allow you to be truly 
restful anyway (no semantic URI), so use a POST if you like it better.


```javascript
var upload = require('nsupload');

gulp.src('foo.js').pipe(upload({
  email: 'a@example.com',
  password: 'password',
  account: 1234,
  script: 1234
}));
```
