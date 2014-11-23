var ErrorComponent = React.createClass({
  render: function() {
    return (
      <div>{this.props.message}</div>
    );
  }
});

module.exports = ErrorComponent;
