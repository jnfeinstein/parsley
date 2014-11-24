var _ = require('underscore');
var Model = require('./Model');

var Supplier = Model.extend({
    link: function() {
        return url + "/" + this.get('id');
    },
}, {org_url: "/suppliers"});

module.exports = Supplier;
