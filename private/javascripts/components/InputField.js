var _ = require('underscore');
var React = require('react/addons');

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

module.exports = InputFieldComponent;
