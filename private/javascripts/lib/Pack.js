require('zepto-full');
window._ = require('underscore');
window.React = require('react/addons');

window.basepath = '/';

$.postJSON = function(url, data) {
  return $.ajax({
    url: url,
    type: 'POST',
    contentType:'application/json',
    data: JSON.stringify(data),
    dataType:'json'
  });
};
