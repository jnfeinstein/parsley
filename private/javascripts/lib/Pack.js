window._ = require('underscore');
window.React = require('react/addons');

window.basepath = '/';

var ajax = require('component-ajax');
ajax.postJSON = function(url, data, success) {
  return ajax({
    url: url,
    type: 'POST',
    contentType:'application/json',
    data: JSON.stringify(data),
    dataType:'json',
    success: success
  });
};
