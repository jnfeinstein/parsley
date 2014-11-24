var _ = require('underscore');
var Model = require('./Model');

var Organization = Model.extend({
	Link: function() {
		return Organization.url + "/" + this.get('id');
	},
  Name: function() {
    return this.get('name');
  }
}, {
	url: "/organizations"
});

module.exports = Organization;
