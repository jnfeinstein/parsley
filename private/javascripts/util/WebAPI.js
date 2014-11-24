var Dispatcher = require('../dispatcher');
var Constants = require('../constants');
var ActionTypes = Constants.ActionTypes;
var Helpers = require('../lib').Helpers;

var Models = require('../models');
var User = Models.User;
var Organization = Models.Organization;

var Stores = require('../stores');
var OrganizationStore = Stores.Organizations;

var navigate = require('react-mini-router').navigate;

module.exports = {
	GetCurrentUser: function() {
		$.getJSON(User.url + '/me')
		.done(function(user) {
			Dispatcher.handleServerAction({
				type: ActionTypes.RECEIVED_CURRENT_USER,
				user: Helpers.Make(Models.User, user)
			});

			var organizations = Helpers.Make(Models.Organization, user.organizations);
			Dispatcher.handleServerAction({
				type: ActionTypes.RECEIVED_ORGANIZATIONS,
				organizations: organizations
			});
		})
	},
  CreateOrganization: function(data) {
    $.postJSON(Organization.url, data)
    .done(function(reply) {
      var newOrganization = new Organization(reply);
      Dispatcher.handleServerAction({
        type: ActionTypes.CREATED_ORGANIZATION,
        organization: newOrganization
      });
      Dispatcher.handleServerAction({
        type: ActionTypes.CHANGED_CURRENT_ORGANIZATION,
        organization: newOrganization
      });
      navigate(basepath);
    });
  },
  GetOrganizationDetails: function(org) {
    $.getJSON(org.Link())
    .done(function(data) {
      
    });
  }
}
