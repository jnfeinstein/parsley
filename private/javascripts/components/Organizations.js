var _ = require('underscore');
var React = require('react');

var OrganizationModel = require('../models').Organization;

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

  }
});

var OrganizationComponent = React.createClass({
  getInitialState: function() {
    var org;

    if (this.props.id == 'new') {
      org = new OrganizationModel();
    } else {
      org = OrganizationStore.get(id);
    }

    return {
      organization: org
    };
  },
  render: function() {
    if (_.isEmpty(this.state.organization)) {
      return <ErrorComponent message="Organization does not exist!" />;
    } else if (this.state.organization.isNew()) {
      return <OrganizationEditorComponent organization={this.state.organization} />;
    }

    return (
      <div>
        <h3>{this.state.organization.name()}</h3>
      </div>
    );
  }
});

module.exports = OrganizationComponent;
