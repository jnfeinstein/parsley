var assign = require('object-assign');

var Dispatcher = require('../dispatcher');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

function Store() {
  this.dispatchToken = Dispatcher.register(this.dispatcherCallback.bind(this));
}

Store.prototype = assign({}, EventEmitter.prototype, {
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
    // does nothing by default
  }
});

module.exports = Store;
