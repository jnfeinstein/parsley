jest.dontMock('../Loading');

var Constants = require('../../constants');
var PayloadSources = Constants.PayloadSources;
var ActionTypes = Constants.ActionTypes;

describe('LoadingStore', function() {

  var Dispatcher;
  var LoadingStore;
  var callback;

  beforeEach(function() {
    Dispatcher = require('../../dispatcher');
    LoadingStore = require('../Loading');
    callback = Dispatcher.register.mock.calls[0][0];
  });

  it('initializes to not loading', function() {
    expect(LoadingStore.get()).toBe(false);
  });

  it('responds to loading action', function() {
    callback({
      source: PayloadSources.VIEW_ACTION,
      action: {
        type: ActionTypes.SET_LOADING,
        loading: true
      }
    });
    expect(LoadingStore.get()).toBe(true);
  });
});
