var Dispatcher = require('../dispatcher');
var ActionTypes = require('../constants').ActionTypes;

module.exports = {
  setCurrent: function(org) {
    Dispatcher.handleViewAction({
      type: ActionTypes.CHANGED_CURRENT_ORGANIZATION,
      organization: org
    });
  }
};
