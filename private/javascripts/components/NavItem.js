var Router = require('react-router-component');
var Link = Router.Link;

var NavItem = React.createClass({
  render: function() {
    return (
      <li className={this.props.className}><Link href={this.props.href}>{this.props.title}</Link></li>
    );
  }
});

module.exports = NavItem;
