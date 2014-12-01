var assign = require('object-assign');
var _ = require('underscore');

var Dispatcher = require('../dispatcher');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

function Store() {
  this.dispatchToken = Dispatcher.register(this.dispatcherCallback.bind(this));
  this.initialize.apply(this, arguments);
}

Store.prototype = assign({}, EventEmitter.prototype, {
  initialize: function() {
    // does nothing
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  dispatcherCallback: function(payload) {
    // does nothing by default
  },
  mixin: function() {
    var store = this;
    // All events run in the context of the component
    return {
      componentDidMount: function() {
        store.addChangeListener(this.updateStateFromStores);
      },
      componentWillUnmount: function() {
        store.removeChangeListener(this.updateStateFromStores);
      }
    }
  }
});

Store.extend = function(protoProps, staticProps) {
  var parent = this;
  var child = function(){ return parent.apply(this, arguments); };
  _.extend(child, parent, staticProps);
  var Surrogate = function(){
    this.constructor = child;
  };
  Surrogate.prototype = parent.prototype;
  child.prototype = new Surrogate;

  if (protoProps) {
    _.extend(child.prototype, protoProps);
  }

  child.__super__ = parent.prototype;

  return child;
};

module.exports = Store;
