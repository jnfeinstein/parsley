var _ = require('underscore');
var React = require('react');
var Helpers = require('../lib').Helpers;
var WebAPI = require('../util').WebAPI;

var Organization = require('../models').Organization;
var OrganizationStore = require('../stores').Organizations;

var ErrorComponent = require('./Error');

var InputFieldComponent = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {
      value: this.props.value
    };
  },
  render: function() {
    return (
      <tr>
        <td>{this.props.title}</td>
        <td>
          <input type={this.props.type} size={this.props.size} valueLink={this.linkState('value')} />
        </td>
      </tr>
    );
  }
});

var OrganizationEditorComponent = React.createClass({
  render: function() {
    var headerText = (this.props.organization.isNew() ? "New" : "Edit") + " organization";

    return (
      <div className="organization-editor-container">
        <h3>{headerText}</h3>
        <table className="edit-table">
          <InputFieldComponent title="Name" type='text' size="35" ref="name" value={this.props.organization.name()} />
          <tr>
            <td><button className="btn btn-sm btn-primary" onClick={this.submitClicked}>Submit</button></td>
          </tr>
        </table>
      </div>
    );
  },
  submitClicked: function() {
    var values = Helpers.GetValues(this.refs);
    if (this.props.organization.isNew()) {
      WebAPI.CreateOrganization(values);
    }
  }
});

var OrganizationComponent = React.createClass({
  getInitialState: function() {
    return {
      organization: this.getOrganization(this.props.id)
    };
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      organization: this.getOrganization(nextProps.id)
    });
  },
  render: function() {
    if (_.isEmpty(this.state.organization)) {
      return <ErrorComponent message="Organization does not exist!" />;
    } else if (this.state.organization.isNew()) {
      return <OrganizationEditorComponent organization={this.state.organization} />;
    }

    return (
      <div>{this.state.organization.Name()}</div>
    );
  },
  getOrganization: function(id) {
    if (id == 'new') {
      return new Organization();
    } else {
      return OrganizationStore.get(id);
    }
  }
});

module.exports = OrganizationComponent;
