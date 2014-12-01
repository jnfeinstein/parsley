var assign = require('object-assign');
var _ = require('underscore');

var Constants = require('../constants');
var Store = require('./Store');

var ActionTypes = Constants.ActionTypes;

var MultiStore = Store.extend({
  initialize: function(things) {
    this.reset(things);
  },
  get: function(id) {
    return this.things_[id];
  },
  getAll: function() {
    return _.values(this.things_);
  },
  reset: function(things) {
    this.things_ = {};
    if (_.any(things)) {
      for (var i = 0; i < things.length; i++) {
        this.add(things[i]);
      }
    }
    return this;
  },
  add: function(thing) {
    this.things_[thing.Id()] = thing;
    return this;
  },
  remove: function(thing) {
    if (_.isObject(thing)) {
      // thing is a model
      delete this.things_[thing.Id()];
    } else {
      // thing is an id
      delete things.things_[thing];
    }
  },
  length: function() {
    return this.getAll().length;
  },
  dispatcherCallback: function(payload) {
    // does nothing
  }
})

module.exports = MultiStore;
