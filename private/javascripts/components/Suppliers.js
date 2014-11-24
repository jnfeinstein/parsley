var _ = require('underscore');
var React = require('react');
var Helpers = require('../lib').Helpers;
var WebAPI = require('../util').WebAPI;

var Supplier = require('../models').Supplier;
var SupplierStore = require('../stores').Suppliers;

var Stores = require('../stores');
var CurrentOrganizationStore = Stores.CurrentOrganization;

var ErrorComponent = require('./Error');

var SupplierListComponent = React.createClass({
  render: function() {
    return (
      <div>"TODO - first do WebAPI stuff to actually create Suppliers"</div>
    );
  }
});

var SupplierComponent = React.createClass({
  render: function() {
    var headerText = this.props.supplier.isNew() ? "New supplier" : this.props.supplier.get('name');
    return (
      <div className="supplier-editor-container">
        <h3>{headerText}</h3>
        <table className="edit-table">
          <InputFieldComponent title="Name" type='text' size="35" ref="name" value={this.props.supplier.get('name')} />
          <InputFieldComponent title="Phone Number" type='tel' size="35" ref="name" value={this.props.supplier.get('phone_number')} />
          <InputFieldComponent title="Street Address" type='text' size="35" ref="name" value={this.props.supplier.get('physical_address')} />
          <InputFieldComponent title="E-mail Address" type='email' size="35" ref="name" value={this.props.supplier.get('physical_address')} />
          <tr>
            <td><button className="btn btn-sm btn-primary" onClick={this.submitClicked}>Save</button></td>
          </tr>
        </table>
      </div>
    );
  },
  saveClicked: function() {
    var values = Helpers.GetValues(this.refs)
      if (this.props.supplier.isNew()) {
        WebAPI.CreateSupplier(values);
      } else {
        WebAPI.UpdateSupplier(values);
      }
  },
  getInitialState: function() {
    return {
      supplier: this.getSupplier(this.props.id)
    };
  },
  getSupplier: function(id) {
    if (id == Constants.NewIdPlaceholder) {
      return new Supplier({organization_id: CurrentOrganizationStore.get().id});
    } else {
      return SupplierStore.get(id);
    }
  }
});

module.exports = {
  List: SupplierListComponent,
  Main: SupplierComponent,
}
