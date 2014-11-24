var React = require('react');
var Helpers = require('../lib').Helpers;
var WebAPI = require('../util').WebAPI;

var OrganizationEditorComponent = React.createClass({
  render: function() {
    var headerText = (this.props.organization.isNew() ? "New" : "Edit") + " organization";
    if (this.state.currentOrganization.isNew()) {
      return <OrganizationEditorComponent organization={this.props.organization} />;
    }

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
  render: function() {
    return (
      <div>
        {this.props.organization.Name()}
      </div>
    );
  },
});

module.exports = OrganizationComponent;
