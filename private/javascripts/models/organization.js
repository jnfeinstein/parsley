var Backbone = require("backbone");
require('backbone-associations');
var Fluxbone = require('../lib').Fluxbone;

var OrganizationModel = Backbone.Model.extend({
	urlRoot: '/organizations',
	link: function(base) {
		return base + this.urlRoot + '/' + this.get('id');
	},
	name: function() {
		return this.get('name');
	}
});

Fluxbone.ModelInit(OrganizationModel);

module.exports = OrganizationModel;
