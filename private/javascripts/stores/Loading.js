var assign = require('object-assign');

var Constants = require('../constants');
var Store = require('./Store');

var ActionTypes = Constants.ActionTypes;

function Loading(loading) {
  Store.apply(this, arguments);
  this.set(loading);
}

Loading.prototype = assign({}, Store.prototype, {
  get: function() {
    return this.loading_;
  },
  set: function(loading) {
    this.loading_ = loading;
  },
  dispatcherCallback: function(payload) {
    var action = payload.action;

    switch(action.type) {
      case ActionTypes.SET_LOADING:
        this.set(action.loading);
        this.emitChange();
        break;
      default:
        // do nothing
    }
  }
});

module.exports = new Loading(false);
