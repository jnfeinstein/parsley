var ajax = require('component-ajax');
var Dispatcher = require('../dispatcher');
var Constants = require('../constants');
var ActionTypes = Constants.ActionTypes;
var Helpers = require('../lib').Helpers;

var Models = require('../models');
var User = Models.User;
var Organization = Models.Organization;

var Stores = require('../stores');
var OrganizationStore = Stores.Organizations;

var LoadingAction = require('../actions').Loading;

module.exports = {
	GetCurrentUser: function() {
    LoadingAction.setLoading(true);
		ajax.getJSON(User.url + '/me', function(user) {
      LoadingAction.setLoading(false);

      Dispatcher.handleServerAction({
        type: ActionTypes.RECEIVED_CURRENT_USER,
        user: Helpers.Make(Models.User, user)
      });

      var organizations = Helpers.Make(Models.Organization, user.organizations);
      Dispatcher.handleServerAction({
        type: ActionTypes.RECEIVED_ORGANIZATIONS,
        organizations: organizations
      });
    });
	},
  CreateOrganization: function(data) {
    LoadingAction.setLoading(true);
    ajax.postJSON(Organization.url, data, function(reply) {
      LoadingAction.setLoading(false);

      var newOrganization = new Organization(reply);
      Dispatcher.handleServerAction({
        type: ActionTypes.CREATED_ORGANIZATION,
        organization: newOrganization
      });
      Helpers.Navigate(basepath + newOrganization.Link());
    });
  },
  GetOrganizationDetails: function(org) {
    LoadingAction.setLoading(true);
    ajax.getJSON(org.Link())
    .done(function(data) {
      LoadingAction.setLoading(false);

    });
  }
}
