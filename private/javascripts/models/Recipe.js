var _ = require('underscore');
var Model = require('./Model');

var Recipe = Model.extend({
}, {
  url: "/recipes"
});

module.exports = Recipe;
