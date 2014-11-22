var Fluxbone = require('../lib').Fluxbone;
var OrganizationModel = require('../models').Organization;

var InputFieldComponent = React.createClass({
  mixins: [Fluxbone.HandleChangeMixin()],
  render: function() {
    return (
      <tr>
        <td>{this.props.title}</td>
        <td>
          <input value={this.props.model.get(this.props.attr)}
                 type={this.props.type} size={this.props.size}
                 onChange={this.fluxboneHandleChange('model', this.props.attr)} />
        </td>
      </tr>
    );
  }
});

var OrganizationEditorComponent = React.createClass({
  mixins: [Fluxbone.HandleChangeMixin()],
  render: function() {
    var headerText = (this.props.org.isNew() ? "New" : "Edit") + " organization";

    return (
      <div className="organization-editor-container">
        <h3>{headerText}</h3>
        <table className="edit-table">
          <InputFieldComponent model={this.props.org} attr='name' title='Name' size="35" />
          <tr>
            <td><button className="btn btn-sm btn-primary" onClick={this.submitClicked}>Submit</button></td>
          </tr>
        </table>
      </div>
    );
  },
  submitClicked: function() {
    var self = this;

    this.props.org.once("sync", function() {
      self.props.user.get('organizations').add(self.props.org);
      navigate(basepath + '/organizations/' + self.props.org.get('id'));
    });
    OrganizationModel.Dispatcher().dispatch({
      command: 'save',
      model: this.props.org
    });
  }
});

var OrganizationComponent = React.createClass({
  mixins: [Fluxbone.EventMixin('org')],
  render: function() {
    return <div />;
  }
});

module.exports.Component = OrganizationComponent;
module.exports.EditorComponent = OrganizationEditorComponent;
