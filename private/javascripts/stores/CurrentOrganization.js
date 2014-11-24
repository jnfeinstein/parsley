var assign = require('object-assign');

var Constants = require('../constants');
var Store = require('./Store');

var ActionTypes = Constants.ActionTypes;

function CurrentOrganizationStore(organization) {
  Store.apply(this, arguments);
  this.set(organization);
}

CurrentOrganizationStore.prototype = assign({}, Store.prototype, {
  get: function(id) {
    return this.currentOrganization_;
  },
  set: function(organization) {
    this.currentOrganization_ = organization;
  },
  dispatcherCallback: function(payload) {
    var action = payload.action;

    switch(action.type) {
      case ActionTypes.RECEIVE_CURRENT_ORGANIZATION:
        this.set(action.organization);
        this.emitChange();
        break;
      default:
        // do nothing
    }
  }
});

module.exports = new CurrentOrganizationStore();
