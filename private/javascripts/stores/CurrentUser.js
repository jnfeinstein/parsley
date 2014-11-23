var Dispatcher = require('../dispatcher');
var Constants = require('../constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

function CurrentUserStore(user) {
  this.currentUser_ = user;
  this.dispatchToken = Dispatcher.register(this.dispatcherCallback.bind(this));
}

CurrentUserStore.prototype = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  get: function(id) {
    return this.currentUser_;
  },
  dispatcherCallback: function(payload) {
    var action = payload.action;

    switch(action.type) {
      case ActionTypes.RECEIVE_CURRENT_USER:
        this.currentUser_ = action.user;
        this.emitChange();
        break;
      default:
        // do nothing
    }
  }
});

module.exports = new CurrentUserStore();
