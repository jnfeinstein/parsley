var assign = require('object-assign');
var _ = require('underscore');

var Constants = require('../constants');
var Store = require('./Store');

var ActionTypes = Constants.ActionTypes;

function OrganizationStore(organizations) {
  Store.apply(this, arguments);
  this.reset(organizations);
}

OrganizationStore.prototype = assign({}, Store.prototype, {
  get: function(id) {
    return _.find(this.organizations_, function(o) {
      return o.get('id') == id;
    });
  },
  getAll: function() {
    return this.organizations_;
  },
  reset: function(organizations) {
    if (_.isEmpty(organizations)) {
      this.organizations_ = [];
    } else {
      this.organizations_ = organizations;
    }
  },
  add: function(org) {
    this.organizations_.push(org);
  },
  dispatcherCallback: function(payload) {
    var action = payload.action;

    switch(action.type) {
      case ActionTypes.RECEIVED_ORGANIZATIONS:
        this.reset(action.organizations);
        this.emitChange();
        break;
      case ActionTypes.CREATED_ORGANIZATION:
        this.add(action.organization);
        this.emitChange();
        break;
      default:
        // do nothing
    }
  }
});

module.exports = new OrganizationStore();
