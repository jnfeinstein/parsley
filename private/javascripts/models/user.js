var Backbone = require("backbone");
require('backbone-associations');
var Fluxbone = require('../lib').Fluxbone;
var OrganizationModel = require('./organization');

var UserModel = Backbone.AssociatedModel.extend({
  relations: [
      {
        type: Backbone.Many,
        key: 'organizations',
        relatedModel: OrganizationModel
      }
  ],
  defaults: {
    organizations: []
  },
  urlRoot: '/users',
  link: function(base) {
    return base + this.urlRoot + '/' + this.get('id');
  },
  name: function() {
    return this.get('firstname') + ' ' + this.get('lastname');
  }
});

Fluxbone.ModelInit(UserModel);

module.exports = UserModel;
