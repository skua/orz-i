var swig = require('swig');

// /r/n --  <p></p>
swig.setFilter('rnp', function(input) {
  var nstr = input.replace(/\n\r/gi, "<br/>");
  return nstr;
});