var _ = require('underscore');
var Model = require('./Model');

var User = Model.extend({
	Link: function() {
		return "/" + User.url + "/" + this.get('id');
	},
  Name: function() {
    return this.get('firstname');
  }
}, {
	url: "/users"
});

module.exports = User;
