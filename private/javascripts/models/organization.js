var OrganizationModel = Backbone.Model.extend({
	urlRoot: '/organizations',
	link: function(base) {
		return base + this.urlRoot + '/' + this.get('id');
	},
	name: function() {
		return this.get('name');
	}
});

module.exports = OrganizationModel;
