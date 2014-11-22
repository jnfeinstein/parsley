var OrganizationModel = require('../models').Organization;

var OrganizationComponent = React.createClass({
  render: function() {
    if (this.props.model.get('id') == 'new') {
      return (
        <div>
          <h3>New organization</h3>
          <table>
            <tr>
              <td>Name</td>
              <td><input type="text" name="name" ref="name" size="35" placeholder="Name your new org" /></td>
            </tr>
          </table>
        </div>
      );
    }

    return (
      <div>

      </div>
    );
  }
});

module.exports = OrganizationComponent;
