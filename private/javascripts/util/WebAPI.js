var Dispatcher = require('../dispatcher');
var Constants = require('../constants');
var ActionTypes = Constants.ActionTypes;

module.exports = {
	getCurrentUser: function() {
		$.getJSON('/users/me')
		.done(function(user) {
			Dispatcher.handleServerAction({
				type: ActionTypes.RECEIVE_CURRENT_USER,
				user: user
			});
		})
	}
}
