var Supplier = require('./Suppliers')

module.exports = {
	Dashboard: require('./Dashboard'),
	Organization: require('./Organizations'),
	PrimaryNavbar: require('./PrimaryNavbar'),
  SecondaryNavbar: require('./SecondaryNavbar'),
	Error: require('./Error'),
  Loading: require('./Loading'),
  Supplier: Supplier.Main,
  SupplierList: Supplier.List

};
