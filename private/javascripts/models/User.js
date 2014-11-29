var _ = require('underscore');
var Model = require('./Model');

var User = Model.extend({
  Name: function() {
    return this.get('firstname');
  }
}, {
	url: "/users"
});

module.exports = User;
