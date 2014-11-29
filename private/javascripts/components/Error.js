var React = require('react/addons');

var ErrorComponent = React.createClass({
  render: function() {
    return (
      <div className="error-container">{this.props.message}</div>
    );
  }
});

module.exports = ErrorComponent;
