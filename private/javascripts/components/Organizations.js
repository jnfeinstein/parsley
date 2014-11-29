var _ = require('underscore');
var React = require('react');
var Helpers = require('../lib').Helpers;
var WebAPI = require('../util').WebAPI;
var Dispatcher = require('../dispatcher');
var Constants = require('../constants');
var Organization = require('../models').Organization;
var OrganizationStore = require('../stores').Organizations;

var SecondaryNavbarComponent = require('./SecondaryNavbar');
var ErrorComponent = require('./Error');

var InputFieldComponent = require("./InputField");

var OrganizationEditorComponent = React.createClass({
  render: function() {
    var headerText = (this.props.organization.isNew() ? "New" : "Edit") + " organization";

    return (
      <div className="organization-editor-container">
        <h3>{headerText}</h3>
        <table className="edit-table">
          <InputFieldComponent title="Name" type='text' size="35" ref="name" value={this.props.organization.Name()} />
          <tr>
            <td><button className="btn btn-sm btn-primary" onClick={this.saveClicked}>Save</button></td>
          </tr>
        </table>
      </div>
    );
  },
  saveClicked: function() {
    var values = Helpers.GetValues(this.refs);
    if (this.props.organization.isNew()) {
      WebAPI.CreateOrganization(values);
    }
  }
});

var OrganizationComponent = React.createClass({
  getInitialState: function() {
    return {
      currentOrganization: this.getOrganization(this.props.id),
      organizations: OrganizationStore.getAll()
    };
  },
  componentDidMount: function() {
    OrganizationStore.addChangeListener(this.updateStateFromStores);
  },
  componentWillUnmount: function() {
    OrganizationStore.removeChangeListener(this.updateStateFromStores);
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      currentOrganization: this.getOrganization(nextProps.id)
    });
  },
  render: function() {
    if (_.isEmpty(this.state.currentOrganization)) {
      return <ErrorComponent message="Organization does not exist!" />;
    } else if (this.state.currentOrganization.isNew()) {
      return <OrganizationEditorComponent organization={this.state.currentOrganization} />;
    }

    return (
      <div>
        <SecondaryNavbarComponent currentOrganization={this.state.currentOrganization} organizations={this.state.organizations} />
        {this.state.currentOrganization.Name()}
      </div>
    );
  },
  getOrganization: function(id) {
    if (id == 'new') {
      return new Organization();
    } else {
      return OrganizationStore.get(id);
    }
  },
  updateStateFromStores: function() {
    if (this.props.id == Constants.NewIdPlaceholder) {
      this.setState({
        organizations: OrganizationStore.getAll()
      });
    } else {
      this.setState({
        currentOrganization: OrganizationStore.get(this.props.id), // May have changed due to loading new orgs
        organizations: OrganizationStore.getAll()
      });
    }
  }
});

module.exports = OrganizationComponent;
