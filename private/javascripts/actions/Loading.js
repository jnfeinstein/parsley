var Dispatcher = require('../dispatcher');
var ActionTypes = require('../constants').ActionTypes;

module.exports = {
  setLoading: function(loading) {
    Dispatcher.handleViewAction({
      type: ActionTypes.SET_LOADING,
      loading: loading
    });
  }
};
