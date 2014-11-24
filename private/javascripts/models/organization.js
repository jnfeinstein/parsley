var _ = require('underscore');
var Model = require('./Model');

var Organization = Model.extend({
	link: function() {
		return Organization.url + "/" + this.get('id');
	},
  name: function() {
    return this.get('name');
  }
}, {
	url: "/organizations"
});

module.exports = Organization;
