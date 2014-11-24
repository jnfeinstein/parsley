window.jQuery = window.$ = require('jquery');
window._ = require('underscore');
window.React = require('react/addons');
window.navigate = require('react-mini-router').navigate;
window.RouterMixin = require('react-mini-router').RouterMixin;
require('bootstrap-sass/assets/javascripts/bootstrap');

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
