var OrganizationModel = require('./organization');

var UserModel = Backbone.Model.extend({
  initialize: function() {
    this.set('organizations', new Backbone.Collection());
    this.on('sync', this.synced.bind(this));
  },
  urlRoot: '/users',
  link: function(base) {
    return base + this.urlRoot + '/' + this.get('id');
  },
  name: function() {
    return this.get('firstname') + ' ' + this.get('lastname');
  },
  synced: function() {
    var orgs = new Backbone.Collection(this.get('organizations'), OrganizationModel);
    this.set('organizations', orgs);
  }
});

module.exports = UserModel;
