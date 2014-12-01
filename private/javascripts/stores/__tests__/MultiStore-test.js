jest.dontMock('../Store');
jest.dontMock('../MultiStore');

describe('MultiStore', function() {

  var MultiStore;
  var Dispatcher;
  var Model;

  beforeEach(function() {
    Model = require('../../models/Model');
    MultiStore = require('../MultiStore');
    Dispatcher = require('../../dispatcher');
  });

  it('should register a callback', function() {
    var multistore = new MultiStore();
    expect(Dispatcher.register.mock.calls.length).toEqual(1);
  });

  it('should accept a bunch of things when constructed', function() {
    var model = new Model({id: 1});
    var multistore = new MultiStore([model]);
    var models = multistore.getAll();

    expect(multistore.get(1)).toBe(model);
    expect(multistore.getAll().length).toBe(1);
    expect(models[0]).toBe(model);
  });

  it('should add a thing', function() {
    var model = new Model({id: 1});
    var multistore = new MultiStore();

    multistore.add(model);
    expect(multistore.length()).toBe(1);
    expect(multistore.get(1)).toBe(model);
  });

  it('should remove a thing', function() {
    var model = new Model({id: 1});
    var multistore = new MultiStore([model]);

    multistore.remove(model);
    expect(multistore.length()).toBe(0);
    expect(multistore.get(1)).toBe(undefined);
  });
});
