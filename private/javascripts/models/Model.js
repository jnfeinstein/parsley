// Mostly inspired by Backbone

var _ = require('underscore');

function Model(attributes, options) {
    var attrs = attributes || {};
    this.attributes = {};
    attrs = _.defaults({}, attrs, _.result(this, 'defaults'));
    this.set(attrs);
    this.initialize.apply(this, arguments);
  };

Model.prototype = {
	initialize: function() {
		// does nothing
	},
	set: function(attr, value) {
		if (_.isObject(attr)) {
			_.extend(this.attributes, attr);
		} else {
			this.attributes[attr] = value;
		}
		return this;
	},
	get: function(attr) {
		return this.attributes[attr];
	},
  isNew: function() {
    return _.isEmpty(this.get('id'));
  }
}

Model.extend = function(protoProps, staticProps) {
  var parent = this;
	var child = function(){ return parent.apply(this, arguments); };
	_.extend(child, parent, staticProps);
	var Surrogate = function(){
		parent.constructor = child;
	};
	Surrogate.prototype = parent.prototype;
	child.prototype = new Surrogate;

	if (protoProps) {
		_.extend(child.prototype, protoProps);
	}

	child.__super__ = parent.prototype;

	return child;
};

module.exports = Model;