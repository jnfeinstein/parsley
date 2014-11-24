var Dispatcher = require('../dispatcher');
var Constants = require('../constants');
var ActionTypes = Constants.ActionTypes;
var Models = require('../models');
var Helpers = require('../lib').Helpers;

module.exports = {
	getCurrentUser: function() {
		$.getJSON('/users/me')
		.done(function(user) {
			Dispatcher.handleServerAction({
				type: ActionTypes.RECEIVE_CURRENT_USER,
				user: Helpers.Make(Models.User, user)
			});

			var organizations = Helpers.Make(Models.Organization, user.organizations);
			Dispatcher.handleServerAction({
				type: ActionTypes.RECEIVE_ORGANIZATIONS,
				organizations: organizations
			});
		})
	}
}
