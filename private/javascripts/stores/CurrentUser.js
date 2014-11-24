var assign = require('object-assign');

var Constants = require('../constants');
var Store = require('./Store');

var ActionTypes = Constants.ActionTypes;

function CurrentUserStore(user) {
  Store.apply(this, arguments);
  this.set(user);
}

CurrentUserStore.prototype = assign({}, Store.prototype, {
  get: function() {
    return this.currentUser_;
  },
  set: function(user) {
    this.currentUser_ = user;
  },
  dispatcherCallback: function(payload) {
    var action = payload.action;

    switch(action.type) {
      case ActionTypes.RECEIVED_CURRENT_USER:
        this.set(action.user);
        this.emitChange();
        break;
      default:
        // do nothing
    }
  }
});

module.exports = new CurrentUserStore();
