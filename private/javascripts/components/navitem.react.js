var NavItem = React.createClass({
  render: function() {
    return (
      <li className={this.props.className}><a href={this.props.href} onClick={this.props.onClick}>{this.props.title}</a></li>
    );
  }
});

module.exports = NavItem;
