var InputFieldComponent = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  render: function() {
    return (
      <tr>
        <td>{this.props.title}</td>
        <td>
          <input type={this.props.type} size={this.props.size}
                 valueLink={this.linkState('value')} />
        </td>
      </tr>
    );
  }
});

var OrganizationEditorComponent = React.createClass({
  render: function() {
    var headerText = (this.props.org.isNew() ? "New" : "Edit") + " organization";

    return (
      <div className="organization-editor-container">
        <h3>{headerText}</h3>
        <table className="edit-table">
          <InputFieldComponent type='text' size="35" ref="name" value={this.props.org.name} />
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
  render: function() {
    return <div />;
  }
});

module.exports.Component = OrganizationComponent;
module.exports.EditorComponent = OrganizationEditorComponent;
