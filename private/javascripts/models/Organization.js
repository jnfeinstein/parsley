var _ = require('underscore');
var Model = require('./Model');

var Organization = Model.extend({
  Name: function() {
    return this.get('name');
  }
}, {
	url: "/organizations"
});

module.exports = Organization;
