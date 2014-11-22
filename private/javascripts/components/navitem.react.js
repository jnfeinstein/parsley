var NavItem = React.createClass({
  render: function() {
    return (
      <li><a href={this.props.href} onClick={this.props.onClick}>{this.props.title}</a></li>
    );
  }
});

module.exports = NavItem;
