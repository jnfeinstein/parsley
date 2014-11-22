var _ = require("underscore");
var Backbone = require("backbone");
var Dispatcher = require("flux").Dispatcher;

function FluxboneEventMixin(targetProp, events) {
	if (events === undefined) {
		events = 'all';
	}

	var eventCallbackName = "_eventCallbacks_" + targetProp + "_" + events;

	var mixin =  {
		componentDidMount: function() {
			this.props[targetProp].on(events, this[eventCallbackName]);
		},
		componentWillUnmount: function() {
			this.props[targetProp].off(events, this[eventCallbackName]);
		}
	};

	mixin[eventCallbackName] = function() {
		setTimeout((function() {
			this.forceUpdate();
		}).bind(this), 0);
	};

	return mixin;
}

function FluxboneLoadingMixin(targetProp) {
	var requestCallbackName = "_requestCallback_" + targetProp;
	var syncedCallbackName = "_syncedCallback_" + targetProp;

	var mixin = {
		componentDidMount: function() {
			this.props[targetProp].on('request', this[requestCallbackName]);
			this.props[targetProp].on('sync', this[syncedCallbackName]);
		},
		componentWillUnmount: function() {
			this.props[targetProp].off('request', this[requestCallbackName]);
			this.props[targetProp].off('sync', this[syncedCallbackName]);
		}
	};

	mixin[requestCallbackName] = function() {
		this.setState({loading: true});
	};
	mixin[syncedCallbackName] = function() {
		this.setState({loading: false});
	};

	return mixin;
}

function FluxboneHandleChangeMixin() {
	return {
		fluxboneHandleChange: function(prop, attr) {
			var callbackName = "_changeCallback_" + prop + "_" + attr;

			if (this[callbackName] === undefined) {
				this[callbackName] = (function(e) {
					var model = this.props[prop];
					var attrs = {};
					attrs[attr] = e.target.value;
					model.constructor.Dispatcher().dispatch({
						command: 'set',
						model: model,
						attrs: attrs
					});
				}).bind(this);
			}

			return this[callbackName];
		}
	}
}

var FluxboneCollection = Backbone.Collection.extend({
	dispatchCallback: function(payload) {
		var command = payload.command,
			model = payload.model,
			attrs = payload.attrs,
			opts = payload.opts;

		switch (command) {
			case 'set':
				model.set(attrs, opts);
				break;
			case 'add':
				this.add(model);
				break;
			case 'update':
				this.add(model, {merge: true});
				break;
			case 'remove':
				this.remove(model);
				break;
			case 'destroy':
				model.destroy();
				break;
			case 'save':
				model.save();
				break;
			case 'fetch':
				model.fetch();
				break;
		}
	}
});

function FluxboneModelInit(thing, opts) {
	opts = _.defaults(opts, {
		model: thing,
		urlRoot: thing.prototype.urlRoot
	});

	var dispatcher = new Dispatcher();

	var store = new FluxboneCollection(opts);
	store.dispatchToken_ = dispatcher.register(store.dispatchCallback);

	thing.Store = function() {
		return store;
	};
	thing.Dispatcher = function() {
		return dispatcher;
	}
};

module.exports.EventMixin = FluxboneEventMixin;
module.exports.LoadingMixin = FluxboneLoadingMixin
module.exports.HandleChangeMixin = FluxboneHandleChangeMixin;
module.exports.Collection = FluxboneCollection;
module.exports.ModelInit = FluxboneModelInit;

