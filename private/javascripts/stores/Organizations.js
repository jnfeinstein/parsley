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
  dispatcherCallback: function(payload) {
    var action = payload.action;

    switch(action.type) {
      case ActionTypes.RECEIVE_ORGANIZATIONS:
        this.reset(action.organizations);
        this.emitChange();
        break;
      default:
        // do nothing
    }
  }
});

module.exports = new OrganizationStore();
