jest.dontMock('../Store');

describe('Store', function() {

  var Store;
  var Dispatcher;
  var store;

  beforeEach(function() {
    Store = require('../Store');
    Dispatcher = require('../../dispatcher');
    store = new Store();
  });

  it('should register a callback', function() {
    expect(Dispatcher.register.mock.calls.length).toEqual(1);
  });
});
