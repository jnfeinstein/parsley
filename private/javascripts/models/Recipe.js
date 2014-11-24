var _ = require('underscore');
var Model = require('./Model');

var Recipe = Model.extend({
  Link: function() {
    return "/" + Recipe.url + "/" + this.get('id');
  }
}, {
  url: "/recipes"
});

module.exports = Recipe;
