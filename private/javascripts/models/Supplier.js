var _ = require('underscore');
var Model = require('./Model');

var Supplier = Model.extend({
}, {
  url: "/suppliers"
});

module.exports = Supplier;
