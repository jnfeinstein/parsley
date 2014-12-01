var ActionTypes = require('../constants').ActionTypes;
var MultiStore = require('./MultiStore');

var OrganizationStore = MultiStore.extend({
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
