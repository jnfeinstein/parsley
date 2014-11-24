var _ = require('underscore');
var Model = require('./Model');

var User = Model.extend({
	link: function() {
		return "/" + User.url + "/" + this.get('id');
	}
}, {
	url: "/users"
});

module.exports = User;
