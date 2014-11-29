describe('LoadingStore', function() {

  var Model;
  var BlankModel;
  var blankModel;

  beforeEach(function() {
    Model = require('../Model');
    BlankModel = Model.extend({},{
      url: '/blank'
    });
  });

  it('should be new', function() {
    blankModel = new BlankModel();
    expect(blankModel.isNew()).toBe(true);
  });

  it('has an id', function() {
    blankModel = new BlankModel({id: 1});
    expect(blankModel.Id()).toBe(1);
  });

  it('has a link', function() {
    blankModel = new BlankModel({id: 1});
    expect(blankModel.Link()).toBe('/blank/1');
  });

  it('can set a field', function() {
    blankModel = new BlankModel();
    blankModel.set('name', 'jnfeinstein');
    expect(blankModel.attributes.name).toBe('jnfeinstein');
  });

  it('can get a field', function() {
    blankModel = new BlankModel();
    blankModel.attributes.name = 'jnfeinstein';
    expect(blankModel.get('name')).toBe('jnfeinstein');
  });
});
