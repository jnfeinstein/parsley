var _ = require('underscore');
var Model = require('./Model');

var User = Model.extend({
	Link: function() {
		return "/" + User.url + "/" + this.get('id');
	}
}, {
	url: "/users"
});

module.exports = User;
